import { NextResponse } from "next/server";
import { getPaymentSessionStatus } from "@/lib/get-payment-session-status";
import { paymentSessionIdFromUrl } from "@/lib/payment-session-param";

export async function GET(req: Request) {
  const sessionId = paymentSessionIdFromUrl(new URL(req.url).searchParams);
  if (!sessionId) {
    return NextResponse.json({ error: "sessionId required" }, { status: 400 });
  }

  const result = await getPaymentSessionStatus(sessionId);
  if ("error" in result) {
    return NextResponse.json({ error: result.error }, { status: result.status });
  }

  return NextResponse.json(result);
}
