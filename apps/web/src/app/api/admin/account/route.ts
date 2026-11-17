import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { authStaff } from "@/lib/auth";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MIN_PASSWORD_LENGTH = 8;

/**
 * The signed-in staff member changes their own login email and/or password.
 * Always requires the current password, so an unattended open session can't be used to take over the account.
 */
export async function PATCH(req: NextRequest) {
  const session = await authStaff();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = (await req.json().catch(() => ({}))) as {
    currentPassword?: unknown;
    newEmail?: unknown;
    newPassword?: unknown;
  };
  const currentPassword = typeof body.currentPassword === "string" ? body.currentPassword : "";
  const newEmail = typeof body.newEmail === "string" ? body.newEmail.trim().toLowerCase() : "";
  const newPassword = typeof body.newPassword === "string" ? body.newPassword : "";

  if (!currentPassword) {
    return NextResponse.json({ error: "Enter your current password." }, { status: 400 });
  }
  if (!newEmail && !newPassword) {
    return NextResponse.json({ error: "Nothing to change." }, { status: 400 });
  }

  const user = await prisma.user.findUnique({ where: { id: session.user.id } });
  if (!user || !(await bcrypt.compare(currentPassword, user.password))) {
    return NextResponse.json({ error: "Current password is incorrect." }, { status: 400 });
  }

  const data: { email?: string; password?: string } = {};

  if (newEmail && newEmail !== user.email) {
    if (!EMAIL_RE.test(newEmail) || newEmail.length > 191) {
      return NextResponse.json({ error: "Enter a valid email address." }, { status: 400 });
    }
    const taken = await prisma.user.findUnique({ where: { email: newEmail }, select: { id: true } });
    if (taken) {
      return NextResponse.json({ error: "That email is already used by another account." }, { status: 409 });
    }
    data.email = newEmail;
  }

  if (newPassword) {
    if (newPassword.length < MIN_PASSWORD_LENGTH) {
      return NextResponse.json(
        { error: `New password must be at least ${MIN_PASSWORD_LENGTH} characters.` },
        { status: 400 },
      );
    }
    if (await bcrypt.compare(newPassword, user.password)) {
      return NextResponse.json({ error: "New password must be different from the current one." }, { status: 400 });
    }
    data.password = await bcrypt.hash(newPassword, 12);
  }

  if (!Object.keys(data).length) {
    return NextResponse.json({ error: "That is already your email." }, { status: 400 });
  }

  await prisma.user.update({ where: { id: user.id }, data });
  return NextResponse.json({ ok: true, emailChanged: Boolean(data.email), passwordChanged: Boolean(data.password) });
}
