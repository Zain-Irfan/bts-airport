import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireApprovedDriver } from "@/lib/mobile/driver-auth";
import { toDriverProfile } from "@/lib/mobile/driver-response";
import { parseProfilePatch } from "@/lib/mobile/driver-validation";

export async function GET(req: Request) {
  const auth = await requireApprovedDriver(req);
  if (auth instanceof NextResponse) return auth;

  return NextResponse.json({
    ok: true,
    driver: toDriverProfile(auth.driver),
  });
}

export async function PATCH(req: Request) {
  const auth = await requireApprovedDriver(req);
  if (auth instanceof NextResponse) return auth;

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const parsed = parseProfilePatch(body);
  if (!parsed.ok) {
    return NextResponse.json({ error: parsed.error }, { status: 400 });
  }

  const driver = await prisma.driver.update({
    where: { id: auth.driver.id },
    data: parsed.data,
  });

  return NextResponse.json({
    ok: true,
    driver: toDriverProfile(driver),
  });
}
