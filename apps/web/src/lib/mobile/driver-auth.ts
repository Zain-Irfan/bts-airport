import { SignJWT, jwtVerify } from "jose";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import type { Driver } from "@/generated/prisma/client";

const TOKEN_TTL = "30d";

function getSecret() {
  const secret =
    process.env.DRIVER_JWT_SECRET ||
    process.env.NEXTAUTH_SECRET ||
    process.env.AUTH_SECRET;
  if (!secret) {
    throw new Error("DRIVER_JWT_SECRET or NEXTAUTH_SECRET must be set");
  }
  return new TextEncoder().encode(secret);
}

export async function signDriverAccessToken(driverId: string): Promise<string> {
  return new SignJWT({ sub: driverId, type: "driver" })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(TOKEN_TTL)
    .sign(getSecret());
}

export async function verifyDriverAccessToken(
  token: string,
): Promise<string | null> {
  try {
    const { payload } = await jwtVerify(token, getSecret());
    if (payload.type !== "driver" || typeof payload.sub !== "string") {
      return null;
    }
    return payload.sub;
  } catch {
    return null;
  }
}

export function bearerToken(req: Request): string | null {
  const header = req.headers.get("authorization");
  if (!header?.startsWith("Bearer ")) return null;
  return header.slice(7).trim() || null;
}

export async function requireApprovedDriver(
  req: Request,
): Promise<{ driver: Driver } | NextResponse> {
  const token = bearerToken(req);
  if (!token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const driverId = await verifyDriverAccessToken(token);
  if (!driverId) {
    return NextResponse.json({ error: "Invalid or expired token" }, { status: 401 });
  }

  const driver = await prisma.driver.findUnique({ where: { id: driverId } });
  if (!driver) {
    return NextResponse.json({ error: "Driver not found" }, { status: 401 });
  }

  if (driver.status !== "APPROVED") {
    return NextResponse.json(
      {
        error: "Account is not approved",
        code: driver.status,
        reviewNotes: driver.reviewNotes,
      },
      { status: 403 },
    );
  }

  return { driver };
}
