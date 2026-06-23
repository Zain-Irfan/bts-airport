import { parseISO } from "date-fns";
import type { CheckoutPayload } from "@/lib/checkout-payload";
import { prisma } from "@/lib/prisma";

export async function createBookingFromCheckout(
  payload: CheckoutPayload,
  userId?: string | null,
) {
  const { quote, pricing, customer } = payload;
  const name = `${customer.firstName} ${customer.lastName}`.trim();

  let bookingDate: Date;
  try {
    bookingDate = parseISO(`${quote.dateStr}T${quote.time}:00`);
  } catch {
    bookingDate = new Date();
  }

  let returnDate: Date | undefined;
  if (quote.hasReturn && quote.returnDateStr) {
    try {
      returnDate = parseISO(`${quote.returnDateStr}T${quote.returnTime ?? "12:00"}:00`);
    } catch {
      returnDate = undefined;
    }
  }

  const notes = [
    quote.flight ? `Flight: ${quote.flight}` : null,
    quote.vias.length ? `Via: ${quote.vias.join(" → ")}` : null,
    `Meet & greet: ${quote.meet}`,
    `Handcarry: ${quote.handcarry}, Suitcases: ${quote.suitcase}`,
  ]
    .filter(Boolean)
    .join("\n");

  return prisma.booking.create({
    data: {
      userId: userId ?? undefined,
      customerName: name,
      customerEmail: customer.email,
      customerPhone: customer.phone,
      pickup: quote.pickup,
      dropoff: quote.dropoff,
      date: bookingDate,
      time: quote.time,
      passengers: quote.passengers,
      luggage: quote.handcarry + quote.suitcase,
      vehicleType: pricing.vehicleName,
      fare: pricing.totalPrice,
      returnDate: returnDate ?? null,
      returnTime: (quote.hasReturn && quote.returnTime) ? quote.returnTime : null,
      flightNumber: quote.flight || null,
      status: "CONFIRMED",
      notes: notes || undefined,
    },
  });
}
