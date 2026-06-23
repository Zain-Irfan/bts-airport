"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { useSiteSettings } from "@/components/providers/SiteSettingsProvider";
import { useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { useSession } from "next-auth/react";
import { isCustomerRole } from "@/lib/auth-roles";
import {
  ArrowLeft,
  CreditCard,
  FileText,
  Shield,
  User,
} from "lucide-react";
import { SiteTopHeader } from "@/components/layout/SiteTopHeader";
import { FullFooterSection } from "@/components/FullFooterSection";
import { FaWhatsapp } from "react-icons/fa";
import { BookingPhoneField } from "@/components/booking/BookingPhoneField";
import { formatGbp } from "@/lib/quote-calculations";
import {
  buildQuotesUrl,
  parseBookingPricingParams,
  parseQuoteSearchParams,
} from "@/lib/quote-search-params";

function SummaryCard({
  title,
  icon,
  children,
}: {
  title: string;
  icon: ReactNode;
  children: ReactNode;
}) {
  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-[0_4px_24px_-8px_rgba(0,0,0,0.08)]">
      <div className="flex items-center gap-2 border-b border-gray-100 bg-accent px-5 py-3.5 text-base font-bold text-accent-foreground">
        {icon}
        {title}
      </div>
      <div className="p-5 sm:p-6">{children}</div>
    </div>
  );
}

export function BookingSummaryClient() {
  const { whatsapp } = useSiteSettings();
  const sp = useSearchParams();
  const { data: session } = useSession();
  const quote = useMemo(() => parseQuoteSearchParams(sp), [sp]);
  const pricing = useMemo(() => parseBookingPricingParams(sp), [sp]);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [profileFilled, setProfileFilled] = useState(false);

  useEffect(() => {
    if (profileFilled || !session?.user || !isCustomerRole(session.user.role)) return;
    const parts = session.user.name?.trim().split(/\s+/) ?? [];
    if (parts[0]) setFirstName(parts[0]);
    if (parts.length > 1) setLastName(parts.slice(1).join(" "));
    if (session.user.email) setEmail(session.user.email);
    const p = (session.user as { phone?: string }).phone;
    if (p) setPhone(p.startsWith("+") ? p : `+${p}`);
    setProfileFilled(true);
  }, [session, profileFilled]);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [showTermsWarning, setShowTermsWarning] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [paymentError, setPaymentError] = useState<string | null>(null);

  const quotesHref = buildQuotesUrl(sp);
  const subtotal = pricing ? pricing.outboundPrice + pricing.returnPrice : 0;
  const meetFee = pricing?.meetFee ?? 0;
  const total = pricing?.totalPrice ?? subtotal + meetFee;

  const formValid =
    firstName.trim() &&
    lastName.trim() &&
    email.trim() &&
    phone.trim().length >= 8;

  async function handleProceed(e: React.FormEvent) {
    e.preventDefault();
    if (!termsAccepted) {
      setShowTermsWarning(true);
      return;
    }
    if (!formValid || !pricing) return;

    setSubmitting(true);
    setPaymentError(null);

    const checkout = {
      quote,
      pricing,
      customer: {
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        email: email.trim(),
        phone,
      },
    };

    try {
      const res = await fetch("/api/payments/revolut/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ checkout }),
      });
      const data = (await res.json().catch(() => ({}))) as {
        checkoutUrl?: string;
        error?: string;
      };

      if (!res.ok || !data.checkoutUrl) {
        setPaymentError(data.error || "Could not start payment. Please try again.");
        setSubmitting(false);
        return;
      }

      window.location.href = data.checkoutUrl;
    } catch {
      setPaymentError("Network error — could not connect to payment service.");
      setSubmitting(false);
    }
  }

  if (!quote.pickup || !quote.dropoff || !pricing) {
    return (
      <div className="min-h-screen bg-[#f3f4f6] font-sans">
        <SiteTopHeader />
        <main className="container mx-auto max-w-lg px-4 py-20 text-center">
          <p className="mb-4 text-gray-600">Missing booking details. Please select a vehicle from quotes first.</p>
          <Link
            href="/"
            className="inline-flex rounded-lg bg-accent px-5 py-2.5 text-sm font-bold text-accent-foreground"
          >
            Back to home
          </Link>
        </main>
        <FullFooterSection />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f3f4f6] font-sans text-gray-900">
      <a
        href={`https://wa.me/${whatsapp}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="fixed bottom-6 right-6 z-[60] flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-xl"
      >
        <FaWhatsapp className="h-7 w-7" />
      </a>

      <SiteTopHeader />

      <main className="container mx-auto max-w-6xl px-4 py-8 sm:py-10 md:py-12">
<div className="mb-8 text-center sm:mb-10">
          <h1 className="text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl md:text-4xl">
            Booking Summary
          </h1>
          <p className="mt-2 text-sm text-gray-600 sm:text-base">
            Review your booking details and complete your reservation
          </p>
          <p className="mt-1 text-xs font-medium text-accent">
            {pricing.vehicleName}
            {quote.hasReturn ? " · Round trip" : ""}
          </p>
        </div>

        <form onSubmit={handleProceed} className="grid gap-6 lg:grid-cols-2 lg:gap-8">
          <SummaryCard title="Your Information" icon={<User className="h-5 w-5" />}>
            <div className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1.5 block text-sm font-semibold text-gray-800">First Name</label>
                  <input
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                    className="h-11 w-full rounded-lg border border-gray-200 bg-white px-3 text-sm text-gray-900 outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/20"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-semibold text-gray-800">Last Name</label>
                  <input
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    required
                    className="h-11 w-full rounded-lg border border-gray-200 bg-white px-3 text-sm text-gray-900 outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/20"
                  />
                </div>
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-semibold text-gray-800">Email Address</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="h-11 w-full rounded-lg border border-gray-200 bg-white px-3 text-sm text-gray-900 outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/20"
                />
                <p className="mt-1 text-xs text-gray-500">
                  Booking confirmation will be sent to this email
                </p>
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-semibold text-gray-800">Phone Number</label>
                <BookingPhoneField value={phone} onChange={setPhone} required />
                <p className="mt-1 text-xs text-gray-500">
                  For booking updates and driver communication
                </p>
              </div>
              <div className="flex gap-3 rounded-lg border border-sky-100 bg-sky-50 px-4 py-3 text-sm text-sky-900">
                <Shield className="mt-0.5 h-5 w-5 shrink-0 text-sky-600" />
                <p>Your information is secure and will only be used for this booking</p>
              </div>
            </div>
          </SummaryCard>

          <SummaryCard title="Price Breakdown" icon={<FileText className="h-5 w-5" />}>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between gap-4 border-b border-gray-100 pb-3">
                <span className="text-gray-600">Outbound Journey</span>
                <span className="font-semibold text-gray-900">{formatGbp(pricing.outboundPrice)}</span>
              </div>
              {quote.hasReturn && (
                <div className="flex justify-between gap-4 border-b border-gray-100 pb-3">
                  <span className="text-gray-600">Return Journey</span>
                  <span className="font-semibold text-gray-900">{formatGbp(pricing.returnPrice)}</span>
                </div>
              )}
              <div className="flex justify-between gap-4 border-b border-gray-100 pb-3">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-semibold text-gray-900">{formatGbp(subtotal)}</span>
              </div>
              <div className="flex justify-between gap-4 border-b border-gray-100 pb-3">
                <span className="text-gray-600">Meet &amp; Greet</span>
                <span className="font-semibold text-gray-900">{formatGbp(meetFee)}</span>
              </div>
              <div className="rounded-lg border border-orange-200 bg-orange-50 px-4 py-4">
                <div className="flex items-center justify-between gap-4">
                  <span className="font-bold text-gray-900">Total Amount</span>
                  <span className="text-2xl font-extrabold text-gray-900">{formatGbp(total)}</span>
                </div>
              </div>

              <label className="flex cursor-pointer items-start gap-2 pt-1">
                <input
                  type="checkbox"
                  checked={termsAccepted}
                  onChange={(e) => {
                    setTermsAccepted(e.target.checked);
                    if (e.target.checked) setShowTermsWarning(false);
                  }}
                  className="mt-1 h-4 w-4 accent-accent"
                />
                <span className="text-sm text-gray-700">
                  I agree to the{" "}
                  <Link href="/terms-and-conditions" className="font-semibold text-accent hover:underline">
                    Terms and Conditions
                  </Link>
                </span>
              </label>

              <div className="grid gap-3 pt-2 sm:grid-cols-2">
                <Link
                  href={quotesHref}
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-lg border border-accent/40 bg-accent text-sm font-bold text-accent-foreground transition hover:brightness-105"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Back to Quotes
                </Link>
                <button
                  type="submit"
                  disabled={submitting || !formValid}
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-gray-800 text-sm font-bold text-white transition hover:bg-gray-900 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <CreditCard className="h-4 w-4" />
                  {submitting ? "Please wait…" : "Proceed to Payment"}
                </button>
              </div>

              {showTermsWarning && (
                <p className="rounded-md border border-amber-200 bg-amber-50 px-3 py-2 text-xs text-amber-800">
                  Please accept the terms and conditions
                </p>
              )}
              {paymentError && (
                <p className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-xs text-red-800">
                  {paymentError}
                </p>
              )}
            </div>
          </SummaryCard>
        </form>

        <p className="mt-8 text-center text-xs text-gray-500">
          Your personal information is secure and will only be used for booking purposes
        </p>
      </main>

      <FullFooterSection />
    </div>
  );
}
