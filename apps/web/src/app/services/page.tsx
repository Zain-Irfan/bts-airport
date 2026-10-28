import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Car,
  Building2,
  Sparkles,
  Headphones,
} from "lucide-react";
import { FullFooterSection } from "@/components/FullFooterSection";
import { SiteTopHeader } from "@/components/layout/SiteTopHeader";

export const metadata: Metadata = {
  title: "Our Services",
  description: "Airport transfers, business travel, chauffeur and A-to-B taxi services across London, all at fixed prices with licensed drivers.",
};

const services = [
  {
    icon: Car,
    title: "A to B Taxi",
    desc: "Point-to-point travel anywhere in London with a frictionless booking flow.",
    href: "/services/a-to-b-taxi",
    tag: "Everyday transfers",
  },
  {
    icon: Building2,
    title: "Business Taxi Services",
    desc: "Executive-friendly rides with flexible pickup notes, account billing, and reliable timings.",
    href: "/services/business-taxi-services",
    tag: "Corporate accounts",
  },
  {
    icon: Sparkles,
    title: "Dial a Cab",
    desc: "Instant quotes on any device, with luggage and passenger details captured up front.",
    href: "/services/dial-a-cab",
    tag: "Instant booking",
  },
  {
    icon: Headphones,
    title: "Chauffeur Service",
    desc: "Discreet, suited drivers and luxury vehicles for high-end private transport.",
    href: "/services/business-taxi-services",
    tag: "Private hire",
  },
];

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteTopHeader />

      <main>
        {/* ── Hero ── */}
        <section className="BTS-hero-ambient BTS-luxury-section-3 BTS-grid-bg relative overflow-hidden py-20 md:py-28">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-3xl space-y-6 text-center">
              <p className="BTS-pill mx-auto">
                <Sparkles className="h-3.5 w-3.5" />
                Services
              </p>
              <h1 className="text-4xl font-extrabold tracking-tight text-foreground drop-shadow-sm md:text-5xl lg:text-6xl">
                Built for every London journey
              </h1>
              <p className="mx-auto max-w-2xl text-lg leading-7 text-body">
                The same booking engine powers airport transfers, business
                travel, and point-to-point rides — with transparent pricing and
                premium vehicles across every category.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                <Link
                  href="/airport-transfers"
                  className="BTS-cta-dark inline-flex h-12 items-center justify-center rounded-xl px-6 text-sm font-semibold tracking-wide"
                >
                  View airport transfers
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ── Service grid ── */}
        <section className="BTS-section-charcoal relative py-20 md:py-28">
          <div className="container mx-auto px-4">
            <div className="mb-12 flex flex-col items-start gap-3 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-gold-ink">
                  Coverage
                </p>
                <h2 className="mt-2 text-3xl font-bold tracking-tight text-foreground md:text-4xl">
                  A service for every journey
                </h2>
              </div>
              <p className="max-w-md text-sm leading-6 text-muted-foreground">
                From quick city hops to executive transport — each service
                shares one booking engine, one fleet, one quality bar.
              </p>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              {services.map((s) => {
                const Icon = s.icon;
                return (
                  <Link
                    key={s.title}
                    href={s.href}
                    className="BTS-card group flex items-start gap-5 p-7 transition-all"
                  >
                    <span className="BTS-icon-halo h-14 w-14 flex-none transition-all duration-300 group-hover:bg-card group-hover:border-gold/50 group-hover:shadow-md">
                      <Icon className="h-6 w-6" />
                    </span>
                    <div className="flex-1">
                      <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-muted-foreground">
                        {s.tag}
                      </p>
                      <div className="mt-1 flex items-center justify-between gap-2">
                        <h3 className="text-xl font-bold tracking-tight text-foreground">
                          {s.title}
                        </h3>
                        <ArrowRight className="h-4 w-4 text-gold-ink transition-all duration-300 group-hover:translate-x-1 group-hover:text-foreground" />
                      </div>
                      <p className="mt-3 text-sm leading-6 text-body">
                        {s.desc}
                      </p>
                    </div>
                  </Link>
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
