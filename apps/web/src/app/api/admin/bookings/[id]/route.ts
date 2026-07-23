import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { authStaff } from "@/lib/auth";

export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await authStaff();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  const booking = await prisma.booking.findUnique({
    where: { id },
    include: { assignedDriver: { select: { id: true, fullName: true, email: true, phone: true, vehicleType: true, vehiclePlate: true } } },
  });

  if (!booking) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(booking);
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await authStaff();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  await prisma.booking.delete({ where: { id } });
  return new NextResponse(null, { status: 204 });
}

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await authStaff();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  const body = await req.json();

  const data: Record<string, unknown> = {};
  if (body.status !== undefined) data.status = body.status;
  if (body.assignedDriverId !== undefined) data.assignedDriverId = body.assignedDriverId || null;
  if (body.fare !== undefined) data.fare = body.fare !== "" && body.fare !== null ? Number(body.fare) : null;

  const booking = await prisma.booking.update({
    where: { id },
    data,
    include: { assignedDriver: { select: { id: true, fullName: true, email: true, phone: true, vehicleType: true, vehiclePlate: true } } },
  });

  return NextResponse.json(booking);
}
