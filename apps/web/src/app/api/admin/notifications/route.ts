import { NextResponse } from "next/server";
import { authStaff } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET() {
  const session = await authStaff();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  // Return bookings created in the last 7 days, newest first
  const since = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);

  const bookings = await prisma.booking.findMany({
    where: { createdAt: { gte: since } },
    orderBy: { createdAt: "desc" },
    take: 20,
    select: {
      id: true,
      customerName: true,
      pickup: true,
      dropoff: true,
      status: true,
      createdAt: true,
    },
  });

  return NextResponse.json({ bookings });
}
