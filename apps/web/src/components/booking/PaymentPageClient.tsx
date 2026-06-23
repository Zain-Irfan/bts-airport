"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { SiteTopHeader } from "@/components/layout/SiteTopHeader";
import { FullFooterSection } from "@/components/FullFooterSection";
import { formatGbp } from "@/lib/quote-calculations";
import { parseBookingPricingParams } from "@/lib/quote-search-params";
import { useSiteSettings } from "@/components/providers/SiteSettingsProvider";

export function PaymentPageClient() {
  const sp = useSearchParams();
  const { whatsapp } = useSiteSettings();
  const pricing = parseBookingPricingParams(sp);

  return (
    <div className="min-h-screen bg-[#f3f4f6] font-sans text-gray-900">
      <SiteTopHeader />
      <main className="container mx-auto max-w-lg px-4 py-16 text-center">
        <h1 className="text-2xl font-extrabold text-gray-900">Payment</h1>
        <p className="mt-3 text-gray-600">
          Online card payment will be available here soon. Your booking details have been saved.
        </p>
        {pricing && (
          <p className="mt-4 text-lg font-bold text-accent">
            Amount due: {formatGbp(pricing.totalPrice)}
          </p>
        )}
        <p className="mt-6 text-sm text-gray-500">
          Need help now? Contact us on WhatsApp to complete your booking.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <a
            href={`https://wa.me/${whatsapp}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-12 items-center justify-center rounded-lg bg-[#25D366] px-6 text-sm font-bold text-white"
          >
            WhatsApp us
          </a>
          <Link
            href={`/booking-summary?${sp.toString()}`}
            className="inline-flex h-12 items-center justify-center rounded-lg border border-gray-300 bg-white px-6 text-sm font-bold text-gray-800"
          >
            Back to summary
          </Link>
        </div>
      </main>
      <FullFooterSection />
    </div>
  );
}
