"use client";

import Link from "next/link";
import { useSiteSettings } from "@/components/providers/SiteSettingsProvider";
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
  Clock,
  Users,
  Briefcase,
  Star,
  Phone,
  CheckCircle2,
  ShieldCheck,
  Zap,
  BadgeCheck,
  Plane,
  HeartHandshake,
  Award,
} from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { HomeBookingForm } from "@/components/forms/HomeBookingForm";
import { TestimonialsSlider } from "@/components/home/TestimonialsSlider";

export default function HomePageClient() {
  const { whatsapp } = useSiteSettings();
  return (
    <div className="min-h-screen overflow-x-hidden bg-background font-sans">
      <a
        href={`https://wa.me/${whatsapp}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="fixed bottom-4 right-4 z-[60] flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-[#25D366] text-white shadow-xl transition-all duration-300 hover:bg-[#1ebe5d] hover:shadow-[0_8px_28px_-4px_rgba(37,211,102,0.45)] sm:bottom-6 sm:right-6 sm:h-14 sm:w-14"
      >
        <FaWhatsapp className="h-7 w-7" />
      </a>

      {/* 1. Header */}
      <SiteTopHeader />

      {/* 2. Hero Section & 3. Booking Form */}
      <section
        id="quote"
        className="BTS-hero-ambient BTS-luxury-section-1 relative scroll-mt-20 pt-20 pb-16 text-primary-foreground sm:pt-24 sm:pb-24 lg:pt-28 lg:pb-40"
      >
        <div className="absolute inset-0 z-0 overflow-hidden">
          <img
            src="/hero-bg.jpg"
            alt="London at night"
            className="BTS-media-cinematic absolute inset-0 h-full w-full object-cover opacity-[0.28] mix-blend-overlay"
          />
          <div className="BTS-media-overlay" />
        </div>

        <div className="container relative z-20 mx-auto px-4">
          <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-10">
            <div className="space-y-5 sm:space-y-8">
              <div className="inline-flex max-w-full flex-wrap items-center gap-x-2 rounded-full border border-[rgba(192,192,192,0.18)] bg-[rgba(45,45,51,0.55)] px-3 py-1 text-xs shadow-[0_4px_18px_-6px_rgba(0,0,0,0.4)] backdrop-blur-sm sm:text-sm">
                <Star className="mr-2 h-4 w-4 fill-highlight text-highlight" />
                <span className="font-semibold">4.9</span>
                <span className="mx-2 text-[#C0C0C0]/60">|</span>
                <span className="text-[#F8F8F8]/90">1538+ Google Reviews</span>
              </div>

              <h1 className="text-3xl font-extrabold tracking-tight text-[#F8F8F8] drop-shadow-[0_2px_20px_rgba(0,0,0,0.5)] sm:text-4xl md:text-5xl lg:text-6xl">
                London Taxi Services <br />
                <span className="bg-[linear-gradient(135deg,#C0C0C0_0%,#F8F8F8_50%,#A5A7AA_100%)] bg-clip-text text-transparent">
                  — Anytime You Need
                </span>
              </h1>

              <p className="max-w-xl text-base leading-relaxed text-[#D1D5DB] sm:text-lg">
                Pre-Booked Transfers To-From-Within London. Reliable,
                professional, and guaranteed lowest prices.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-highlight/20 ring-1 ring-highlight/40">
                    <Phone className="h-5 w-5 text-highlight" />
                  </div>
                  <div>
                    <p className="text-xs text-highlight/90 uppercase tracking-wider">
                      Book by Phone
                    </p>
                    <p className="text-base font-bold sm:text-lg">+44 7700 1409 00</p>
                  </div>
                </div>
                <div className="hidden sm:block w-px bg-primary-foreground/20"></div>
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-highlight/20 ring-1 ring-highlight/40">
                    <Phone className="h-5 w-5 text-highlight" />
                  </div>
                  <div>
                    <p className="text-xs text-highlight/90 uppercase tracking-wider">
                      Support
                    </p>
                    <p className="text-base font-bold sm:text-lg">+44 2080 5090 14</p>
                  </div>
                </div>
              </div>
            </div>

            <HomeBookingForm />
          </div>
        </div>
      </section>

      {/* 4. Feature Icons Row */}
      <section className="relative border-t border-[rgba(192,192,192,0.2)] bg-[linear-gradient(160deg,rgba(192,192,192,0.055)_0%,rgba(18,16,22,0.98)_40%,rgba(13,13,15,1)_100%)] py-24 text-foreground md:py-32">
        <div className="container mx-auto px-4">
          <div className="mx-auto mb-14 max-w-3xl text-center">
            <span className="BTS-pill">Our promise</span>
            <h2 className="mt-6 text-3xl font-bold tracking-tight md:text-4xl">
              <span className="bg-[linear-gradient(135deg,#C0C0C0_0%,#F8F8F8_50%,#A5A7AA_100%)] bg-clip-text text-transparent">Why Choose</span>{" "}
              <span className="text-[#F8F8F8]">BTS</span>
            </h2>
            <div className="BTS-divider mx-auto mt-6 w-24" />
            <p className="mt-6 text-lg leading-relaxed text-[#CFCFCF]">
              Every journey with BTS comes with our commitment to quality,
              reliability, and the best value in London.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                icon: <Clock className="h-6 w-6" />,
                title: "45-Min Grace Period",
                desc: "Free 45-minute wait on every airport arrival — no stress, no extra charges.",
              },
              {
                icon: <ShieldCheck className="h-6 w-6" />,
                title: "Quality Vehicles",
                desc: "Well-maintained, road-ready vehicles for a comfortable ride every time.",
              },
              {
                icon: <Zap className="h-6 w-6" />,
                title: "Available 24/7",
                desc: "Round-the-clock availability for all London airport transfers.",
              },
              {
                icon: <CheckCircle2 className="h-6 w-6" />,
                title: "Lowest Price Guaranteed",
                desc: "Best prices on the market — guaranteed when you book with BTS.",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="group flex flex-col items-center rounded-2xl border border-[rgba(192,192,192,0.15)] bg-[linear-gradient(135deg,rgba(192,192,192,0.05)_0%,rgba(30,28,35,0.85)_100%)] px-6 py-8 text-center shadow-[inset_0_1px_0_rgba(192,192,192,0.08)] transition-all duration-300 hover:border-[rgba(192,192,192,0.3)] hover:shadow-[0_8px_32px_-8px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(192,192,192,0.14)]"
              >
                <div className="BTS-icon-halo mb-5">
                  {item.icon}
                </div>
                <h3 className="mb-2 text-base font-bold tracking-tight text-[#F8F8F8]">{item.title}</h3>
                <p className="text-sm leading-relaxed text-[#CFCFCF]">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* STATS COUNTER */}
      <section className="relative border-t border-[rgba(192,192,192,0.2)] bg-[linear-gradient(135deg,rgba(30,28,35,0.98)_0%,rgba(192,192,192,0.05)_50%,rgba(26,26,29,0.99)_100%)] py-24 text-foreground md:py-32">
        <div className="container mx-auto px-4">
          <div className="mx-auto mb-14 max-w-3xl text-center">
            <span className="BTS-pill">Our track record</span>
            <h2 className="mt-6 text-3xl font-bold tracking-tight md:text-4xl">
              <span className="text-[#F8F8F8]">Trusted by</span>{" "}
              <span className="bg-[linear-gradient(135deg,#C0C0C0_0%,#F8F8F8_50%,#A5A7AA_100%)] bg-clip-text text-transparent">Thousands</span>
            </h2>
            <div className="BTS-divider mx-auto mt-6 w-24" />
            <p className="mt-6 text-lg leading-relaxed text-[#CFCFCF]">
              Numbers that speak for themselves — built on years of reliable service across London.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4 md:gap-12">
            {[
              { value: "10,000+", label: "Trips Completed",      icon: <Plane className="h-6 w-6" /> },
              { value: "50+",     label: "Professional Drivers", icon: <Users className="h-6 w-6" /> },
              { value: "6",       label: "Major Airports",       icon: <BadgeCheck className="h-6 w-6" /> },
              { value: "4.9★",    label: "Average Rating",       icon: <Star className="h-6 w-6 fill-[#C0C0C0] text-[#C0C0C0]" /> },
            ].map((stat, i) => (
              <div key={i} className="flex flex-col items-center gap-4 text-center">
                <div className="BTS-icon-halo">
                  {stat.icon}
                </div>
                <div className="bg-[linear-gradient(135deg,#A5A7AA_0%,#F8F8F8_40%,#C0C0C0_70%,#A5A7AA_100%)] bg-clip-text text-4xl font-extrabold tracking-tight text-transparent md:text-5xl">
                  {stat.value}
                </div>
                <div className="text-sm font-semibold text-[#CFCFCF]">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TRUST BADGES */}
      <section className="relative border-t border-[rgba(192,192,192,0.2)] bg-[linear-gradient(160deg,rgba(192,192,192,0.055)_0%,rgba(18,16,22,0.98)_40%,rgba(13,13,15,1)_100%)] py-24 text-foreground md:py-32">
        <div className="container mx-auto px-4">
          <div className="mx-auto mb-14 max-w-3xl text-center">
            <span className="BTS-pill">Certified &amp; trusted</span>
            <h2 className="mt-6 text-3xl font-bold tracking-tight md:text-4xl">
              <span className="bg-[linear-gradient(135deg,#C0C0C0_0%,#F8F8F8_50%,#A5A7AA_100%)] bg-clip-text text-transparent">Licensed,</span>{" "}
              <span className="text-[#F8F8F8]">Insured &amp; Accredited</span>
            </h2>
            <div className="BTS-divider mx-auto mt-6 w-24" />
            <p className="mt-6 text-lg leading-relaxed text-[#CFCFCF]">
              Every driver and vehicle meets strict regulatory standards so
              you can ride with complete confidence.
            </p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-4 md:gap-5">
            {[
              { icon: <BadgeCheck className="h-5 w-5" />, label: "PCO Licensed" },
              { icon: <ShieldCheck className="h-5 w-5" />, label: "Fully Insured" },
              { icon: <Plane className="h-5 w-5" />,       label: "Flight Monitored" },
              { icon: <Clock className="h-5 w-5" />,       label: "24/7 Available" },
              { icon: <HeartHandshake className="h-5 w-5" />, label: "Meet & Greet" },
              { icon: <Award className="h-5 w-5" />,       label: "Award Winning" },
              { icon: <CheckCircle2 className="h-5 w-5" />, label: "Fixed Pricing" },
            ].map((badge, i) => (
              <div
                key={i}
                className="group flex items-center gap-3 rounded-2xl border border-[rgba(192,192,192,0.18)] bg-[linear-gradient(135deg,rgba(192,192,192,0.05)_0%,rgba(30,28,35,0.85)_100%)] px-6 py-4 shadow-[inset_0_1px_0_rgba(192,192,192,0.08)] transition-all duration-300 hover:border-[rgba(192,192,192,0.35)] hover:shadow-[0_6px_24px_-6px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(192,192,192,0.14)]"
              >
                <div className="BTS-icon-halo !h-9 !w-9 !rounded-xl">
                  {badge.icon}
                </div>
                <span className="text-sm font-semibold text-[#E5E7EB] transition-colors duration-300 group-hover:text-[#F8F8F8]">{badge.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Pre-Book Taxis Section */}
      <section className="BTS-grid-bg relative border-t border-[rgba(192,192,192,0.2)] bg-[linear-gradient(160deg,rgba(192,192,192,0.055)_0%,rgba(18,16,22,0.98)_40%,rgba(13,13,15,1)_100%)] py-24 text-foreground md:py-32">
        <div className="container mx-auto max-w-4xl px-4 text-center">
          <span className="BTS-pill mb-6">Pre-book online</span>
          <h2 className="mt-2 text-3xl font-bold tracking-tight md:text-4xl">
            <span className="bg-[linear-gradient(135deg,#C0C0C0_0%,#F8F8F8_50%,#A5A7AA_100%)] bg-clip-text text-transparent">Pre-Book Taxis Online</span>{" "}
            <span className="text-[#F8F8F8]">with BTS</span>
          </h2>
          <div className="BTS-divider mx-auto mt-6 w-24" />
          <p className="mt-8 text-lg leading-relaxed text-[#CFCFCF]">
            BTS is your trusted partner for executive transport across
            London and its major airports. Whether you&apos;re heading to a
            crucial business meeting, catching a flight from Heathrow, or
            simply exploring the city, our pre-booking platform ensures a
            seamless, comfortable journey from start to finish.
          </p>
          <p className="mt-4 text-lg leading-relaxed text-[#CFCFCF]">
            With transparent pricing, professional drivers, and a diverse
            fleet tailored to your requirements, we take the stress out of
            London travel.
          </p>
          <div className="mt-10">
            <Button asChild size="lg" className="h-12 cursor-pointer px-8 text-sm font-semibold tracking-wide">
              <Link href="/taxi-quote" className="cursor-pointer">Book a Taxi</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* 6. Perfect Taxi Service Section */}
      <section className="relative border-t border-[rgba(192,192,192,0.2)] bg-[linear-gradient(135deg,rgba(30,28,35,0.98)_0%,rgba(192,192,192,0.05)_50%,rgba(26,26,29,0.99)_100%)] py-24 text-foreground md:py-32">
        <div className="container mx-auto px-4">
          <div className="grid items-center gap-12 md:grid-cols-2">
            <div className="space-y-6">
              <span className="BTS-pill">Every journey</span>
              <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
                <span className="bg-[linear-gradient(135deg,#C0C0C0_0%,#F8F8F8_50%,#A5A7AA_100%)] bg-clip-text text-transparent">Find the Perfect</span>{" "}
                <span className="text-[#F8F8F8]">Taxi Service for Every Journey</span>
              </h2>
              <p className="text-lg leading-relaxed text-[#CFCFCF]">
                Our services are designed to cater to every specific
                requirement. From standard point-to-point transfers to extensive
                corporate roadshows, we have the logistical capability and the
                premium vehicles to deliver excellence.
              </p>
              <ul className="space-y-4 pt-4">
                {[
                  "Executive business travel for seamless productivity",
                  "Spacious minivans for family trips and group tours",
                  "Luxury chauffeurs for special occasions",
                  "Dedicated account management for corporate clients",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="h-6 w-6 shrink-0 text-[#C0C0C0]" />
                    <span className="font-medium text-[#E5E7EB]">{item}</span>
                  </li>
                ))}
              </ul>
              <div className="pt-6">
                <Button asChild size="lg" className="h-12 cursor-pointer px-8 text-sm font-semibold tracking-wide">
                  <Link href="/services" className="cursor-pointer">Explore Services</Link>
                </Button>
              </div>
            </div>
            <div className="BTS-purple-glow relative h-[500px] overflow-hidden rounded-2xl">
              <img
                src="/images/heathrow-terminal5-couple.jpg"
                alt="Perfect Taxi Service"
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,transparent_55%,rgba(13,13,15,0.85)_100%)]" />
            </div>
          </div>
        </div>
      </section>

      {/* 7. Why BTS Section */}
      <section className="relative border-t border-[rgba(192,192,192,0.2)] bg-[linear-gradient(160deg,rgba(192,192,192,0.06)_0%,rgba(13,13,15,0.99)_35%,rgba(22,18,28,0.98)_100%)] py-28 text-foreground md:py-36">
        <div className="container mx-auto px-4">
          <div className="grid items-center gap-12 md:grid-cols-2 flex-row-reverse">
            <div className="BTS-purple-glow order-2 md:order-1 relative h-[500px] rounded-2xl overflow-hidden">
              <img
                src="/images/heathrow-driver-loading.jpg"
                alt="BTS Fleet"
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,transparent_55%,rgba(13,13,15,0.85)_100%)]" />
            </div>
            <div className="order-1 space-y-6 md:order-2">
              <span className="BTS-pill">Why BTS</span>
              <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
                <span className="text-[#F8F8F8]">Why BTS is the</span>{" "}
                <span className="bg-[linear-gradient(135deg,#C0C0C0_0%,#F8F8F8_50%,#A5A7AA_100%)] bg-clip-text text-transparent">Right Choice</span>
              </h2>
              <p className="text-lg leading-relaxed text-[#CFCFCF]">
                We don&apos;t just provide a ride; we provide a reliable
                transport partnership. With a focus on professionalism,
                punctuality, and comfort, BTS stands out as London&apos;s
                premier transfer service.
              </p>
              <ul className="space-y-4 pt-4">
                {[
                  "Fully Insured & Licensed Drivers",
                  "Modern, Eco-Friendly EV Options",
                  "Fixed, Transparent Pricing — No Hidden Fees",
                  "Complimentary Meet & Greet Service",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="h-6 w-6 shrink-0 text-[#C0C0C0]" />
                    <span className="font-medium text-[#E5E7EB]">{item}</span>
                  </li>
                ))}
              </ul>
              <div className="pt-6">
                <Button asChild size="lg" className="h-12 cursor-pointer px-8 text-sm font-semibold tracking-wide">
                  <Link href="/taxi-quote" className="cursor-pointer">Book a Taxi</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. London Airport Transfers */}
      <section className="relative border-t border-[rgba(192,192,192,0.2)] bg-[linear-gradient(135deg,rgba(30,28,35,0.98)_0%,rgba(192,192,192,0.055)_55%,rgba(22,20,26,0.99)_100%)] py-28 text-foreground md:py-36">
        <div className="container mx-auto px-4">
          <div className="mx-auto mb-16 max-w-3xl text-center">
            <span className="BTS-pill">Airport transfers</span>
            <h2 className="mt-6 text-3xl font-bold tracking-tight md:text-4xl">
              <span className="bg-[linear-gradient(135deg,#C0C0C0_0%,#F8F8F8_50%,#A5A7AA_100%)] bg-clip-text text-transparent">London Airport</span>{" "}
              <span className="text-[#F8F8F8]">Transfers</span>
            </h2>
            <div className="BTS-divider mx-auto mt-6 w-24" />
            <p className="mt-6 text-lg leading-relaxed text-[#CFCFCF]">
              Reliable, punctual transfers to and from all major London
              airports. We monitor your flight to ensure we&apos;re there
              exactly when you need us.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: "Heathrow Airport",
                desc: "Terminal 2, 3, 4, 5 transfers",
                img: "/images/heathrow-exterior.jpg",
                slug: "heathrow",
              },
              {
                name: "Gatwick Airport",
                desc: "North and South terminal services",
                img: "/images/gatwick-sign.jpg",
                slug: "gatwick",
              },
              {
                name: "London City Airport",
                desc: "Fast business hub connections",
                img: "/images/executive-passenger.jpg",
                slug: "london-city",
              },
              {
                name: "Luton Airport",
                desc: "Budget airline connections",
                img: "/images/airport-fleet-aerial.jpg",
                slug: "luton",
              },
              {
                name: "Stansted Airport",
                desc: "Reliable northern hub transfers",
                img: "/images/british-airways-plane.jpg",
                slug: "stansted",
              },
              {
                name: "Southend Airport",
                desc: "Eastern connection specialist",
                img: "/images/mpv-airport-boarding.jpg",
                slug: "southend",
              },
            ].map((airport, i) => (
              <Link
                key={i}
                href={`/airport-transfers/${airport.slug}`}
                className="group block overflow-hidden rounded-2xl border border-[rgba(192,192,192,0.2)] bg-[linear-gradient(135deg,rgba(45,45,51,0.7)_0%,rgba(22,20,26,0.9)_100%)] shadow-[0_4px_24px_-8px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(192,192,192,0.1)] transition-all duration-300 hover:border-[rgba(192,192,192,0.4)] hover:shadow-[0_8px_32px_-8px_rgba(0,0,0,0.4),0_0_20px_-6px_rgba(192,192,192,0.15),inset_0_1px_0_rgba(192,192,192,0.2)]"
              >
                <div className="BTS-vehicle-media relative h-48">
                  <img
                    src={airport.img}
                    alt={airport.name}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="space-y-3 p-6">
                  <h3 className="text-xl font-semibold tracking-tight text-[#F8F8F8]">
                    {airport.name}
                  </h3>
                  <p className="text-sm text-[#CFCFCF]">{airport.desc}</p>
                  <div className="flex items-center gap-2 pt-2 text-[12px] font-semibold uppercase tracking-[0.18em] text-[#C0C0C0] transition-colors group-hover:text-[#F8F8F8]">
                    Book transfer
                    <span aria-hidden className="text-[#9b51e0]">&rarr;</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 9. Vehicle Fleet Section */}
      <section className="relative border-t border-[rgba(192,192,192,0.2)] bg-[linear-gradient(160deg,rgba(192,192,192,0.055)_0%,rgba(13,13,15,0.99)_40%,rgba(192,192,192,0.04)_100%)] py-24 text-foreground md:py-32">
        <div className="container mx-auto px-4">
          <div className="mx-auto mb-16 max-w-3xl text-center">
            <span className="BTS-pill">Luxury fleet</span>
            <h2 className="mt-6 text-3xl font-bold tracking-tight md:text-4xl">
              <span className="bg-[linear-gradient(135deg,#C0C0C0_0%,#F8F8F8_50%,#A5A7AA_100%)] bg-clip-text text-transparent">Luxury Vehicles</span>{" "}
              <span className="text-[#F8F8F8]">for Every Occasion</span>
            </h2>
            <div className="BTS-divider mx-auto mt-6 w-24" />
            <p className="mt-6 text-lg leading-relaxed text-[#CFCFCF]">
              From eco-friendly electrics to spacious minivans, our
              immaculately maintained fleet is ready to serve.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* vehicle cards */}
            {[
              { name: "Saloon", pax: 4, hand: 1, lug: 2, img: "/images/saloon.jpeg" },
              { name: "Executive", pax: 4, hand: 1, lug: 1, img: "/images/vehicle-sclass-new.jpg" },
              { name: "Estate", pax: 4, hand: 2, lug: 3, img: "/images/vehicle-estate.jpg" },
              { name: "MPV", pax: 6, hand: 3, lug: 4, img: "/images/vehicle-vclass-8seater.jpg" },
              { name: "8 Seater Minibus", pax: 8, hand: 4, lug: 6, img: "/images/vehicle-transit.jpg" },
              { name: "Electric", pax: 4, hand: 2, lug: 1, img: "/images/saloon.jpeg" },
              { name: "Chauffeur", pax: 4, hand: 1, lug: 2, img: "/images/vehicle-sclass-old.jpg" },
            ].map((vehicle, i) => (
              <div key={i} className="group overflow-hidden rounded-2xl border border-[rgba(192,192,192,0.18)] bg-[linear-gradient(135deg,rgba(45,45,51,0.65)_0%,rgba(22,20,26,0.9)_100%)] shadow-[0_4px_24px_-8px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(192,192,192,0.08)] transition-all duration-300 hover:border-[rgba(192,192,192,0.38)] hover:shadow-[0_8px_32px_-8px_rgba(0,0,0,0.4),0_0_18px_-6px_rgba(192,192,192,0.15),inset_0_1px_0_rgba(192,192,192,0.18)]">
                <div className="BTS-vehicle-media relative h-44">
                  <img
                    src={vehicle.img}
                    alt={vehicle.name}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="space-y-4 p-6">
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="text-xl font-semibold tracking-tight text-[#F8F8F8]">
                      {vehicle.name}
                    </h3>
                    <span className="rounded-full border border-[rgba(192,192,192,0.18)] bg-[rgba(45,45,51,0.5)] px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#C0C0C0]">
                      Premium
                    </span>
                  </div>
                  <div className="flex gap-5 text-sm text-[#A5A7AA]">
                    <span className="flex items-center gap-1.5">
                      <Users className="h-4 w-4" /> {vehicle.pax}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Briefcase className="h-4 w-4" /> {vehicle.hand}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Briefcase className="h-4 w-4" /> {vehicle.lug}
                    </span>
                  </div>
                  <Button asChild className="w-full cursor-pointer">
                    <Link href="/#quote" className="cursor-pointer">
                      Book {vehicle.name}
                    </Link>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 10. Why Choose BTS Section */}
      <section className="relative border-t border-[rgba(192,192,192,0.2)] bg-[linear-gradient(135deg,rgba(30,28,35,0.98)_0%,rgba(192,192,192,0.05)_50%,rgba(26,26,29,0.99)_100%)] py-28 text-foreground md:py-36">
        <div className="container mx-auto max-w-4xl px-4 text-center">
          <span className="BTS-pill mb-6">Local expertise</span>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-[#F8F8F8] md:text-4xl">
            Why Choose BTS for Your London Travel?
          </h2>
          <div className="BTS-divider mx-auto mt-6 w-24" />
          <p className="mt-8 text-lg leading-relaxed text-[#CFCFCF]">
            Navigating London&apos;s busy streets and airports requires local
            expertise and reliable logistics. We&apos;ve built our reputation
            on ensuring every passenger reaches their destination comfortably
            and safely. Our advanced booking system, flight monitoring
            technology, and dedicated customer support team work in tandem to
            deliver an unparalleled service experience.
          </p>
          <p className="mt-4 text-lg leading-relaxed text-[#CFCFCF]">
            Whether you are a solo traveler, a family on vacation, or a
            corporate team, we have the right vehicle and the right driver for
            you. Experience the BTS difference today.
          </p>
        </div>
      </section>

      {/* 11. App Download Section */}
      <section className="BTS-hero-ambient BTS-luxury-section-3 relative overflow-hidden py-24 text-primary-foreground md:py-32">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-7">
              <span className="BTS-pill">BTS app</span>
              <h2 className="text-3xl font-bold text-[#F8F8F8] md:text-5xl">
                Get an Instant Quote with the BTS App
              </h2>
              <p className="text-lg text-[#CFCFCF]">
                Book your ride faster, track your driver in real-time, and
                manage all your bookings from your pocket. Available on iOS
                and Android.
              </p>
              <div className="flex flex-wrap gap-4 pt-2">
                <Button size="lg" className="h-12 px-7 text-sm font-semibold tracking-wide">
                  App Store
                </Button>
                <Button size="lg" variant="outline" className="h-12 px-7 text-sm font-semibold tracking-wide">
                  Google Play
                </Button>
              </div>
            </div>
            <div className="relative flex justify-center mt-12 md:mt-0">
              <div className="absolute top-1/2 left-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[rgba(45,45,51,0.6)] blur-3xl opacity-50"></div>
              <img
                src="/app-mockup.jpg"
                alt="App Mockup"
                className="relative z-10 w-[280px] h-[580px] object-cover rounded-[3rem] border-[8px] border-[rgba(192,192,192,0.18)] shadow-[0_36px_88px_-28px_rgba(0,0,0,0.75),0_18px_52px_-12px_rgba(75,0,130,0.55)]"
              />
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="relative border-t border-[rgba(192,192,192,0.2)] bg-[linear-gradient(135deg,rgba(192,192,192,0.055)_0%,rgba(30,28,35,0.97)_35%,rgba(192,192,192,0.04)_100%)] py-28 text-foreground md:py-36">
        <div className="container mx-auto px-4">
          <div className="mx-auto mb-16 max-w-3xl text-center">
            <span className="BTS-pill mb-6">Customer reviews</span>
            <h2 className="mt-4 text-3xl font-bold tracking-tight md:text-4xl">
              <span className="bg-[linear-gradient(135deg,#C0C0C0_0%,#F8F8F8_50%,#A5A7AA_100%)] bg-clip-text text-transparent">What Our Passengers</span>{" "}
              <span className="text-[#F8F8F8]">Say</span>
            </h2>
            <div className="BTS-divider mx-auto mt-6 w-24" />
            <div className="mt-4 flex items-center justify-center gap-2">
              {[1,2,3,4,5].map(s => <Star key={s} className="h-5 w-5 fill-highlight text-highlight" />)}
              <span className="ml-2 text-sm font-semibold text-[#F8F8F8]">4.9</span>
              <span className="text-sm text-[#A5A7AA]">· 1,538+ Google Reviews</span>
            </div>
          </div>

          <TestimonialsSlider />
        </div>
      </section>

      {/* 12. FAQ Accordion */}
      <section className="relative border-t border-[rgba(192,192,192,0.2)] bg-[linear-gradient(160deg,rgba(192,192,192,0.055)_0%,rgba(13,13,15,0.99)_40%,rgba(22,18,28,0.98)_100%)] py-28 text-foreground md:py-36">
        <div className="container mx-auto max-w-3xl px-4">
          <div className="mb-14 text-center">
            <span className="BTS-pill mb-6">Frequently asked</span>
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-[#F8F8F8] md:text-4xl">
              Frequently Asked Questions
            </h2>
            <div className="BTS-divider mx-auto mt-6 w-24" />
            <p className="mt-6 text-lg leading-relaxed text-[#CFCFCF]">
              Everything you need to know about booking with BTS.
            </p>
          </div>

          <Accordion type="single" collapsible className="w-full">
            {[
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
                a: "All BTS airport and pre-booked transfers are quoted at a fixed fare. The price you confirm at booking is the price you pay — taxes, tolls and parking included.",
              },
              {
                q: "Do you provide child seats?",
                a: "Yes — infant, child and booster seats are available on request during booking, free of charge.",
              },
              {
                q: "How do I find my driver at the airport?",
                a: "Standard pickups meet you at the designated terminal pickup zone. Meet-and-greet drivers wait inside arrivals with a BTS name board.",
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
            ].map((item, i) => (
              <AccordionItem key={i} value={`item-${i}`}>
                <AccordionTrigger>{item.q}</AccordionTrigger>
                <AccordionContent>{item.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* 13. Footer + CTA */}
      <FullFooterSection />
    </div>
  );
}



