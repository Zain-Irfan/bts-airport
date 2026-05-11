"use client";

import React, { useState } from "react";
import Link from "next/link";
import { MainNav } from "@/components/MainNav";
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
  Plane,
  Star,
  Phone,
  ChevronDown,
  CheckCircle2,
  ShieldCheck,
  Zap,
} from "lucide-react";
import { format } from "date-fns";
import { FaFacebookF, FaInstagram } from "react-icons/fa";
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
      <header className="ukride-glass-nav sticky top-0 z-50 w-full">
        <div className="container mx-auto flex h-20 items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-highlight text-highlight-foreground">
              <Plane className="h-6 w-6" />
            </div>
            <span className="text-2xl font-bold tracking-tight text-foreground">
              BTS
            </span>
          </div>
          <MainNav />
          <div className="flex items-center gap-4">
            <Button
              asChild
              className="hidden border border-highlight/40 sm:inline-flex bg-accent text-accent-foreground hover:bg-accent/90"
            >
              <Link href="/login">Log In</Link>
            </Button>
            <Button
              asChild
              className="border border-highlight/40 bg-accent text-accent-foreground hover:bg-accent/90"
            >
              <Link href="/signup">Sign Up</Link>
            </Button>
          </div>
        </div>
      </header>

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
      <section className="border-t border-white/[0.06] bg-background py-24 text-foreground">
        <div className="container mx-auto max-w-4xl px-4 text-center">
          <h2 className="mx-auto mb-6 w-max border-b-4 border-highlight pb-2 text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            Pre-Book Taxis Online with UK Ride
          </h2>
          <p className="mb-6 text-lg leading-relaxed text-muted-foreground">
            UK Ride is your trusted partner for all transport needs across
            London and its major airports. Whether you're heading to a crucial
            business meeting, catching a flight from Heathrow, or simply
            exploring the city, our pre-booking platform ensures a seamless,
            comfortable journey from start to finish.
          </p>
          <p className="mb-10 text-lg leading-relaxed text-muted-foreground">
            With transparent pricing, professional drivers, and a diverse fleet
            tailored to your requirements, we take the stress out of London
            travel. Secure your ride in minutes and experience transport the way
            it should be.
          </p>
          <Button
            asChild
            size="lg"
            className="border border-highlight/45 bg-accent px-8 text-accent-foreground shadow-md shadow-highlight/20 hover:bg-accent/90"
          >
            <Link href="/taxi-quote">Book a Taxi</Link>
          </Button>
        </div>
      </section>

      {/* 6. Perfect Taxi Service Section */}
      <section className="border-t border-white/[0.06] bg-secondary py-24 text-foreground">
        <div className="container mx-auto px-4">
          <div className="grid items-center gap-12 md:grid-cols-2">
            <div className="space-y-6">
              <h2 className="border-l-4 border-highlight pl-4 text-3xl font-bold tracking-tight text-foreground md:text-4xl">
                Find the Perfect Taxi Service for Every Journey
              </h2>
              <p className="text-lg leading-relaxed text-muted-foreground">
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
                    <CheckCircle2 className="h-6 w-6 shrink-0 text-highlight" />
                    <span className="font-medium text-foreground/90">{item}</span>
                  </li>
                ))}
              </ul>
              <div className="pt-6">
                <Button
                  size="lg"
                  className="border border-highlight/45 bg-accent text-accent-foreground shadow-md shadow-highlight/20 hover:bg-accent/90"
                >
                  Explore Services
                </Button>
              </div>
            </div>
            <div className="relative h-[500px] rounded-2xl overflow-hidden shadow-xl">
              <img
                src="/perfect-taxi.jpg"
                alt="Perfect Taxi Service"
                className="absolute inset-0 h-full w-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 7. Why UK Ride Section */}
      <section className="border-t border-white/[0.06] bg-secondary py-28 text-foreground md:py-36">
        <div className="container mx-auto px-4">
          <div className="grid items-center gap-12 md:grid-cols-2 flex-row-reverse">
            <div className="order-2 md:order-1 relative h-[500px] rounded-2xl overflow-hidden shadow-xl">
              <img
                src="/fleet.jpg"
                alt="UKRide Fleet"
                className="absolute inset-0 h-full w-full object-cover"
              />
            </div>
            <div className="order-1 space-y-6 md:order-2">
              <h2 className="border-l-4 border-highlight pl-4 text-3xl font-bold tracking-tight text-foreground md:text-4xl">
                Why UK Ride is the Right Choice
              </h2>
              <p className="text-lg leading-relaxed text-muted-foreground">
                We don't just provide a ride; we provide a reliable transport
                partnership. With a focus on professionalism, punctuality, and
                comfort, UKRide stands out as London's premier transfer service.
              </p>
              <ul className="space-y-4 pt-4">
                {[
                  "Fully Insured & Licensed Drivers",
                  "Modern, Eco-Friendly EV Options",
                  "Fixed, Transparent Pricing — No Hidden Fees",
                  "Complimentary Meet & Greet Service",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="h-6 w-6 shrink-0 text-highlight" />
                    <span className="font-medium text-foreground/90">{item}</span>
                  </li>
                ))}
              </ul>
              <div className="pt-6">
                <Button
                  asChild
                  size="lg"
                  className="border border-highlight/45 bg-accent text-accent-foreground shadow-md shadow-highlight/20 hover:bg-accent/90"
                >
                  <Link href="/taxi-quote">Book a Taxi</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. London Airport Transfers */}
      <section className="border-t border-white/[0.06] bg-secondary py-28 text-foreground md:py-36">
        <div className="container mx-auto px-4">
          <div className="mx-auto mb-16 max-w-3xl text-center">
            <h2 className="mx-auto mb-4 w-max border-b-4 border-highlight pb-2 text-3xl font-bold tracking-tight text-foreground md:text-4xl">
              London Airport Transfers
            </h2>
            <p className="text-lg leading-relaxed text-muted-foreground">
              Reliable, punctual transfers to and from all major London airports.
              We monitor your flight to ensure we're there exactly when you need
              us.
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
              <Card
                key={i}
                className="overflow-hidden group cursor-pointer transition-all"
              >
                <div className="relative h-48 overflow-hidden">
                  <div className="absolute inset-0 z-10 bg-[rgba(43,18,56,0.35)] transition-colors group-hover:bg-[rgba(75,0,130,0.32)]" />
                  <img
                    src={airport.img}
                    alt={airport.name}
                    className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <CardContent className="p-6 text-foreground">
                  <h3 className="mb-2 text-xl font-bold tracking-tight text-foreground">
                    {airport.name}
                  </h3>
                  <p className="text-muted-foreground">{airport.desc}</p>
                  <Button asChild variant="link" className="no-default-active-elevate no-default-hover-elevate mt-4 cursor-pointer bg-transparent px-0 font-semibold text-highlight no-underline hover:bg-transparent hover:text-highlight/85 hover:no-underline focus:bg-transparent active:bg-transparent">
                    <Link href={`/airport-transfers/${airport.slug}`}>
                      Book Transfer &rarr;
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* 9. Vehicle Fleet Section */}
      <section className="border-t border-white/[0.06] bg-secondary py-24 text-foreground">
        <div className="container mx-auto px-4">
          <div className="mx-auto mb-16 max-w-3xl text-center">
            <h2 className="mx-auto mb-4 w-max border-b-4 border-highlight pb-2 text-3xl font-bold tracking-tight text-foreground md:text-4xl">
              Luxury Vehicles for Every Desire
            </h2>
            <p className="text-lg leading-relaxed text-muted-foreground">
              From eco-friendly electrics to spacious minivans, our immaculately
              maintained fleet is ready to serve.
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
              <Card key={i} className="text-card-foreground">
                <div className="p-6 pb-0">
                  <h3 className="mb-1 text-xl font-bold tracking-tight text-foreground">{vehicle.name}</h3>
                  <div className="mb-4 flex gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Users className="h-4 w-4" /> {vehicle.pax}
                    </span>
                    <span className="flex items-center gap-1">
                      <Briefcase className="h-4 w-4" /> {vehicle.hand}
                    </span>
                    <span className="flex items-center gap-1">
                      <Briefcase className="h-4 w-4" /> {vehicle.lug}
                    </span>
                  </div>
                </div>
                <div className="px-6 pb-6">
                  <img
                    src={vehicle.img}
                    alt={vehicle.name}
                    className="w-full h-32 object-cover rounded-md mb-4"
                  />
                  <Button className="w-full border border-highlight/40 bg-accent text-accent-foreground shadow-sm shadow-highlight/15 hover:bg-accent/90">
                    Book {vehicle.name}
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* 10. Why Choose UKRide Section */}
      <section className="border-t border-white/[0.06] bg-secondary py-28 text-foreground md:py-36">
        <div className="container mx-auto max-w-4xl px-4 text-center">
          <h2 className="mx-auto mb-6 w-max border-b-4 border-highlight pb-2 text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            Why Choose UKRide for Your London Travel?
          </h2>
          <p className="mb-6 text-lg leading-relaxed text-muted-foreground">
            Navigating London's busy streets and airports requires local expertise
            and reliable logistics. We've built our reputation on ensuring every
            passenger reaches their destination comfortably and safely. Our
            advanced booking system, flight monitoring technology, and dedicated
            customer support team work in tandem to deliver an unparalleled
            service experience.
          </p>
          <p className="text-lg leading-relaxed text-muted-foreground">
            Whether you are a solo traveler, a family on vacation, or a corporate
            team, we have the right vehicle and the right driver for you.
            Experience the UKRide difference today.
          </p>
        </div>
      </section>

      {/* 11. App Download Section */}
      <section className="ukride-hero-ambient ukride-luxury-section-3 py-24 text-primary-foreground overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <h2 className="border-l-4 border-highlight pl-4 text-3xl font-bold text-[#F8F8F8] md:text-5xl">
                Get an Instant Quote with the UKRide App!
              </h2>
              <p className="text-lg text-[#D1D5DB]">
                Book your ride faster, track your driver in real-time, and manage
                all your bookings from your pocket. Available on iOS and Android.
              </p>
              <div className="flex flex-wrap gap-4 pt-4">
                <Button
                  size="lg"
                  className="h-14 border border-highlight/45 bg-accent px-8 text-accent-foreground shadow-md shadow-highlight/20 hover:bg-accent/90"
                >
                  App Store
                </Button>
                <Button
                  size="lg"
                  className="h-14 border border-highlight/45 bg-accent px-8 text-accent-foreground shadow-md shadow-highlight/20 hover:bg-accent/90"
                >
                  Google Play
                </Button>
              </div>
            </div>
            <div className="relative flex justify-center mt-12 md:mt-0">
              <div className="absolute top-1/2 left-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-highlight blur-3xl opacity-25"></div>
              <img
                src="/app-mockup.jpg"
                alt="App Mockup"
                className="relative z-10 w-[280px] h-[580px] object-cover rounded-[3rem] border-[8px] border-primary-foreground/20 shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 12. FAQ Accordion */}
      <section className="border-t border-white/[0.06] bg-secondary py-28 text-foreground md:py-36">
        <div className="container mx-auto max-w-3xl px-4">
          <div className="mb-16 text-center">
            <h2 className="mx-auto mb-4 w-max border-b-4 border-highlight pb-2 text-3xl font-bold tracking-tight text-foreground md:text-4xl">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-muted-foreground">
              Everything you need to know about booking with UKRide.
            </p>
          </div>

          <Accordion type="single" collapsible className="w-full">
            {[
              "How far in advance should I book my airport transfer?",
              "What happens if my flight is delayed?",
              "Are your prices fixed or metered?",
              "Do you provide child seats?",
              "How do I find my driver at the airport?",
              "What payment methods do you accept?",
              "Can I cancel or amend my booking?",
              "Is the 45-minute waiting time really free?",
            ].map((q, i) => (
              <AccordionItem key={i} value={`item-${i}`}>
                <AccordionTrigger className="py-4 text-left text-lg font-medium text-foreground hover:text-highlight hover:no-underline">
                  {q}
                </AccordionTrigger>
                <AccordionContent className="leading-relaxed text-muted-foreground">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                  eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                  enim ad minim veniam, quis nostrud exercitation ullamco laboris
                  nisi ut aliquip ex ea commodo consequat.
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* 13. CTA Banner */}
      <section className="ukride-hero-ambient ukride-luxury-section-2 py-24 relative overflow-hidden flex items-center justify-center min-h-[420px]">
        <div className="absolute inset-0 z-0 overflow-hidden">
          <img
            src="/cta-bg.jpg"
            alt="London taxi at night"
            className="ukride-media-cinematic absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-[0.35]"
          />
          <div className="ukride-media-overlay" />
        </div>
        <div className="container relative z-20 text-center px-4">
          <h2 className="mx-auto mb-6 w-max border-b-4 border-highlight pb-2 text-4xl font-extrabold tracking-tight text-[#F8F8F8] drop-shadow-[0_2px_24px_rgba(75,0,130,0.45)] md:text-5xl">
            ARE YOU READY TO HIRE?
          </h2>
          <p className="text-xl text-[#D1D5DB] max-w-2xl mx-auto mb-10">
            Experience the pinnacle of London transport. Professional, reliable,
            and always on time.
          </p>
          <Button
            asChild
            size="lg"
            className="h-14 border-2 border-[rgba(192,192,192,0.32)] bg-accent px-10 text-lg font-bold text-accent-foreground shadow-[0_18px_48px_-10px_rgba(75,0,130,0.7),0_0_0_4px_rgba(75,0,130,0.22)] hover:bg-accent/90"
          >
            <Link href="/taxi-quote">Book a Taxi Now</Link>
          </Button>
        </div>
      </section>

      {/* 14. Footer */}
      <footer className="bg-primary text-primary-foreground pt-20 pb-10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
            <div className="space-y-3 text-primary-foreground/85">
              <h4 className="text-3xl font-bold mb-4 text-primary-foreground">Contact Us</h4>
              <p className="text-primary-foreground/70">support@ukride.uk</p>
              <div className="pt-2 space-y-2">
                <p className="text-primary-foreground/70">Call Us Now:</p>
                <p>+44 7700 1409 00</p>
                <p>+44 2080 5090 14</p>
              </div>
              <div className="pt-2">
                <h4 className="text-3xl font-bold text-primary-foreground">UKride Address</h4>
                <p className="mt-2 text-primary-foreground/70">
                  450 Bath Rd, London UB7 0EB, United Kingdom
                </p>
              </div>
              <p className="text-primary-foreground/70 max-w-xs">
                Bookings handled by licensed operator&apos;s companies.
              </p>
              <div className="flex gap-4 pt-2">
                <a
                  href="#"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-primary-foreground/30 transition-colors hover:border-highlight hover:bg-highlight hover:text-highlight-foreground"
                >
                  <FaFacebookF className="h-4 w-4" />
                </a>
                <a
                  href="#"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-primary-foreground/30 transition-colors hover:border-highlight hover:bg-highlight hover:text-highlight-foreground"
                >
                  <FaInstagram className="h-4 w-4" />
                </a>
              </div>
            </div>

            <div>
              <h4 className="mb-6 text-3xl font-bold text-highlight">London Airport</h4>
              <ul className="space-y-3 text-primary-foreground/70">
                <li>
                  <Link href="/airport-transfers/london-city" className="hover:text-highlight transition-colors">
                    London City Airport Transfers
                  </Link>
                </li>
                <li>
                  <Link href="/airport-transfers/heathrow" className="hover:text-highlight transition-colors">
                    Heathrow Airport Transfers
                  </Link>
                </li>
                <li>
                  <Link href="/airport-transfers/gatwick" className="hover:text-highlight transition-colors">
                    Gatwick Airport Transfers
                  </Link>
                </li>
                <li>
                  <Link href="/airport-transfers/luton" className="hover:text-highlight transition-colors">
                    Luton Airport Transfers
                  </Link>
                </li>
                <li>
                  <Link href="/airport-transfers/southend" className="hover:text-highlight transition-colors">
                    Southend Airport Transfers
                  </Link>
                </li>
                <li>
                  <Link href="/airport-transfers/stansted" className="hover:text-highlight transition-colors">
                    Stansted Airport Transfers
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="mb-6 text-3xl font-bold text-highlight">Plan Your Journey</h4>
              <ul className="space-y-3 text-primary-foreground/70">
                <li>
                  <Link href="/london-hotel-transfers/" className="hover:text-highlight transition-colors">
                    London Hotel Transfer
                  </Link>
                </li>
                <li>
                  <Link href="/london-station-taxi/" className="hover:text-highlight transition-colors">
                    London Station Taxi
                  </Link>
                </li>
                <li>
                  <Link href="/london-taxi/" className="hover:text-highlight transition-colors">
                    London Taxi
                  </Link>
                </li>
                <li>
                  <Link href="/taxi-quote" className="hover:text-highlight transition-colors">
                    Taxi Quote
                  </Link>
                </li>
                <li>
                  <Link href="/taxi-booking-app/" className="hover:text-highlight transition-colors">
                    Taxi Booking App
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="mb-6 text-3xl font-bold text-highlight">Useful Links</h4>
              <ul className="space-y-3 text-primary-foreground/70">
                <li>
                  <Link href="/terms-and-conditions" className="hover:text-highlight transition-colors">
                    Customer T&C
                  </Link>
                </li>
                <li>
                  <Link href="/privacy-policy" className="hover:text-highlight transition-colors">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/taxi-fare-calculator/" className="hover:text-highlight transition-colors">
                    Taxi Fare Calculator
                  </Link>
                </li>
                <li>
                  <Link href="/drive-with-us/" className="hover:text-highlight transition-colors">
                    Drive With Us
                  </Link>
                </li>
                <li>
                  <Link href="/blog/" className="hover:text-highlight transition-colors">
                    Blog
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-primary-foreground/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-primary-foreground/50">
            <p>Copyright © 2025 UkRide. All rights reserved.</p>
            <p>Designed for professional transport.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}


