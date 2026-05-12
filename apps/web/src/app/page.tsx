"use client";

import React, { useState } from "react";
import Link from "next/link";
import { SiteHeader } from "@/components/SiteHeader";
import { FullFooterSection } from "@/components/FullFooterSection";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  MapPin,
  CalendarIcon,
  Clock,
  Users,
  Briefcase,
  Star,
  Phone,
  ChevronDown,
  CheckCircle2,
  ShieldCheck,
  Zap,
} from "lucide-react";
import { format } from "date-fns";
import { FaWhatsapp } from "react-icons/fa";
import { GooglePlacesInput } from "@/components/forms/GooglePlacesInput";

export default function Home() {
  const [date, setDate] = useState<Date>();
  const [viaLocations, setViaLocations] = useState<string[]>([]);

  const addViaLocation = () => {
    setViaLocations((prev) => (prev.length < 5 ? [...prev, ""] : prev));
  };

  const updateViaLocation = (index: number, value: string) => {
    setViaLocations((prev) =>
      prev.map((item, i) => (i === index ? value : item))
    );
  };

  const removeViaLocation = (index: number) => {
    setViaLocations((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="min-h-screen bg-background font-sans">
      <a
        href="https://wa.me/447700140900"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="fixed bottom-6 right-6 z-[60] flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-xl transition-all duration-300 hover:bg-[#1ebe5d] hover:shadow-[0_8px_28px_-4px_rgba(37,211,102,0.45)]"
      >
        <FaWhatsapp className="h-7 w-7" />
      </a>

      {/* 1. Header */}
      <SiteHeader />

      {/* 2. Hero Section & 3. Booking Form */}
      <section className="ukride-hero-ambient ukride-luxury-section-1 relative pt-16 pb-32 text-primary-foreground lg:pt-24 lg:pb-40">
        <div className="absolute inset-0 z-0 overflow-hidden">
          <img
            src="/hero-bg.jpg"
            alt="London at night"
            className="ukride-media-cinematic absolute inset-0 h-full w-full object-cover opacity-[0.28] mix-blend-overlay"
          />
          <div className="ukride-media-overlay" />
        </div>

        <div className="container relative z-20 mx-auto px-4">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-8 items-center">
            <div className="space-y-8">
              <div className="inline-flex items-center rounded-full border border-[rgba(192,192,192,0.18)] bg-[rgba(75,0,130,0.22)] px-3 py-1 text-sm shadow-[0_4px_18px_-6px_rgba(75,0,130,0.55)] backdrop-blur-sm">
                <Star className="mr-2 h-4 w-4 fill-highlight text-highlight" />
                <span className="font-semibold">4.9</span>
                <span className="mx-2 text-[#C0C0C0]/60">|</span>
                <span className="text-[#F8F8F8]/90">1538+ Google Reviews</span>
              </div>

              <h1 className="text-4xl font-extrabold tracking-tight text-[#F8F8F8] drop-shadow-[0_2px_20px_rgba(75,0,130,0.35)] sm:text-5xl lg:text-6xl">
                London Taxi Services <br />
                <span className="bg-[linear-gradient(135deg,#C0C0C0_0%,#F8F8F8_50%,#A5A7AA_100%)] bg-clip-text text-transparent">
                  — Anytime You Need
                </span>
              </h1>

              <p className="text-lg text-[#D1D5DB] max-w-xl">
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
                    <p className="text-lg font-bold">+44 7700 1409 00</p>
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
                    <p className="text-lg font-bold">+44 2080 5090 14</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Booking Form */}
            <Card className="text-foreground">
              <CardContent className="p-6 sm:p-8 space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between border-b border-white/10 pb-4">
                    <h3 className="text-xl font-bold text-foreground">
                      Book Your Transfer
                    </h3>
                    <div className="text-sm font-medium text-muted-foreground flex items-center gap-1 cursor-pointer hover:text-highlight">
                      Return Journey <ChevronDown className="h-4 w-4" />
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="relative">
                      <MapPin className="pointer-events-none absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                      <GooglePlacesInput
                        name="pickup"
                        debugId="home-pickup"
                        placeholder="Pickup Address or Airport"
                        className="booking-field flex h-12 w-full px-3 py-1 text-base md:text-sm pl-10"
                      />
                    </div>
                    <div className="flex justify-end -mt-1 mb-2 relative z-10 pr-2">
                      <button
                        type="button"
                        onClick={addViaLocation}
                        disabled={viaLocations.length >= 5}
                        className="cursor-pointer rounded-md border border-highlight/50 bg-highlight px-2 py-1 text-xs font-medium text-highlight-foreground transition-colors hover:bg-highlight/90 disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        + Add Via
                      </button>
                    </div>
                    {viaLocations.map((via, index) => (
                      <div key={index} className="space-y-1">
                        <label className="text-xs font-medium text-muted-foreground">
                          Via Location
                        </label>
                        <div className="relative">
                          <Input
                            placeholder={`Via Address ${index + 1}`}
                            value={via}
                            onChange={(e) =>
                              updateViaLocation(index, e.target.value)
                            }
                            className="booking-field h-12 pr-10"
                          />
                          <button
                            type="button"
                            onClick={() => removeViaLocation(index)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-lg font-bold leading-none text-rose-500 hover:text-rose-600"
                            aria-label={`Remove via ${index + 1}`}
                          >
                            ×
                          </button>
                        </div>
                      </div>
                    ))}
                    <div className="relative">
                      <MapPin className="pointer-events-none absolute left-3 top-3 h-5 w-5 text-highlight" />
                      <GooglePlacesInput
                        name="dropoff"
                        debugId="home-dropoff"
                        placeholder="Dropoff Address or Airport"
                        className="booking-field flex h-12 w-full px-3 py-1 text-base md:text-sm pl-10"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className="space-y-1.5">
                      <label className="text-xs font-medium text-muted-foreground">
                        Persons
                      </label>
                      <Select>
                        <SelectTrigger className="booking-field h-10 w-full shadow-none data-[placeholder]:text-muted-foreground focus:ring-2 focus:ring-[hsl(var(--highlight)/0.35)]">
                          <Users className="mr-2 h-4 w-4 text-muted-foreground" />
                          <SelectValue placeholder="1" />
                        </SelectTrigger>
                        <SelectContent>
                          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
                            <SelectItem key={n} value={n.toString()}>
                              {n}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-medium text-muted-foreground">
                        Handcarry
                      </label>
                      <Select>
                        <SelectTrigger className="booking-field h-10 w-full shadow-none data-[placeholder]:text-muted-foreground focus:ring-2 focus:ring-[hsl(var(--highlight)/0.35)]">
                          <Briefcase className="mr-2 h-4 w-4 text-muted-foreground" />
                          <SelectValue placeholder="0" />
                        </SelectTrigger>
                        <SelectContent>
                          {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
                            <SelectItem key={n} value={n.toString()}>
                              {n}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-medium text-muted-foreground">
                        Suitcase
                      </label>
                      <Select>
                        <SelectTrigger className="booking-field h-10 w-full shadow-none data-[placeholder]:text-muted-foreground focus:ring-2 focus:ring-[hsl(var(--highlight)/0.35)]">
                          <Briefcase className="mr-2 h-4 w-4 text-muted-foreground" />
                          <SelectValue placeholder="0" />
                        </SelectTrigger>
                        <SelectContent>
                          {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
                            <SelectItem key={n} value={n.toString()}>
                              {n}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1.5">
                      <label className="text-xs font-medium text-muted-foreground">
                        Date
                      </label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className="booking-field h-10 w-full justify-start px-3 text-left font-normal text-foreground shadow-none hover:bg-muted/80"
                          >
                            <CalendarIcon className="mr-2 h-4 w-4 text-muted-foreground" />
                            {date ? format(date, "dd/MM/yyyy") : <span>Select</span>}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent align="start" className="z-[80] w-auto p-0">
                          <Calendar
                            mode="single"
                            selected={date}
                            onSelect={setDate}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-medium text-muted-foreground">
                        Time
                      </label>
                      <div className="relative">
                        <Clock className="pointer-events-none absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          type="time"
                          step={60}
                          defaultValue="12:00"
                          className="booking-field h-10 pl-9"
                        />
                      </div>
                    </div>
                  </div>

                  <Button
                    size="lg"
                    className="h-14 w-full border border-highlight/45 text-lg font-bold shadow-lg shadow-highlight/25 bg-accent text-accent-foreground hover:bg-accent/90"
                  >
                    Get Quote & Book Now
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* 4. Feature Icons Row */}
      <section className="ukride-glass-strong relative z-10 -mt-10 mx-4 max-w-7xl rounded-2xl py-12 text-foreground lg:mx-auto">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 gap-8 divide-y divide-[rgba(192,192,192,0.1)] md:grid-cols-2 md:divide-x md:divide-y-0 lg:grid-cols-4">
            <div className="flex flex-col items-center px-4 pt-4 text-center md:pt-0">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-highlight/12 text-highlight ring-1 ring-highlight/35">
                <Clock className="h-6 w-6" />
              </div>
              <h3 className="mb-2 text-base font-bold tracking-tight text-foreground">
                45-Min Grace Period
              </h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                Get the free 45-minute waiting period and make your airport
                checkouts stress-free.
              </p>
            </div>
            <div className="flex flex-col items-center px-4 pt-4 text-center md:pt-0">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-highlight/12 text-highlight ring-1 ring-highlight/35">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <h3 className="mb-2 text-base font-bold tracking-tight text-foreground">Quality Vehicles</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                We provide well-managed road-ready vehicles to ensure a
                comfortable ride.
              </p>
            </div>
            <div className="flex flex-col items-center px-4 pt-4 text-center md:pt-0">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-highlight/12 text-highlight ring-1 ring-highlight/35">
                <Zap className="h-6 w-6" />
              </div>
              <h3 className="mb-2 text-base font-bold tracking-tight text-foreground">Available 24/7</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                We ensure 24/7 availability to make your London airport transfers
                hassle free.
              </p>
            </div>
            <div className="flex flex-col items-center px-4 pt-4 text-center md:pt-0">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-highlight/12 text-highlight ring-1 ring-highlight/35">
                <CheckCircle2 className="h-6 w-6" />
              </div>
              <h3 className="mb-2 text-base font-bold tracking-tight text-foreground">
                Lowest Price Guaranteed
              </h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                Get the lowest prices available in the market when booking with
                UKride.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Pre-Book Taxis Section */}
      <section className="ukride-section-onyx ukride-grid-bg relative border-t border-[rgba(192,192,192,0.06)] py-24 text-foreground md:py-32">
        <div className="container mx-auto max-w-4xl px-4 text-center">
          <span className="ukride-pill mb-6">Pre-book online</span>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-[#F8F8F8] md:text-4xl">
            Pre-Book Taxis Online with UKRide
          </h2>
          <div className="ukride-divider mx-auto mt-6 w-24" />
          <p className="mt-8 text-lg leading-relaxed text-[#CFCFCF]">
            UKRide is your trusted partner for executive transport across
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
            <Button asChild size="lg" className="h-12 px-8 text-sm font-semibold tracking-wide">
              <Link href="/taxi-quote">Book a Taxi</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* 6. Perfect Taxi Service Section */}
      <section className="ukride-section-charcoal relative border-t border-[rgba(192,192,192,0.06)] py-24 text-foreground md:py-32">
        <div className="container mx-auto px-4">
          <div className="grid items-center gap-12 md:grid-cols-2">
            <div className="space-y-6">
              <span className="ukride-pill">Every journey</span>
              <h2 className="text-3xl font-bold tracking-tight text-[#F8F8F8] md:text-4xl">
                Find the Perfect Taxi Service for Every Journey
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
                <Button asChild size="lg" className="h-12 px-8 text-sm font-semibold tracking-wide">
                  <Link href="/services">Explore Services</Link>
                </Button>
              </div>
            </div>
            <div className="ukride-purple-glow relative h-[500px] overflow-hidden rounded-2xl">
              <img
                src="/perfect-taxi.jpg"
                alt="Perfect Taxi Service"
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,transparent_55%,rgba(13,13,15,0.85)_100%)]" />
            </div>
          </div>
        </div>
      </section>

      {/* 7. Why UK Ride Section */}
      <section className="ukride-section-onyx relative border-t border-[rgba(192,192,192,0.06)] py-28 text-foreground md:py-36">
        <div className="container mx-auto px-4">
          <div className="grid items-center gap-12 md:grid-cols-2 flex-row-reverse">
            <div className="ukride-purple-glow order-2 md:order-1 relative h-[500px] rounded-2xl overflow-hidden">
              <img
                src="/fleet.jpg"
                alt="UKRide Fleet"
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,transparent_55%,rgba(13,13,15,0.85)_100%)]" />
            </div>
            <div className="order-1 space-y-6 md:order-2">
              <span className="ukride-pill">Why UKride</span>
              <h2 className="text-3xl font-bold tracking-tight text-[#F8F8F8] md:text-4xl">
                Why UKride is the Right Choice
              </h2>
              <p className="text-lg leading-relaxed text-[#CFCFCF]">
                We don&apos;t just provide a ride; we provide a reliable
                transport partnership. With a focus on professionalism,
                punctuality, and comfort, UKride stands out as London&apos;s
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
                <Button asChild size="lg" className="h-12 px-8 text-sm font-semibold tracking-wide">
                  <Link href="/taxi-quote">Book a Taxi</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. London Airport Transfers */}
      <section className="ukride-section-charcoal relative border-t border-[rgba(192,192,192,0.06)] py-28 text-foreground md:py-36">
        <div className="container mx-auto px-4">
          <div className="mx-auto mb-16 max-w-3xl text-center">
            <span className="ukride-pill">Airport transfers</span>
            <h2 className="mt-6 text-3xl font-bold tracking-tight text-[#F8F8F8] md:text-4xl">
              London Airport Transfers
            </h2>
            <div className="ukride-divider mx-auto mt-6 w-24" />
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
                img: "/airport_1.jpg",
                slug: "heathrow",
              },
              {
                name: "Gatwick Airport",
                desc: "North and South terminal services",
                img: "/airport_2.jpg",
                slug: "gatwick",
              },
              {
                name: "London City Airport",
                desc: "Fast business hub connections",
                img: "/airport_3.jpg",
                slug: "london-city",
              },
              {
                name: "Luton Airport",
                desc: "Budget airline connections",
                img: "/airport_4.jpg",
                slug: "luton",
              },
              {
                name: "Stansted Airport",
                desc: "Reliable northern hub transfers",
                img: "/airport_5.jpg",
                slug: "stansted",
              },
              {
                name: "Southend Airport",
                desc: "Eastern connection specialist",
                img: "/airport_6.jpg",
                slug: "southend",
              },
            ].map((airport, i) => (
              <Link
                key={i}
                href={`/airport-transfers/${airport.slug}`}
                className="ukride-vehicle-card group block"
              >
                <div className="ukride-vehicle-media relative h-48">
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
      <section className="ukride-section-onyx relative border-t border-[rgba(192,192,192,0.06)] py-24 text-foreground md:py-32">
        <div className="container mx-auto px-4">
          <div className="mx-auto mb-16 max-w-3xl text-center">
            <span className="ukride-pill">Luxury fleet</span>
            <h2 className="mt-6 text-3xl font-bold tracking-tight text-[#F8F8F8] md:text-4xl">
              Luxury Vehicles for Every Occasion
            </h2>
            <div className="ukride-divider mx-auto mt-6 w-24" />
            <p className="mt-6 text-lg leading-relaxed text-[#CFCFCF]">
              From eco-friendly electrics to spacious minivans, our
              immaculately maintained fleet is ready to serve.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { name: "Saloon", pax: 4, hand: 1, lug: 2, img: "/saloon.jpg" },
              { name: "Executive", pax: 4, hand: 1, lug: 1, img: "/executive.jpg" },
              { name: "Estate", pax: 4, hand: 2, lug: 3, img: "/estate.jpg" },
              { name: "MPV", pax: 6, hand: 3, lug: 4, img: "/mpv.jpg" },
              { name: "8 Seater Minibus", pax: 8, hand: 4, lug: 6, img: "/mpv.jpg" },
              { name: "Electric", pax: 4, hand: 2, lug: 1, img: "/saloon.jpg" },
              { name: "Chauffeur", pax: 4, hand: 1, lug: 2, img: "/chauffeur.jpg" },
            ].map((vehicle, i) => (
              <div key={i} className="ukride-vehicle-card group">
                <div className="ukride-vehicle-media relative h-44">
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
                    <span className="rounded-full border border-[rgba(192,192,192,0.18)] bg-[rgba(75,0,130,0.18)] px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#C0C0C0]">
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
                  <Button asChild className="w-full">
                    <Link href="/taxi-quote">Book {vehicle.name}</Link>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 10. Why Choose UKRide Section */}
      <section className="ukride-section-charcoal relative border-t border-[rgba(192,192,192,0.06)] py-28 text-foreground md:py-36">
        <div className="container mx-auto max-w-4xl px-4 text-center">
          <span className="ukride-pill mb-6">Local expertise</span>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-[#F8F8F8] md:text-4xl">
            Why Choose UKRide for Your London Travel?
          </h2>
          <div className="ukride-divider mx-auto mt-6 w-24" />
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
            you. Experience the UKRide difference today.
          </p>
        </div>
      </section>

      {/* 11. App Download Section */}
      <section className="ukride-hero-ambient ukride-luxury-section-3 relative overflow-hidden py-24 text-primary-foreground md:py-32">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-7">
              <span className="ukride-pill">UKRide app</span>
              <h2 className="text-3xl font-bold text-[#F8F8F8] md:text-5xl">
                Get an Instant Quote with the UKRide App
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
              <div className="absolute top-1/2 left-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[rgba(75,0,130,0.55)] blur-3xl opacity-50"></div>
              <img
                src="/app-mockup.jpg"
                alt="App Mockup"
                className="relative z-10 w-[280px] h-[580px] object-cover rounded-[3rem] border-[8px] border-[rgba(192,192,192,0.18)] shadow-[0_36px_88px_-28px_rgba(0,0,0,0.75),0_18px_52px_-12px_rgba(75,0,130,0.55)]"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 12. FAQ Accordion */}
      <section className="ukride-section-onyx relative border-t border-[rgba(192,192,192,0.06)] py-28 text-foreground md:py-36">
        <div className="container mx-auto max-w-3xl px-4">
          <div className="mb-14 text-center">
            <span className="ukride-pill mb-6">Frequently asked</span>
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-[#F8F8F8] md:text-4xl">
              Frequently Asked Questions
            </h2>
            <div className="ukride-divider mx-auto mt-6 w-24" />
            <p className="mt-6 text-lg leading-relaxed text-[#CFCFCF]">
              Everything you need to know about booking with UKRide.
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
                a: "All UKride airport and pre-booked transfers are quoted at a fixed fare. The price you confirm at booking is the price you pay — taxes, tolls and parking included.",
              },
              {
                q: "Do you provide child seats?",
                a: "Yes — infant, child and booster seats are available on request during booking, free of charge.",
              },
              {
                q: "How do I find my driver at the airport?",
                a: "Standard pickups meet you at the designated terminal pickup zone. Meet-and-greet drivers wait inside arrivals with a UKride name board.",
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


