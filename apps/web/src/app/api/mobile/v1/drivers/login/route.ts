import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { signDriverAccessToken } from "@/lib/mobile/driver-auth";
import { toDriverProfile } from "@/lib/mobile/driver-response";
import { parseJsonBody } from "@/lib/mobile/driver-validation";

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const { email, password } = parseJsonBody(body);
  if (!email || !password) {
    return NextResponse.json(
      { error: "Email and password are required" },
      { status: 400 },
    );
  }

  const driver = await prisma.driver.findUnique({ where: { email } });
  if (!driver) {
    return NextResponse.json({ error: "Invalid email or password" }, { status: 401 });
  }

  const valid = await bcrypt.compare(password, driver.password);
  if (!valid) {
    return NextResponse.json({ error: "Invalid email or password" }, { status: 401 });
  }

  if (driver.status === "PENDING") {
    return NextResponse.json(
      {
        error: "Your application is still under review",
        code: "PENDING",
        driver: toDriverProfile(driver),
      },
      { status: 403 },
    );
  }

  if (driver.status === "REJECTED") {
    return NextResponse.json(
      {
        error: "Your application was not approved",
        code: "REJECTED",
        reviewNotes: driver.reviewNotes,
        driver: toDriverProfile(driver),
      },
      { status: 403 },
    );
  }

  const accessToken = await signDriverAccessToken(driver.id);

  return NextResponse.json({
    ok: true,
    accessToken,
    tokenType: "Bearer",
    expiresIn: 60 * 60 * 24 * 30,
    driver: toDriverProfile(driver),
  });
}
