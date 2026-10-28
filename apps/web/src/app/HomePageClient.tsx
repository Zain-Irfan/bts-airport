"use client";

import Link from "next/link";
import { useSiteSettings } from "@/components/providers/SiteSettingsProvider";
import { telHref } from "@/lib/phone";
import { SiteTopHeader } from "@/components/layout/SiteTopHeader";
import { FullFooterSection } from "@/components/FullFooterSection";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  ArrowRight,
  Award,
  BadgeCheck,
  Briefcase,
  CalendarCheck,
  CheckCircle2,
  Clock,
  CreditCard,
  HeartHandshake,
  Luggage,
  MapPin,
  Phone,
  Plane,
  ShieldCheck,
  Star,
  UserCheck,
  Users,
  Zap,
} from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { HomeBookingForm } from "@/components/forms/HomeBookingForm";
import { TestimonialsSlider } from "@/components/home/TestimonialsSlider";

const AIRPORTS = [
  { name: "Heathrow Airport", desc: "Terminal 2, 3, 4, 5 transfers", img: "/images/heathrow-exterior.jpg", slug: "heathrow" },
  { name: "Gatwick Airport", desc: "North and South terminal services", img: "/images/gatwick-sign.jpg", slug: "gatwick" },
  { name: "London City Airport", desc: "Fast business hub connections", img: "/images/executive-passenger.jpg", slug: "london-city" },
  { name: "Luton Airport", desc: "Budget airline connections", img: "/images/airport-fleet-aerial.jpg", slug: "luton" },
  { name: "Stansted Airport", desc: "Reliable northern hub transfers", img: "/images/british-airways-plane.jpg", slug: "stansted" },
  { name: "Southend Airport", desc: "Eastern connection specialist", img: "/images/mpv-airport-boarding.jpg", slug: "southend" },
];

const FLEET = [
  { name: "Saloon", note: "Everyday comfort", pax: 4, hand: 1, lug: 2, img: "/images/saloon.jpeg" },
  { name: "Executive", note: "Business-class travel", pax: 4, hand: 1, lug: 1, img: "/images/vehicle-sclass-new.jpg" },
  { name: "Estate", note: "Extra boot space", pax: 4, hand: 2, lug: 3, img: "/images/vehicle-estate.jpg" },
  { name: "MPV", note: "Ideal for families", pax: 6, hand: 3, lug: 4, img: "/images/vehicle-vclass-8seater.jpg" },
  { name: "8 Seater Minibus", note: "Groups and tours", pax: 8, hand: 4, lug: 6, img: "/images/vehicle-transit.jpg" },
  { name: "Electric", note: "Zero-emission travel", pax: 4, hand: 2, lug: 1, img: "/images/saloon.jpeg" },
  { name: "Chauffeur", note: "Special occasions", pax: 4, hand: 1, lug: 2, img: "/images/vehicle-sclass-old.jpg" },
];

const FAQS = [
  {
    q: "How far in advance should I book my airport transfer?",
    a: "We recommend pre-booking at least 6–12 hours in advance to lock the best vehicle and a fixed fare. Last-minute bookings are also accepted when we have availability.",
  },
  {
    q: "What happens if my flight is delayed?",
    a: "We monitor your flight in real-time and automatically adjust the pickup so your driver is there when you land — no extra charges for monitored airport delays.",
  },
  {
    q: "Are your prices fixed or metered?",
    a: "All MRM Executive Voyage airport and pre-booked transfers are quoted at a fixed fare. The price you confirm at booking is the price you pay — taxes, tolls and parking included.",
  },
  {
    q: "Do you provide child seats?",
    a: "Yes — infant, child and booster seats are available on request during booking, free of charge.",
  },
  {
    q: "How do I find my driver at the airport?",
    a: "Standard pickups meet you at the designated terminal pickup zone. Meet-and-greet drivers wait inside arrivals with an MRM Executive Voyage name board.",
  },
  {
    q: "What payment methods do you accept?",
    a: "We accept all major credit/debit cards, Apple Pay, Google Pay and corporate account billing for business clients.",
  },
  {
    q: "Can I cancel or amend my booking?",
    a: "You can amend or cancel free of charge up to the cut-off window defined in our terms — typically 3 hours before pickup for London and 7 hours for out-of-London journeys.",
  },
  {
    q: "Is the 45-minute waiting time really free?",
    a: "Yes. We include up to 45 free waiting minutes for Heathrow arrivals and 30 minutes for other London airports — measured from your actual landing time.",
  },
];

function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  className,
}: {
  eyebrow: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  align?: "center" | "left";
  className?: string;
}) {
  return (
    <div className={className ?? (align === "center" ? "mx-auto mb-12 max-w-2xl text-center md:mb-14" : "mb-10 max-w-2xl")}>
      <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-gold-ink">{eyebrow}</p>
      <h2 className="text-3xl tracking-tight text-foreground md:text-4xl">{title}</h2>
      {description ? (
        <p className="mt-4 text-base leading-relaxed text-body md:text-lg">{description}</p>
      ) : null}
    </div>
  );
}

function CheckList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-3">
      {items.map((item) => (
        <li key={item} className="flex items-start gap-3">
          <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-gold-ink" />
          <span className="font-medium text-foreground/90">{item}</span>
        </li>
      ))}
    </ul>
  );
}

export default function HomePageClient() {
  const { whatsapp, phone } = useSiteSettings();
  return (
    <div className="min-h-screen overflow-x-hidden bg-background font-sans">
      <a
        href={`https://wa.me/${whatsapp}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="fixed bottom-4 right-4 z-[60] flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-[#25D366] text-white shadow-xl transition-all duration-300 hover:bg-[#1ebe5d] sm:bottom-6 sm:right-6 sm:h-14 sm:w-14"
      >
        <FaWhatsapp className="h-7 w-7" />
      </a>

      <SiteTopHeader />

      {/* ── Hero + booking form ── */}
      <section
        id="quote"
        className="BTS-hero-ambient BTS-luxury-section-1 relative scroll-mt-20 pb-14 pt-10 sm:pt-14 lg:pb-24 lg:pt-20"
      >
        <div className="absolute inset-0 z-0 overflow-hidden">
          <img
            src="/hero-bg.jpg"
            alt="London at night"
            className="BTS-media-cinematic absolute inset-0 h-full w-full object-cover opacity-50"
          />
          <div className="BTS-media-overlay" />
        </div>

        <div className="container relative z-20 mx-auto px-4">
          <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_1fr] lg:gap-14">
            <div className="space-y-7">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-xs sm:text-sm">
                <span className="flex">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star key={s} className="h-3.5 w-3.5 fill-gold text-gold" />
                  ))}
                </span>
                <span className="font-semibold text-foreground">4.9</span>
                <span className="text-muted-foreground">from 1,538+ Google reviews</span>
              </div>

              <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-[3.5rem]">
                London Taxi Services,{" "}
                <span className="block text-gold">anytime you need.</span>
              </h1>

              <p className="max-w-xl text-base leading-relaxed text-body sm:text-lg">
                Pre-booked transfers to, from and within London. Reliable,
                professional drivers and guaranteed lowest prices.
              </p>

              <ul className="grid max-w-xl grid-cols-1 gap-x-6 gap-y-3 text-sm sm:grid-cols-2">
                {[
                  "Fixed fares — taxes & tolls included",
                  "Free 45-minute airport wait",
                  "Live flight monitoring",
                  "Meet & greet at arrivals",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-2.5 text-foreground/90">
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-gold" />
                    {item}
                  </li>
                ))}
              </ul>

              <div className="flex flex-col gap-4 border-t border-white/10 pt-6 sm:flex-row sm:gap-8">
                <a href={telHref(phone)} className="group flex items-center gap-3">
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-gold/15 ring-1 ring-gold/40">
                    <Phone className="h-5 w-5 text-gold" />
                  </span>
                  <span>
                    <span className="block text-xs uppercase tracking-wider text-muted-foreground">Call 24/7</span>
                    <span className="block text-base font-bold text-foreground group-hover:text-gold sm:text-lg">{phone}</span>
                  </span>
                </a>
                <a href={`https://wa.me/${whatsapp}`} target="_blank" rel="noopener noreferrer" className="group flex items-center gap-3">
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#25D366]/15 ring-1 ring-[#25D366]/40">
                    <FaWhatsapp className="h-5 w-5 text-[#25D366]" />
                  </span>
                  <span>
                    <span className="block text-xs uppercase tracking-wider text-muted-foreground">WhatsApp</span>
                    <span className="block text-base font-bold text-foreground group-hover:text-gold sm:text-lg">Chat with us</span>
                  </span>
                </a>
              </div>
            </div>

            <HomeBookingForm />
          </div>
        </div>
      </section>

      {/* ── Stats + accreditation strip ── */}
      <section className="border-b border-border bg-surface">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 divide-border py-8 md:grid-cols-4 md:divide-x md:py-10">
            {[
              { value: "10,000+", label: "Trips completed" },
              { value: "4.9/5", label: "Average Google rating" },
              { value: "50+", label: "Professional drivers" },
              { value: "24/7", label: "Booking & support" },
            ].map((stat) => (
              <div key={stat.label} className="px-4 py-3 text-center">
                <div className="text-3xl font-extrabold tracking-tight text-foreground md:text-4xl">{stat.value}</div>
                <div className="mt-1 text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 border-t border-border py-5 text-sm font-medium text-body">
            {[
              { icon: BadgeCheck, label: "PCO Licensed" },
              { icon: ShieldCheck, label: "Fully Insured" },
              { icon: Plane, label: "Flight Monitored" },
              { icon: HeartHandshake, label: "Meet & Greet" },
              { icon: Award, label: "Award Winning" },
              { icon: CheckCircle2, label: "Fixed Pricing" },
            ].map(({ icon: Icon, label }) => (
              <span key={label} className="flex items-center gap-2">
                <Icon className="h-4 w-4 text-gold-ink" />
                {label}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── Why choose us ── */}
      <section className="bg-background py-20 md:py-24">
        <div className="container mx-auto px-4">
          <SectionHeading
            eyebrow="Our promise"
            title="Why choose MRM Executive Voyage"
            description="Every journey comes with our commitment to quality, reliability, and the best value in London."
          />
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: Clock, title: "45-min grace period", desc: "Free 45-minute wait on every airport arrival — no stress, no extra charges." },
              { icon: ShieldCheck, title: "Quality vehicles", desc: "Well-maintained, road-ready vehicles for a comfortable ride every time." },
              { icon: Zap, title: "Available 24/7", desc: "Round-the-clock availability for all London airport transfers." },
              { icon: CheckCircle2, title: "Lowest price guaranteed", desc: "Best prices on the market — guaranteed when you book with us." },
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} className="BTS-card p-6">
                <div className="BTS-icon-halo mb-5">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mb-2 text-lg tracking-tight text-foreground">{title}</h3>
                <p className="text-sm leading-relaxed text-body">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── How it works ── */}
      <section className="border-y border-border bg-surface py-20 md:py-24">
        <div className="container mx-auto px-4">
          <SectionHeading
            eyebrow="How it works"
            title="Booked in three simple steps"
            description="From quote to drop-off, everything is handled online — with a real person on hand 24/7 if you need us."
          />
          <ol className="relative grid gap-10 md:grid-cols-3 md:gap-8">
            <div className="absolute left-[16.66%] right-[16.66%] top-7 hidden h-px bg-border md:block" aria-hidden />
            {[
              { icon: MapPin, title: "Get an instant quote", desc: "Enter your pickup, destination and travel time to see fixed prices for every vehicle." },
              { icon: CreditCard, title: "Book and pay securely", desc: "Choose your vehicle, add flight details and pay online. Confirmation arrives by email." },
              { icon: UserCheck, title: "Meet your driver", desc: "Your licensed driver tracks your flight and is waiting on arrival — ready to go." },
            ].map(({ icon: Icon, title, desc }, i) => (
              <li key={title} className="relative text-center">
                <div className="relative mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full border border-gold/40 bg-surface text-gold-ink">
                  <Icon className="h-6 w-6" />
                  <span className="absolute -right-1 -top-1 flex h-6 w-6 items-center justify-center rounded-full bg-navy text-xs font-bold text-white">
                    {i + 1}
                  </span>
                </div>
                <h3 className="mb-2 text-lg tracking-tight text-foreground">{title}</h3>
                <p className="mx-auto max-w-xs text-sm leading-relaxed text-body">{desc}</p>
              </li>
            ))}
          </ol>
          <div className="mt-12 text-center">
            <Button asChild size="lg" className="h-12 px-8">
              <Link href="#quote">
                Get my fixed quote <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* ── Airport transfers ── */}
      <section className="bg-background py-20 md:py-24">
        <div className="container mx-auto px-4">
          <div className="mb-10 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <SectionHeading
              align="left"
              className="max-w-2xl"
              eyebrow="Airport transfers"
              title="Transfers to every London airport"
              description="Reliable, punctual transfers to and from all major London airports. We monitor your flight to ensure we're there exactly when you need us."
            />
            <Link href="/airport-transfers" className="BTS-link inline-flex shrink-0 items-center gap-1.5 text-sm font-semibold">
              View all airports <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {AIRPORTS.map((airport) => (
              <Link
                key={airport.slug}
                href={`/airport-transfers/${airport.slug}`}
                className="BTS-vehicle-card group block"
              >
                <div className="BTS-vehicle-media relative h-48">
                  <img src={airport.img} alt={airport.name} className="h-full w-full object-cover" />
                </div>
                <div className="flex items-center justify-between gap-4 p-5">
                  <div>
                    <h3 className="text-lg tracking-tight text-foreground">{airport.name}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">{airport.desc}</p>
                  </div>
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-border text-gold-ink transition-colors group-hover:border-gold group-hover:bg-gold group-hover:text-gold-foreground">
                    <ArrowRight className="h-4 w-4" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Fleet ── */}
      <section className="border-y border-border bg-surface py-20 md:py-24">
        <div className="container mx-auto px-4">
          <SectionHeading
            eyebrow="Our fleet"
            title="A vehicle for every journey"
            description="From everyday saloons to spacious minibuses, our immaculately maintained fleet is ready to serve."
          />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {FLEET.map((vehicle) => (
              <div key={vehicle.name} className="BTS-vehicle-card group flex flex-col">
                <div className="relative h-40 overflow-hidden bg-white">
                  <img src={vehicle.img} alt={vehicle.name} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]" />
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <h3 className="text-lg tracking-tight text-foreground">{vehicle.name}</h3>
                  <p className="text-sm text-muted-foreground">{vehicle.note}</p>
                  <div className="my-5 grid grid-cols-3 divide-x divide-border rounded-lg border border-border bg-muted/40 text-center text-xs text-muted-foreground">
                    <span className="flex flex-col items-center gap-1 py-2.5">
                      <Users className="h-4 w-4 text-gold-ink" />
                      <span><b className="text-foreground">{vehicle.pax}</b> passengers</span>
                    </span>
                    <span className="flex flex-col items-center gap-1 py-2.5">
                      <Luggage className="h-4 w-4 text-gold-ink" />
                      <span><b className="text-foreground">{vehicle.lug}</b> suitcases</span>
                    </span>
                    <span className="flex flex-col items-center gap-1 py-2.5">
                      <Briefcase className="h-4 w-4 text-gold-ink" />
                      <span><b className="text-foreground">{vehicle.hand}</b> hand bags</span>
                    </span>
                  </div>
                  <Button asChild variant="outline" className="mt-auto w-full">
                    <Link href="#quote">Get a quote</Link>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Services: two alternating feature rows ── */}
      <section className="bg-background py-20 md:py-24">
        <div className="container mx-auto space-y-20 px-4 md:space-y-24">
          <div className="grid items-center gap-10 md:grid-cols-2 lg:gap-16">
            <div>
              <SectionHeading
                align="left"
                eyebrow="Every journey"
                title="Find the perfect taxi service for every journey"
                description="Our services are designed to cater to every specific requirement. From standard point-to-point transfers to extensive corporate roadshows, we have the logistical capability and the premium vehicles to deliver excellence."
              />
              <CheckList
                items={[
                  "Executive business travel for seamless productivity",
                  "Spacious minivans for family trips and group tours",
                  "Luxury chauffeurs for special occasions",
                  "Dedicated account management for corporate clients",
                ]}
              />
              <Button asChild size="lg" variant="outline" className="mt-8 h-12 px-8">
                <Link href="/services">Explore services</Link>
              </Button>
            </div>
            <div className="BTS-purple-glow relative h-[360px] overflow-hidden rounded-2xl md:h-[460px]">
              <img src="/images/heathrow-terminal5-couple.jpg" alt="Couple arriving at Heathrow Terminal 5" className="absolute inset-0 h-full w-full object-cover" />
            </div>
          </div>

          <div className="grid items-center gap-10 md:grid-cols-2 lg:gap-16">
            <div className="BTS-purple-glow relative order-2 h-[360px] overflow-hidden rounded-2xl md:order-1 md:h-[460px]">
              <img src="/images/heathrow-driver-loading.jpg" alt="Driver loading luggage at Heathrow" className="absolute inset-0 h-full w-full object-cover" />
              <div className="absolute bottom-5 left-5 right-5 flex items-center gap-4 rounded-xl bg-white/95 p-4 shadow-lg sm:right-auto">
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-navy text-gold">
                  <CalendarCheck className="h-5 w-5" />
                </span>
                <span>
                  <span className="block text-sm font-bold text-navy">On-time pickup</span>
                  <span className="block text-xs text-[#627085]">Flight tracked, driver waiting</span>
                </span>
              </div>
            </div>
            <div className="order-1 md:order-2">
              <SectionHeading
                align="left"
                eyebrow="Why us"
                title="Why MRM Executive Voyage is the right choice"
                description="We don't just provide a ride; we provide a reliable transport partnership. With a focus on professionalism, punctuality, and comfort, we stand out as London's premier transfer service."
              />
              <CheckList
                items={[
                  "Fully insured & licensed drivers",
                  "Modern, eco-friendly EV options",
                  "Fixed, transparent pricing — no hidden fees",
                  "Complimentary meet & greet service",
                ]}
              />
              <Button asChild size="lg" className="mt-8 h-12 px-8">
                <Link href="#quote">Book a taxi</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* ── Testimonials ── */}
      <section className="border-y border-border bg-surface py-20 md:py-24">
        <div className="container mx-auto px-4">
          <SectionHeading
            eyebrow="Customer reviews"
            title="What our passengers say"
            description={
              <span className="inline-flex items-center gap-2">
                <span className="flex">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star key={s} className="h-4 w-4 fill-gold text-gold" />
                  ))}
                </span>
                <span className="font-semibold text-foreground">4.9</span>
                <span className="text-muted-foreground">· 1,538+ Google reviews</span>
              </span>
            }
          />
        </div>
        <div className="[--background:var(--surface)]">
          <TestimonialsSlider />
        </div>
      </section>

      {/* ── About / local expertise (SEO copy) ── */}
      <section className="bg-background py-20 md:py-24">
        <div className="container mx-auto grid gap-12 px-4 lg:grid-cols-2 lg:gap-16">
          <div>
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-gold-ink">Pre-book online</p>
            <h2 className="mb-5 text-2xl tracking-tight text-foreground md:text-3xl">
              Pre-book taxis online with MRM Executive Voyage
            </h2>
            <div className="space-y-4 leading-relaxed text-body">
              <p>
                MRM Executive Voyage is your trusted partner for executive transport across
                London and its major airports. Whether you&apos;re heading to a
                crucial business meeting, catching a flight from Heathrow, or
                simply exploring the city, our pre-booking platform ensures a
                seamless, comfortable journey from start to finish.
              </p>
              <p>
                With transparent pricing, professional drivers, and a diverse
                fleet tailored to your requirements, we take the stress out of
                London travel.
              </p>
            </div>
          </div>
          <div>
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-gold-ink">Local expertise</p>
            <h2 className="mb-5 text-2xl tracking-tight text-foreground md:text-3xl">
              Why choose us for your London travel?
            </h2>
            <div className="space-y-4 leading-relaxed text-body">
              <p>
                Navigating London&apos;s busy streets and airports requires local
                expertise and reliable logistics. We&apos;ve built our reputation
                on ensuring every passenger reaches their destination comfortably
                and safely. Our advanced booking system, flight monitoring
                technology, and dedicated customer support team work in tandem to
                deliver an unparalleled service experience.
              </p>
              <p>
                Whether you are a solo traveler, a family on vacation, or a
                corporate team, we have the right vehicle and the right driver for
                you. Experience the MRM Executive Voyage difference today.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── App ── */}
      <section className="BTS-luxury-section-3 relative overflow-hidden py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="grid items-center gap-12 md:grid-cols-2">
            <div className="space-y-6">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-gold-ink">Mobile app</p>
              <h2 className="text-3xl tracking-tight text-foreground md:text-4xl">
                Get an instant quote with the MRM Executive Voyage app
              </h2>
              <p className="text-lg leading-relaxed text-body">
                Book your ride faster, track your driver in real-time, and
                manage all your bookings from your pocket. Available on iOS
                and Android.
              </p>
              <div className="flex flex-wrap gap-3 pt-2">
                <Button size="lg" className="h-12 px-7">App Store</Button>
                <Button size="lg" variant="outline" className="h-12 px-7">Google Play</Button>
              </div>
            </div>
            <div className="relative flex justify-center">
              <img
                src="/app-mockup.jpg"
                alt="App Mockup"
                className="relative z-10 h-[480px] w-[240px] rounded-[2.5rem] border-[6px] border-white/15 object-cover shadow-2xl md:h-[540px] md:w-[264px]"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="bg-surface py-20 md:py-24">
        <div className="container mx-auto grid gap-12 px-4 lg:grid-cols-[1fr_1.6fr] lg:gap-16">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <SectionHeading
              align="left"
              eyebrow="Frequently asked"
              title="Frequently asked questions"
              description="Everything you need to know about booking with MRM Executive Voyage."
            />
            <div className="rounded-2xl bg-navy p-6 text-white">
              <p className="text-lg font-bold text-white">Still have a question?</p>
              <p className="mt-1 text-sm text-[#C6D1E1]">Our team is available 24/7 by phone or WhatsApp.</p>
              <div className="mt-5 flex flex-col gap-2 sm:flex-row lg:flex-col xl:flex-row">
                <a href={telHref(phone)} className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-gold px-5 text-sm font-bold text-navy transition-colors hover:bg-gold-hover">
                  <Phone className="h-4 w-4" /> Call us
                </a>
                <a href={`https://wa.me/${whatsapp}`} target="_blank" rel="noopener noreferrer" className="inline-flex h-11 items-center justify-center gap-2 rounded-lg border border-white/25 px-5 text-sm font-semibold text-white transition-colors hover:bg-white/10">
                  <FaWhatsapp className="h-4 w-4" /> WhatsApp
                </a>
              </div>
            </div>
          </div>

          <Accordion type="single" collapsible className="w-full">
            {FAQS.map((item, i) => (
              <AccordionItem key={item.q} value={`item-${i}`}>
                <AccordionTrigger>{item.q}</AccordionTrigger>
                <AccordionContent>{item.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      <FullFooterSection />
    </div>
  );
}
