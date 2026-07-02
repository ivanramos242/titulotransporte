import Stripe from "stripe";

export const COURSE_PRODUCT = {
  name: "Curso Título Transporte 2026",
  description:
    "Acceso completo al curso online para preparar el título de competencia profesional del transporte.",
  amount: 9900,
  currency: "eur",
} as const;

export function getStripe() {
  if (!process.env.STRIPE_SECRET_KEY) {
    throw new Error("STRIPE_SECRET_KEY is not configured");
  }

  return new Stripe(process.env.STRIPE_SECRET_KEY);
}

export function getAppUrl() {
  return process.env.AUTH_URL || process.env.NEXTAUTH_URL || "http://localhost:3000";
}
