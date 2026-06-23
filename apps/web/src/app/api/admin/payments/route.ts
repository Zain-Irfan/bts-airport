import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { authStaff } from "@/lib/auth";

export async function GET() {
  const session = await authStaff();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const payments = await prisma.paymentSession.findMany({
    orderBy: { createdAt: "desc" },
    take: 200,
  });

  return NextResponse.json(payments);
}
