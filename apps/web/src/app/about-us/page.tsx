import Link from "next/link";
import { ShieldCheck, Clock3, BadgeCheck, Users, Sparkles } from "lucide-react";
import { FullFooterSection } from "@/components/FullFooterSection";
import { SiteTopHeader } from "@/components/layout/SiteTopHeader";
import { Button } from "@/components/ui/button";

export default function AboutUsPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteTopHeader />

      <main>
        {/* ── Hero ── */}
        <section className="BTS-hero-ambient BTS-luxury-section-2 BTS-grid-bg relative overflow-hidden py-24 md:py-32">
          <div className="container mx-auto max-w-4xl px-4 text-center">
            <p className="BTS-pill mx-auto">
              <Sparkles className="h-3.5 w-3.5" />
              About us
            </p>
            <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-[#F8F8F8] drop-shadow-[0_2px_24px_rgba(0,0,0,0.5)] md:text-5xl lg:text-6xl">
              Trusted London transfers, built around you
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-7 text-[#D1D5DB]">
              London Airport Taxi Services delivers dependable taxi and airport transfer services
              across London — combining professional drivers, transparent
              pricing, and a modern booking experience.
            </p>
          </div>
        </section>

        {/* ── Who we are ── */}
        <section className="BTS-section-charcoal relative py-24 md:py-32">
          <div className="container mx-auto grid items-center gap-12 px-4 md:grid-cols-2">
            <div className="BTS-purple-glow relative overflow-hidden rounded-3xl">
              <img
                src="/images/heathrow-driver-loading.jpg"
                alt="London Airport Taxi Services professional transfer"
                className="h-[420px] w-full object-cover"
              />
              <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,transparent_50%,rgba(13,13,15,0.4)_100%)]" />
            </div>
            <div className="space-y-6">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#C0C0C0]">
                Who we are
              </p>
              <h2 className="text-3xl font-bold tracking-tight text-[#F8F8F8] md:text-4xl">
                London-focused transport, finished with care
              </h2>
              <p className="text-[#D1D5DB]">
                We are a London-focused transport team dedicated to premium
                airport and city transfers. From early-morning flights to
                late-night pickups, every journey is managed with reliability
                and care.
              </p>
              <p className="text-[#A5A7AA]">
                Our mission is simple: make travel effortless. With licensed
                drivers, quality vehicles, and responsive support, passengers
                arrive on time and in comfort.
              </p>
              <div className="pt-2">
                <Button asChild size="lg">
                  <Link href="/taxi-quote">Book a Taxi</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* ── Why choose us ── */}
        <section className="BTS-section-onyx relative py-24 md:py-28">
          <div className="container mx-auto px-4">
            <div className="mx-auto mb-12 max-w-2xl text-center">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#C0C0C0]">
                Why London Airport Taxi Services
              </p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-[#F8F8F8] md:text-4xl">
                The standards behind every ride
              </h2>
            </div>
            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
              <AboutCard
                icon={<ShieldCheck className="h-5 w-5" />}
                title="Licensed drivers"
                desc="Professional, vetted, customer-focused chauffeurs on every trip."
              />
              <AboutCard
                icon={<Clock3 className="h-5 w-5" />}
                title="24/7 availability"
                desc="Round-the-clock service for airport transfers and city journeys."
              />
              <AboutCard
                icon={<BadgeCheck className="h-5 w-5" />}
                title="Transparent pricing"
                desc="Clear fares with no hidden surprises, including key transfer costs."
              />
              <AboutCard
                icon={<Users className="h-5 w-5" />}
                title="Customer first"
                desc="Supportive service from booking confirmation to final drop-off."
              />
            </div>
          </div>
        </section>

        {/* ── Promise ── */}
        <section className="BTS-section-charcoal relative py-24 md:py-32">
          <div className="container mx-auto max-w-3xl px-4 text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#C0C0C0]">
              Our promise
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-[#F8F8F8] md:text-4xl">
              Precision, punctuality, professionalism
            </h2>
            <p className="mt-5 text-[#D1D5DB] leading-8">
              Every London Airport Taxi Services booking is handled with care. Airport transfers,
              business rides, or point-to-point travel — we deliver a smooth,
              premium experience every mile.
            </p>
          </div>
        </section>
      </main>

      <FullFooterSection />
    </div>
  );
}

function AboutCard({
  icon,
  title,
  desc,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
}) {
  return (
    <div className="BTS-card p-6">
      <span className="BTS-icon-halo mb-4 h-11 w-11">{icon}</span>
      <h3 className="text-lg font-semibold tracking-tight text-[#F8F8F8]">
        {title}
      </h3>
      <p className="mt-2 text-sm leading-6 text-[#D1D5DB]">{desc}</p>
    </div>
  );
}
