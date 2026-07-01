import nodemailer from "nodemailer";
import { site } from "./site";

type MailInput = {
  to: string;
  subject: string;
  html: string;
  text?: string;
};

function requiredEnv(name: string) {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing ${name}`);
  }
  return value;
}

export function createTransporter() {
  return nodemailer.createTransport({
    host: requiredEnv("SMTP_HOST"),
    port: Number(process.env.SMTP_PORT || 587),
    secure: process.env.SMTP_SECURE === "true",
    auth: {
      user: requiredEnv("SMTP_USER"),
      pass: requiredEnv("SMTP_PASS"),
    },
  });
}

export async function sendTransactionalEmail({ to, subject, html, text }: MailInput) {
  const transporter = createTransporter();

  return transporter.sendMail({
    from: process.env.MAIL_FROM || `"Titulotransporte" <${site.email}>`,
    replyTo: process.env.MAIL_REPLY_TO || site.email,
    to,
    subject,
    html,
    text,
  });
}

export function welcomeEmail(name?: string) {
  const greeting = name ? `Hola ${name},` : "Hola,";

  return {
    subject: "Tu cuenta de Titulotransporte está lista",
    text: `${greeting} tu cuenta ya está preparada. Puedes acceder desde ${site.url}/mi-cuenta/.`,
    html: `<p>${greeting}</p><p>Tu cuenta de Titulotransporte ya está preparada.</p><p><a href="${site.url}/mi-cuenta/">Acceder a mi cuenta</a></p>`,
  };
}

export function paymentEmail(productName: string) {
  return {
    subject: `Confirmación de pago: ${productName}`,
    text: `Hemos recibido tu pago de ${productName}. Accede a tu cuenta desde ${site.url}/mi-cuenta/.`,
    html: `<p>Hemos recibido tu pago de <strong>${productName}</strong>.</p><p><a href="${site.url}/mi-cuenta/">Acceder a mi cuenta</a></p>`,
  };
}
