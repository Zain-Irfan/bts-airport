import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { authStaff } from "@/lib/auth";
export async function POST(req: NextRequest) {
  const session = await authStaff();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();

  const required = ["customerName", "customerEmail", "customerPhone", "pickup", "dropoff", "date", "time"];
  for (const f of required) {
    if (!body[f]?.toString().trim()) {
      return NextResponse.json({ error: `${f} is required` }, { status: 400 });
    }
  }

  const booking = await prisma.booking.create({
    data: {
      customerName: body.customerName.trim(),
      customerEmail: body.customerEmail.trim(),
      customerPhone: body.customerPhone.trim(),
      pickup: body.pickup.trim(),
      dropoff: body.dropoff.trim(),
      date: new Date(body.date),
      time: body.time.trim(),
      passengers: Number(body.passengers) || 1,
      luggage: Number(body.luggage) || 0,
      vehicleType: body.vehicleType?.trim() || null,
      flightNumber: body.flightNumber?.trim() || null,
      fare: body.fare ? Number(body.fare) : null,
      notes: body.notes?.trim() || null,
      status: body.status || "CONFIRMED",
      assignedDriverId: body.assignedDriverId || null,
    },
    include: {
      assignedDriver: {
        select: { id: true, fullName: true, email: true, phone: true, vehicleType: true, vehiclePlate: true },
      },
    },
  });

  return NextResponse.json(booking, { status: 201 });
}
