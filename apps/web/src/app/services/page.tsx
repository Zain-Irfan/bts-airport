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
              <h1 className="text-4xl font-extrabold tracking-tight text-[#F8F8F8] drop-shadow-[0_2px_24px_rgba(0,0,0,0.5)] md:text-5xl lg:text-6xl">
                Built for every London journey
              </h1>
              <p className="mx-auto max-w-2xl text-lg leading-7 text-[#D1D5DB]">
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
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#C0C0C0]">
                  Coverage
                </p>
                <h2 className="mt-2 text-3xl font-bold tracking-tight text-[#F8F8F8] md:text-4xl">
                  A service for every journey
                </h2>
              </div>
              <p className="max-w-md text-sm leading-6 text-[#A5A7AA]">
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
                    <span className="BTS-icon-halo h-14 w-14 flex-none transition-all duration-300 group-hover:bg-[linear-gradient(135deg,rgba(192,192,192,0.18)_0%,rgba(51, 51, 51,0.35)_100%)] group-hover:border-[rgba(192,192,192,0.45)] group-hover:shadow-[0_0_16px_-4px_rgba(192,192,192,0.25)]">
                      <Icon className="h-6 w-6" />
                    </span>
                    <div className="flex-1">
                      <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#A5A7AA]">
                        {s.tag}
                      </p>
                      <div className="mt-1 flex items-center justify-between gap-2">
                        <h3 className="text-xl font-bold tracking-tight text-[#F8F8F8]">
                          {s.title}
                        </h3>
                        <ArrowRight className="h-4 w-4 text-[#C0C0C0] transition-all duration-300 group-hover:translate-x-1 group-hover:text-[#F8F8F8]" />
                      </div>
                      <p className="mt-3 text-sm leading-6 text-[#D1D5DB]">
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
