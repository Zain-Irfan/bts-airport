import { randomBytes } from "node:crypto";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { parseJsonBody } from "@/lib/mobile/driver-validation";

const RESET_TTL_MS = 60 * 60 * 1000;

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const { email } = parseJsonBody(body);
  if (!email) {
    return NextResponse.json({ error: "Email is required" }, { status: 400 });
  }

  const driver = await prisma.driver.findUnique({ where: { email } });

  const generic = {
    ok: true,
    message:
      "If an account exists for this email, password reset instructions have been sent.",
  };

  if (!driver || driver.status !== "APPROVED") {
    return NextResponse.json(generic);
  }

  const token = randomBytes(32).toString("hex");
  const expires = new Date(Date.now() + RESET_TTL_MS);

  await prisma.driver.update({
    where: { id: driver.id },
    data: {
      passwordResetToken: token,
      passwordResetExpires: expires,
    },
  });

  const payload: Record<string, unknown> = { ...generic };

  if (process.env.MOBILE_DEV_SHOW_RESET_TOKEN === "true") {
    payload.resetToken = token;
    payload.resetExpiresAt = expires.toISOString();
  }

  return NextResponse.json(payload);
}
