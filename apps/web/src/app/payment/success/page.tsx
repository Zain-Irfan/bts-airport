import { PaymentSuccessClient } from "@/components/booking/PaymentSuccessClient";
import { getPaymentSessionStatus } from "@/lib/get-payment-session-status";
import { paymentSessionIdFromUrl } from "@/lib/payment-session-param";

export const dynamic = "force-dynamic";

type Props = {
  searchParams: Promise<{ sessionId?: string | string[]; session_id?: string | string[] }>;
};

function firstString(value: string | string[] | undefined): string | undefined {
  if (typeof value === "string") return value;
  if (Array.isArray(value)) return value[0];
  return undefined;
}

export default async function PaymentSuccessPage({ searchParams }: Props) {
  const sp = await searchParams;
  const sessionId = paymentSessionIdFromUrl({
    sessionId: firstString(sp.sessionId),
    session_id: firstString(sp.session_id),
  });

  if (!sessionId) {
    return (
      <PaymentSuccessClient
        sessionId=""
        initial={{
          paid: false,
          status: "missing",
          bookingId: null,
          message: "Missing payment session. Use the link from Revolut after payment.",
        }}
      />
    );
  }

  const result = await getPaymentSessionStatus(sessionId);
  if ("error" in result) {
    return (
      <PaymentSuccessClient
        sessionId={sessionId}
        initial={{
          paid: false,
          status: "error",
          bookingId: null,
          message: result.error,
        }}
      />
    );
  }

  return <PaymentSuccessClient sessionId={sessionId} initial={result} />;
}
