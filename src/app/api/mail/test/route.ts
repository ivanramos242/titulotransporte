import { NextResponse } from "next/server";
import { sendTransactionalEmail } from "@/lib/mail";

export async function POST(request: Request) {
  const secret = request.headers.get("x-mail-test-secret");

  if (!process.env.MAIL_TEST_SECRET || secret !== process.env.MAIL_TEST_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { to } = (await request.json()) as { to?: string };

  if (!to) {
    return NextResponse.json({ error: "Missing recipient" }, { status: 400 });
  }

  const info = await sendTransactionalEmail({
    to,
    subject: "Prueba SMTP Titulotransporte",
    text: "El envío SMTP está configurado correctamente.",
    html: "<p>El envío SMTP está configurado correctamente.</p>",
  });

  return NextResponse.json({ ok: true, messageId: info.messageId });
}
