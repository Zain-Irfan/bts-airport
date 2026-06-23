"use client";

import Link from "next/link";
import { useState } from "react";
import { CheckCircle2, Loader2, XCircle } from "lucide-react";
import { SiteTopHeader } from "@/components/layout/SiteTopHeader";
import { FullFooterSection } from "@/components/FullFooterSection";
import type { PaymentSessionStatus } from "@/lib/get-payment-session-status";

type Props = {
  sessionId: string;
  initial: PaymentSessionStatus | Omit<PaymentSessionStatus, "sessionId"> & { sessionId?: string };
};

export function PaymentSuccessClient({ sessionId, initial }: Props) {
  const [status, setStatus] = useState(initial);
  const [refreshing, setRefreshing] = useState(false);

  const paid = status.paid === true;

  async function refresh() {
    if (!sessionId) return;
    setRefreshing(true);
    try {
      const res = await fetch(
        `/api/payments/revolut/session?sessionId=${encodeURIComponent(sessionId)}`,
        { cache: "no-store" },
      );
      const data = (await res.json()) as PaymentSessionStatus & { error?: string };
      if (res.ok) {
        setStatus(data);
      } else {
        setStatus({
          sessionId,
          paid: false,
          status: "error",
          bookingId: null,
          message: data.error || "Could not verify payment",
        });
      }
    } catch {
      setStatus({
        sessionId,
        paid: false,
        status: "error",
        bookingId: null,
        message: "Could not reach the server. Try again.",
      });
    } finally {
      setRefreshing(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#f3f4f6] font-sans text-gray-900">
      <SiteTopHeader />
      <main className="container mx-auto max-w-lg px-4 py-16 text-center">
        {refreshing ? (
          <>
            <Loader2 className="mx-auto h-12 w-12 animate-spin text-accent" />
            <p className="mt-4 text-gray-600">Confirming your payment…</p>
          </>
        ) : paid ? (
          <>
            <CheckCircle2 className="mx-auto h-16 w-16 text-emerald-500" />
            <h1 className="mt-4 text-2xl font-extrabold text-gray-900">Payment successful</h1>
            <p className="mt-3 text-gray-600">
              Thank you! Your booking is confirmed. We&apos;ve sent details to your email.
            </p>
            {status.bookingId && (
              <p className="mt-2 text-xs text-gray-500">Reference: {status.bookingId}</p>
            )}
            <Link
              href="/"
              className="mt-8 inline-flex h-12 items-center justify-center rounded-lg bg-accent px-8 text-sm font-bold text-accent-foreground"
            >
              Back to home
            </Link>
          </>
        ) : (
          <>
            <XCircle className="mx-auto h-16 w-16 text-amber-500" />
            <h1 className="mt-4 text-2xl font-extrabold text-gray-900">Payment pending</h1>
            <p className="mt-3 text-gray-600">
              {status.message ||
                "We could not confirm payment yet. If you completed payment, refresh this page."}
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
              {sessionId ? (
                <button
                  type="button"
                  onClick={() => void refresh()}
                  className="inline-flex h-11 items-center justify-center rounded-lg bg-accent px-6 text-sm font-bold text-accent-foreground"
                >
                  Refresh status
                </button>
              ) : null}
              <Link
                href="/"
                className="inline-flex h-11 items-center justify-center rounded-lg border border-gray-300 bg-white px-6 text-sm font-bold text-gray-800"
              >
                Home
              </Link>
            </div>
          </>
        )}
      </main>
      <FullFooterSection />
    </div>
  );
}
