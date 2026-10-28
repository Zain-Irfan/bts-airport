import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Clock3, Briefcase, ShieldCheck, Plane } from "lucide-react";
import { FullFooterSection } from "@/components/FullFooterSection";
import { SiteTopHeader } from "@/components/layout/SiteTopHeader";

export const metadata: Metadata = {
  title: "London Airport Transfers",
  description: "Pre-book fixed-price transfers to and from Heathrow, Gatwick, Stansted, Luton, London City and Southend airports, available 24/7.",
};

const airports = [
  {
    slug: "heathrow",
    name: "Heathrow",
    tag: "LHR · T2 · T3 · T4 · T5",
    blurb: "Terminal-aware pickups with live flight tracking.",
  },
  {
    slug: "gatwick",
    name: "Gatwick",
    tag: "LGW · North · South",
    blurb: "Reliable arrivals across both terminals.",
  },
  {
    slug: "luton",
    name: "Luton",
    tag: "LTN · Budget hub",
    blurb: "Budget connections handled with premium care.",
  },
  {
    slug: "stansted",
    name: "Stansted",
    tag: "STN · Northern hub",
    blurb: "Northern airport runs without the hassle.",
  },
  {
    slug: "london-city",
    name: "London City",
    tag: "LCY · Business hub",
    blurb: "Fast transfers tuned for business travellers.",
  },
  {
    slug: "southend",
    name: "Southend",
    tag: "SEN · Eastern hub",
    blurb: "Eastern connections, on schedule, every time.",
  },
];

const features = [
  {
    icon: Clock3,
    title: "45-min grace period",
    desc: "Free waiting time on airport pickups while you clear customs.",
  },
  {
    icon: Briefcase,
    title: "Luggage-aware fleet",
    desc: "Vehicles matched to passenger count and bag size, automatically.",
  },
  {
    icon: ShieldCheck,
    title: "Vetted chauffeurs",
    desc: "Licensed, insured, and trained in discreet private transport.",
  },
];

export default function AirportTransfersPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteTopHeader />

      <main>
        {/* ── Hero ── */}
        <section className="BTS-hero-ambient BTS-luxury-section-1 BTS-grid-bg relative overflow-hidden py-20 md:py-28">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-3xl space-y-6 text-center">
              <p className="BTS-pill mx-auto">
                <Plane className="h-3.5 w-3.5" />
                Airport transfers
              </p>
              <h1 className="text-4xl font-extrabold tracking-tight text-foreground drop-shadow-sm md:text-5xl lg:text-6xl">
                Pre-book a reliable transfer to every London airport
              </h1>
              <p className="mx-auto max-w-2xl text-lg leading-7 text-body">
                Choose your airport to view transfer info, fixed fares, and
                start a booking — covered by flight monitoring, free waiting
                time, and meet &amp; greet on arrival.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                <Link
                  href="/taxi-fare-calculator"
                  className="BTS-cta-dark inline-flex h-12 items-center justify-center rounded-xl px-6 text-sm font-semibold tracking-wide"
                >
                  Fare calculator
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ── Airport card grid ── */}
        <section className="BTS-section-charcoal relative py-20 md:py-28">
          <div className="container mx-auto px-4">
            <div className="mb-12 flex flex-col items-start gap-3 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-gold-ink">
                  Coverage
                </p>
                <h2 className="mt-2 text-3xl font-bold tracking-tight text-foreground md:text-4xl">
                  Every major London airport
                </h2>
              </div>
              <p className="max-w-md text-sm leading-6 text-muted-foreground">
                Fixed pricing, transparent waiting policies, and chauffeur-grade
                vehicles for every terminal.
              </p>
            </div>

            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {airports.map((a) => (
                <Link
                  key={a.slug}
                  href={`/airport-transfers/${a.slug}`}
                  className="BTS-card group block p-6 transition-all"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-muted-foreground">
                        {a.tag}
                      </p>
                      <h3 className="mt-2 text-2xl font-bold tracking-tight text-foreground">
                        {a.name}
                      </h3>
                    </div>
                    <span className="BTS-icon-halo h-11 w-11 transition-all duration-300 group-hover:bg-card group-hover:border-gold/50 group-hover:shadow-md">
                      <ArrowRight className="h-4 w-4" />
                    </span>
                  </div>
                  <p className="mt-4 text-sm leading-6 text-body">
                    {a.blurb}
                  </p>
                  <div className="mt-6 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-gold-ink transition-colors group-hover:text-foreground">
                    Book transfer
                    <span className="h-px w-6 bg-border transition-all duration-300 group-hover:w-10 group-hover:bg-gold" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ── Features strip ── */}
        <section className="BTS-section-onyx relative py-20 md:py-24">
          <div className="container mx-auto px-4">
            <div className="grid gap-6 md:grid-cols-3">
              {features.map((f) => {
                const Icon = f.icon;
                return (
                  <div
                    key={f.title}
                    className="BTS-glass relative overflow-hidden rounded-2xl p-7"
                  >
                    <span className="BTS-icon-halo mb-5">
                      <Icon className="h-5 w-5" />
                    </span>
                    <h3 className="text-xl font-semibold tracking-tight text-foreground">
                      {f.title}
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-body">
                      {f.desc}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </main>

      <FullFooterSection />
    </div>
  );
}
