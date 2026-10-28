import { NextResponse } from "next/server";
import { quoteBooking } from "@/lib/booking-quote";
import type { QuoteSearchParams } from "@/lib/quote-search-params";

/** Confirmed server price for one vehicle — what the booking summary shows and payment charges. */
export async function POST(req: Request) {
  let body: { quote?: QuoteSearchParams; vehicleId?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  if (!body.quote || typeof body.vehicleId !== "string" || !body.vehicleId) {
    return NextResponse.json({ error: "Missing quote or vehicle" }, { status: 400 });
  }

  const result = await quoteBooking(body.quote, body.vehicleId);
  if (!result.ok) {
    return NextResponse.json({ error: result.error }, { status: result.status });
  }
  return NextResponse.json({ quote: result.quote });
}
