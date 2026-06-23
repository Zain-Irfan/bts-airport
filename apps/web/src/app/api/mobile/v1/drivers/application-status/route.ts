import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { toDriverProfile } from "@/lib/mobile/driver-response";
import { parseJsonBody } from "@/lib/mobile/driver-validation";

/** Check approval status by email (for pending drivers who cannot log in yet). */
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
  if (!driver) {
    return NextResponse.json(
      { error: "No application found for this email" },
      { status: 404 },
    );
  }

  return NextResponse.json({
    ok: true,
    status: driver.status,
    reviewNotes: driver.reviewNotes,
    reviewedAt: driver.reviewedAt?.toISOString() ?? null,
    driver: toDriverProfile(driver),
  });
}
