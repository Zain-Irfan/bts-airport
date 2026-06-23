import Link from "next/link";
import { FullFooterSection } from "@/components/FullFooterSection";
import { SiteTopHeader } from "@/components/layout/SiteTopHeader";
import { Button } from "@/components/ui/button";
import { Plane, CheckCircle2, ArrowLeft } from "lucide-react";

const airportBySlug: Record<
  string,
  { name: string; blurb: string; bullets: string[] }
> = {
  heathrow: {
    name: "Heathrow",
    blurb:
      "Premium pickups and drop-offs with meet & greet options and luggage-aware vehicle choices.",
    bullets: [
      "Terminal-aware pickup notes (coming with API)",
      "Flight number support for smoother coordination",
      "Comfort-first vehicles for business and family travel",
    ],
  },
  gatwick: {
    name: "Gatwick",
    blurb:
      "Pre-book Gatwick transfers with transparent estimates and reliable timings.",
    bullets: [
      "Fixed-style quoting UI (connect pricing next)",
      "Meet & greet options",
      "Return journeys supported in one booking",
    ],
  },
  luton: {
    name: "Luton",
    blurb:
      "Simple, clean booking for Luton airport transfers — ideal for early flights and late arrivals.",
    bullets: [
      "24/7 availability messaging",
      "Vehicle choices based on passengers + luggage",
      "Smooth booking experience across devices",
    ],
  },
  stansted: {
    name: "Stansted",
    blurb: "Comfortable Stansted transfers with a streamlined quote → booking flow.",
    bullets: [
      "Fast quote experience",
      "Clear trip details and add-ons",
      "Return trip toggle in the form",
    ],
  },
  "london-city": {
    name: "London City",
    blurb:
      "City Airport transfers designed for business schedules and tight turnaround times.",
    bullets: [
      "Executive-friendly positioning",
      "Meet & greet and flight details fields",
      "Short, clear booking steps",
    ],
  },
  southend: {
    name: "Southend",
    blurb: "Reliable Southend airport transfers with easy pre-booking and clear trip details.",
    bullets: [
      "Simple address-based pickup/dropoff",
      "Luggage configuration built-in",
      "Transparent quote UI",
    ],
  },
};

export default async function AirportTransferDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const airport =
    airportBySlug[slug] ??
    ({
      name: "Airport",
      blurb: "Pre-book airport transfers across London with a modern booking experience.",
      bullets: [
        "Instant quote UI",
        "Meet & greet support",
        "Return journey option",
      ],
    } as const);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteTopHeader />

      {/* Hero */}
      <section className="ukride-hero-ambient ukride-luxury-section-1 ukride-grid-bg relative overflow-hidden py-20 lg:py-28">
        <div className="container relative z-10 mx-auto max-w-5xl px-4">
          <Link
            href="/airport-transfers"
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#A5A7AA] transition hover:text-[#F8F8F8]"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            All airports
          </Link>

          <div className="mt-6 flex items-center gap-3">
            <span className="ukride-pill">
              <span className="block h-1.5 w-1.5 rounded-full bg-[#C0C0C0]" />
              Airport transfers
            </span>
          </div>

          <h1 className="mt-6 text-4xl font-bold tracking-tight text-[#F8F8F8] md:text-5xl">
            {airport.name}{" "}
            <span className="bg-[linear-gradient(135deg,#C0C0C0_0%,#F8F8F8_50%,#A5A7AA_100%)] bg-clip-text text-transparent">
              airport transfers
            </span>
          </h1>
          <p className="mt-6 max-w-2xl text-[15px] leading-relaxed text-[#CFCFCF]">
            {airport.blurb}
          </p>

          <div className="mt-8">
            <Button asChild variant="outline" size="lg" className="h-12 px-7 text-sm font-semibold tracking-wide">
              <Link href="/airport-transfers">Back to airports</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Bullets */}
      <section className="ukride-section-charcoal relative py-20 md:py-24">
        <div className="container mx-auto max-w-5xl px-4">
          <div className="grid gap-6 md:grid-cols-3">
            {airport.bullets.map((b) => (
              <div key={b} className="ukride-card p-6">
                <div className="ukride-icon-halo h-10 w-10">
                  <CheckCircle2 className="h-5 w-5" />
                </div>
                <div className="mt-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#C0C0C0]">
                  Included
                </div>
                <div className="mt-2 text-[14.5px] leading-relaxed text-[#CFCFCF]">{b}</div>
              </div>
            ))}
          </div>

          <div className="mt-12 ukride-card p-6 md:p-8">
            <div className="flex items-start gap-4">
              <div className="ukride-icon-halo h-10 w-10">
                <Plane className="h-5 w-5" />
              </div>
              <div className="flex-1">
                <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#C0C0C0]">
                  Next step
                </div>
                <p className="mt-2 text-[14.5px] leading-relaxed text-[#CFCFCF]">
                  When you&apos;re ready, the booking flow connects to live
                  pricing, payment, and confirmed driver allocation.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <FullFooterSection />
    </div>
  );
}
