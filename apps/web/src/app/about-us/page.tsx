import Link from "next/link";
import { ShieldCheck, Clock3, BadgeCheck, Users } from "lucide-react";
import { FullFooterSection } from "@/components/FullFooterSection";
import { SiteTopHeader } from "@/components/layout/SiteTopHeader";
import { Button } from "@/components/ui/button";

export default function AboutUsPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteTopHeader />

      <main>
        <section className="bg-primary text-primary-foreground py-20">
          <div className="container mx-auto px-4 text-center max-w-4xl">
            <p className="text-sm font-semibold uppercase tracking-wider text-accent">About Us</p>
            <h1 className="mt-3 text-4xl md:text-5xl font-extrabold tracking-tight">
              Trusted London Transfers, Built Around You
            </h1>
            <p className="mt-6 text-lg text-primary-foreground/80">
              UKRide delivers dependable taxi and airport transfer services across London,
              combining professional drivers, clear pricing, and a modern booking experience.
            </p>
          </div>
        </section>

        <section className="py-24 md:py-32 bg-secondary">
          <div className="container mx-auto px-4 grid gap-10 md:grid-cols-2 items-center">
            <img
              src="/perfect-taxi.jpg"
              alt="UKRide professional transfer"
              className="h-[360px] w-full rounded-2xl object-cover shadow-lg"
            />
            <div className="space-y-5">
              <h2 className="text-3xl font-bold text-foreground">Who We Are</h2>
              <p className="text-muted-foreground">
                We are a London-focused transport team dedicated to premium airport and city transfers.
                From early-morning flights to late-night pickups, we manage every journey with reliability and care.
              </p>
              <p className="text-muted-foreground">
                Our mission is simple: make travel effortless. With licensed drivers, quality vehicles,
                and responsive support, we ensure passengers get to their destination on time and in comfort.
              </p>
              <Button asChild className="bg-accent text-accent-foreground hover:bg-accent/90">
                <Link href="/taxi-quote">Book a Taxi</Link>
              </Button>
            </div>
          </div>
        </section>

        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-foreground text-center mb-12">Why Choose UKRide</h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              <Card
                icon={<ShieldCheck className="h-7 w-7 text-accent" />}
                title="Licensed Drivers"
                desc="Professional, vetted, and customer-focused chauffeurs for every trip."
              />
              <Card
                icon={<Clock3 className="h-7 w-7 text-accent" />}
                title="24/7 Availability"
                desc="Round-the-clock service for airport transfers and local journeys."
              />
              <Card
                icon={<BadgeCheck className="h-7 w-7 text-accent" />}
                title="Transparent Pricing"
                desc="Clear fares with no hidden surprises, including key transfer costs."
              />
              <Card
                icon={<Users className="h-7 w-7 text-accent" />}
                title="Customer First"
                desc="Supportive service from booking confirmation to final drop-off."
              />
            </div>
          </div>
        </section>

        <section className="py-24 md:py-32 bg-secondary">
          <div className="container mx-auto px-4 text-center max-w-3xl">
            <h2 className="text-3xl font-bold text-foreground">Our Promise</h2>
            <p className="mt-5 text-muted-foreground leading-8">
              Every UKRide booking is handled with precision, punctuality, and professionalism.
              Whether you need an airport transfer, business ride, or point-to-point travel,
              we are committed to delivering a smooth and premium experience every mile.
            </p>
            <Button asChild className="mt-8 bg-accent text-accent-foreground hover:bg-accent/90">
              <Link href="/#quote">Get Instant Quote</Link>
            </Button>
          </div>
        </section>
      </main>

      <FullFooterSection />
    </div>
  );
}

function Card({
  icon,
  title,
  desc,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
}) {
  return (
    <div className="rounded-2xl border border-white/[0.08] bg-card p-6 shadow-sm">
      <div className="mb-3">{icon}</div>
      <div className="text-lg font-semibold text-foreground">{title}</div>
      <div className="mt-2 text-sm leading-6 text-muted-foreground">{desc}</div>
    </div>
  );
}

