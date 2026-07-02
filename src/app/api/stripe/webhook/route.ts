import { NextResponse } from "next/server";
import type Stripe from "stripe";
import { getStripe } from "@/lib/stripe";

export const runtime = "nodejs";

async function handleCheckoutCompleted(session: Stripe.Checkout.Session) {
  const purchase = {
    stripeSessionId: session.id,
    stripePaymentIntentId:
      typeof session.payment_intent === "string" ? session.payment_intent : session.payment_intent?.id,
    customerEmail: session.customer_details?.email || session.customer_email || session.metadata?.userEmail || null,
    userId: session.metadata?.userId || null,
    product: session.metadata?.product || "course-2026",
    amountTotal: session.amount_total,
    currency: session.currency,
    paymentStatus: session.payment_status,
  };

  // TODO: Persist this purchase in the production database/user system when it exists.
  // This is the verified source that should unlock course access and review publishing.
  console.info("Stripe checkout completed", purchase);
}

export async function POST(request: Request) {
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!webhookSecret) {
    return NextResponse.json({ error: "STRIPE_WEBHOOK_SECRET is not configured" }, { status: 500 });
  }

  const stripe = getStripe();
  const signature = request.headers.get("stripe-signature");

  if (!signature) {
    return NextResponse.json({ error: "Missing stripe-signature header" }, { status: 400 });
  }

  const body = await request.text();
  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Invalid webhook signature";
    return NextResponse.json({ error: message }, { status: 400 });
  }

  try {
    switch (event.type) {
      case "checkout.session.completed":
        await handleCheckoutCompleted(event.data.object as Stripe.Checkout.Session);
        break;
      case "checkout.session.async_payment_succeeded":
      case "checkout.session.async_payment_failed":
        console.info("Stripe async checkout event", {
          type: event.type,
          sessionId: (event.data.object as Stripe.Checkout.Session).id,
        });
        break;
      default:
        console.info("Unhandled Stripe event", event.type);
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : "Webhook handler failed";
    return NextResponse.json({ error: message }, { status: 500 });
  }

  return NextResponse.json({ received: true });
}
