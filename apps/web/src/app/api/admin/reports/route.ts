import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { authStaff } from "@/lib/auth";

export async function GET() {
  const session = await authStaff();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const now = new Date();
  const twelveMonthsAgo = new Date(now.getFullYear(), now.getMonth() - 11, 1);

  const [bookings, payments] = await Promise.all([
    prisma.booking.findMany({
      where: { createdAt: { gte: twelveMonthsAgo } },
      select: { createdAt: true, fare: true, status: true, vehicleType: true, pickup: true, dropoff: true },
      orderBy: { createdAt: "asc" },
    }),
    prisma.paymentSession.findMany({
      where: { status: "COMPLETED", createdAt: { gte: twelveMonthsAgo } },
      select: { amountMinor: true, createdAt: true },
    }),
  ]);

  // Monthly revenue & booking counts
  const monthlyMap = new Map<string, { revenue: number; count: number }>();
  for (let i = 0; i < 12; i++) {
    const d = new Date(now.getFullYear(), now.getMonth() - 11 + i, 1);
    const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
    monthlyMap.set(key, { revenue: 0, count: 0 });
  }

  for (const b of bookings) {
    const key = `${b.createdAt.getFullYear()}-${String(b.createdAt.getMonth() + 1).padStart(2, "0")}`;
    const entry = monthlyMap.get(key);
    if (entry) {
      entry.count += 1;
      if (b.fare) entry.revenue += Number(b.fare);
    }
  }

  const monthly = Array.from(monthlyMap.entries()).map(([month, data]) => ({
    month,
    label: new Date(month + "-01").toLocaleDateString("en-GB", { month: "short", year: "2-digit" }),
    ...data,
  }));

  // Status breakdown
  const statusMap: Record<string, number> = {};
  for (const b of bookings) {
    statusMap[b.status] = (statusMap[b.status] ?? 0) + 1;
  }

  // Vehicle type breakdown
  const vehicleMap: Record<string, number> = {};
  for (const b of bookings) {
    if (b.vehicleType) vehicleMap[b.vehicleType] = (vehicleMap[b.vehicleType] ?? 0) + 1;
  }

  // Totals
  const totalRevenue = bookings.reduce((s, b) => s + (b.fare ? Number(b.fare) : 0), 0);
  const completedCount = bookings.filter((b) => b.status === "COMPLETED").length;
  const cancelledCount = bookings.filter((b) => b.status === "CANCELLED").length;
  const paymentRevenue = payments.reduce((s, p) => s + p.amountMinor / 100, 0);

  return NextResponse.json({
    monthly,
    statusBreakdown: Object.entries(statusMap).map(([status, count]) => ({ status, count })),
    vehicleBreakdown: Object.entries(vehicleMap)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 8)
      .map(([vehicle, count]) => ({ vehicle, count })),
    totals: {
      bookings: bookings.length,
      revenue: totalRevenue,
      paymentRevenue,
      completed: completedCount,
      cancelled: cancelledCount,
    },
  });
}
