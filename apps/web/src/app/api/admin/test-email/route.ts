import { NextResponse } from "next/server";
import { authStaff } from "@/lib/auth";
import { sendBookingConfirmationEmail } from "@/lib/email";

export async function GET() {
  const session = await authStaff();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  if (!process.env.RESEND_API_KEY) {
    return NextResponse.json({ error: "RESEND_API_KEY is not set in environment" }, { status: 500 });
  }

  if (!process.env.EMAIL_FROM) {
    return NextResponse.json({ error: "EMAIL_FROM is not set in environment" }, { status: 500 });
  }

  try {
    await sendBookingConfirmationEmail({
      customerName: "Test Customer",
      customerEmail: process.env.RESEND_TEST_EMAIL || (session.user as { email?: string }).email || "",
      bookingId: "TEST-123456",
      pickup: "Heathrow Airport, London",
      dropoff: "200 Baker Street, London",
      date: "12 June 2026",
      time: "14:30",
      passengers: 2,
      luggage: 3,
      vehicleType: "Executive Saloon",
      fare: 85.00,
      flightNumber: "BA0123",
      meetGreet: true,
    });

    return NextResponse.json({
      ok: true,
      message: `Test email sent to ${(session.user as { email?: string }).email}`,
      from: process.env.EMAIL_FROM,
    });
  } catch (err) {
    return NextResponse.json({
      error: "Email sending failed",
      detail: err instanceof Error ? err.message : String(err),
    }, { status: 500 });
  }
}
