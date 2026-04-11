import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
const toEmail = process.env.CONTACT_TO_EMAIL ?? "hello@dilshan.dev";

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  if (
    typeof body !== "object" ||
    body === null ||
    typeof (body as Record<string, unknown>)["name"] !== "string" ||
    typeof (body as Record<string, unknown>)["email"] !== "string" ||
    typeof (body as Record<string, unknown>)["message"] !== "string"
  ) {
    return NextResponse.json({ error: "Missing fields." }, { status: 400 });
  }

  const { name, email, message } = body as {
    name: string;
    email: string;
    message: string;
  };

  if (!name.trim() || !email.trim() || !message.trim()) {
    return NextResponse.json({ error: "Missing fields." }, { status: 400 });
  }

  const { error } = await resend.emails.send({
    from: "Portfolio Contact <onboarding@resend.dev>",
    to: toEmail,
    replyTo: email,
    subject: `New message from ${name}`,
    text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
    html: `
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
      <hr />
      <p style="white-space:pre-wrap">${message}</p>
    `,
  });

  if (error) {
    return NextResponse.json({ error: "Failed to send." }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
