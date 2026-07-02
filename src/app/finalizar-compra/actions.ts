"use server";

import { redirect } from "next/navigation";
import { auth } from "../../../auth";
import { COURSE_PRODUCT, getAppUrl, getStripe } from "@/lib/stripe";

export async function createCourseCheckoutSession() {
  const stripe = getStripe();
  const session = await auth();
  const appUrl = getAppUrl();

  const checkoutSession = await stripe.checkout.sessions.create({
    mode: "payment",
    payment_method_types: ["card"],
    customer_email: session?.user?.email || undefined,
    line_items: [
      {
        price_data: {
          currency: COURSE_PRODUCT.currency,
          unit_amount: COURSE_PRODUCT.amount,
          product_data: {
            name: COURSE_PRODUCT.name,
            description: COURSE_PRODUCT.description,
            images: [`${appUrl}/home-assets/course-platform-clean.webp`],
          },
          tax_behavior: "inclusive",
        },
        quantity: 1,
      },
    ],
    metadata: {
      product: "course-2026",
      userId: session?.user?.id || "",
      userEmail: session?.user?.email || "",
    },
    success_url: `${appUrl}/finalizar-compra/gracias/?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${appUrl}/finalizar-compra/?cancelled=1`,
    consent_collection: {
      terms_of_service: "required",
    },
  });

  if (!checkoutSession.url) {
    throw new Error("Stripe did not return a checkout URL");
  }

  redirect(checkoutSession.url);
}
