import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { sendContactNotificationEmail, sendContactConfirmationEmail } from "@/lib/email";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const data = body as {
    name?: string;
    email?: string;
    phone?: string;
    message?: string;
    /** Honeypot — must be empty */
    company?: string;
  };

  if (data.company?.trim()) {
    return NextResponse.json({ ok: true }, { status: 201 });
  }

  const name = data.name?.trim() ?? "";
  const email = data.email?.trim().toLowerCase() ?? "";
  const phone = data.phone?.trim() || null;
  const message = data.message?.trim() ?? "";

  if (name.length < 2) {
    return NextResponse.json({ error: "Please enter your name" }, { status: 400 });
  }
  if (!EMAIL_RE.test(email)) {
    return NextResponse.json({ error: "Enter a valid email address" }, { status: 400 });
  }
  if (message.length < 10) {
    return NextResponse.json(
      { error: "Please enter a message (at least 10 characters)" },
      { status: 400 },
    );
  }
  if (message.length > 5000) {
    return NextResponse.json({ error: "Message is too long" }, { status: 400 });
  }

  const contact = await prisma.contact.create({
    data: { name, email, phone, message },
    select: { id: true, createdAt: true },
  });

  if (process.env.RESEND_API_KEY) {
    sendContactNotificationEmail({ name, email, phone, message }).catch(() => {});
    sendContactConfirmationEmail({ name, email }).catch(() => {});
  }

  return NextResponse.json({ ok: true, id: contact.id }, { status: 201 });
}
