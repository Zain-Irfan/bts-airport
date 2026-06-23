import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { CUSTOMER_ROLE } from "@/lib/auth-roles";
import {
  NATIONAL_PHONE_MAX_LENGTH,
  parsePhoneValue,
} from "@/lib/phone-countries";
import { prisma } from "@/lib/prisma";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const data = body as {
    firstName?: string;
    lastName?: string;
    email?: string;
    phone?: string;
    password?: string;
  };

  const firstName = data.firstName?.trim() ?? "";
  const lastName = data.lastName?.trim() ?? "";
  const email = data.email?.trim().toLowerCase() ?? "";
  const phone = data.phone?.trim() ?? "";
  const password = data.password ?? "";

  if (!firstName || !lastName) {
    return NextResponse.json({ error: "First and last name are required" }, { status: 400 });
  }
  if (!EMAIL_RE.test(email)) {
    return NextResponse.json({ error: "Enter a valid email address" }, { status: 400 });
  }
  const phoneDigits = phone.replace(/\D/g, "");
  const { national } = parsePhoneValue(phoneDigits);
  if (national.length !== NATIONAL_PHONE_MAX_LENGTH) {
    return NextResponse.json(
      { error: "Enter a valid 10-digit phone number" },
      { status: 400 },
    );
  }
  if (password.length < 8) {
    return NextResponse.json({ error: "Password must be at least 8 characters" }, { status: 400 });
  }

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    return NextResponse.json(
      { error: "An account with this email already exists. Try logging in." },
      { status: 409 },
    );
  }

  const hashed = await bcrypt.hash(password, 12);
  const name = `${firstName} ${lastName}`.trim();

  const user = await prisma.user.create({
    data: {
      name,
      email,
      phone: phoneDigits,
      password: hashed,
      role: CUSTOMER_ROLE,
      status: "ACTIVE",
    },
    select: { id: true, email: true, name: true },
  });

  return NextResponse.json({ ok: true, user }, { status: 201 });
}
