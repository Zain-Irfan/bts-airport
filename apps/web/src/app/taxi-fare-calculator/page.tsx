import Link from "next/link";
import {
  BadgeDollarSign,
  Briefcase,
  CarFront,
  Clock3,
  Phone,
  Plane,
  ShieldCheck,
  Star,
  ThumbsUp,
  Users,
} from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { FullFooterSection } from "@/components/FullFooterSection";
import { HomeBookingForm } from "@/components/forms/HomeBookingForm";
import { SiteTopHeader } from "@/components/layout/SiteTopHeader";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const featureRow = [
  { title: "Get the Best Quotes", desc: "Compare routes and lock a fair fixed fare before you travel.", icon: BadgeDollarSign },
  { title: "No Hidden Charges", desc: "Transparent pricing with clear breakdown at booking.", icon: ShieldCheck },
  { title: "Professional Drivers", desc: "Licensed, experienced drivers for every journey.", icon: Users },
  { title: "24/7 Support", desc: "Round-the-clock help for bookings and trip updates.", icon: Clock3 },
];

const fleet = [
  { name: "Saloon", pax: 4, hand: 1, lug: 2, img: "/saloon.jpg" },
  { name: "MPV", pax: 6, hand: 3, lug: 4, img: "/mpv.jpg" },
  { name: "Executive", pax: 4, hand: 1, lug: 1, img: "/executive.jpg" },
  { name: "8 Seater", pax: 8, hand: 4, lug: 6, img: "/mpv.jpg" },
];

const valueProps = [
  {
    title: "Punctuality Guaranteed",
    desc: "We value your time as much as you do. With our intelligent dispatch system and real-time tracking, UKride ensures every pickup is punctual so you are never left waiting, whether it is an early flight or a late arrival.",
    icon: Plane,
  },
  {
    title: "Why Should I Book A Transfer in Advance?",
    desc: "Pre-booking allows you to avoid last-minute hassles and availability issues. When you book in advance, you lock your ride at a fixed rate and guarantee a stress-free journey. Leave the hassle of airport transfer to us, and you can focus on the things that matter most.",
    icon: CarFront,
  },
  {
    title: "Why Choose Us",
    desc: "We ensure unbeatable prices and highly professional service with carefully selected and fully licensed drivers, road-ready vehicles and customer oriented service. Book with us and enjoy the most comfortable and seamless journey.",
    icon: ThumbsUp,
  },
  {
    title: "Transparent Pricing",
    desc: "With UKride, you will find the best rates for your transfer, covering local taxes, tolls, parking, and VAT.",
    icon: BadgeDollarSign,
  },
];

const faqs = [
  "How is the taxi fare calculated?",
  "Are there any hidden fees in the quoted price?",
  "Can I get a quote for airport transfers?",
  "How far in advance should I book?",
  "What vehicle types are available?",
  "Can I change my booking after getting a quote?",
  "Do you offer return journey pricing?",
  "What payment methods are accepted?",
  "How do I contact support about my quote?",
  "Is the fare fixed after I book?",
];

export default function TaxiFareCalculatorPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <a
        href="https://wa.me/447700140900"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="fixed bottom-6 right-6 z-[60] flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-xl transition hover:scale-105 hover:bg-[#1ebe5d]"
      >
        <FaWhatsapp className="h-7 w-7" />
      </a>

      <SiteTopHeader />

      <section className="relative bg-primary py-16 text-primary-foreground lg:py-20">
        <div className="absolute inset-0 overflow-hidden bg-primary">
          <img
            src="/hero-bg.jpg"
            alt=""
            className="ukride-media-cinematic absolute inset-0 h-full w-full object-cover opacity-[0.22] mix-blend-overlay"
          />
          <div className="absolute inset-0 z-10 bg-gradient-to-b from-background via-primary/95 to-primary" />
        </div>
        <div className="container relative z-20 mx-auto px-4">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center rounded-full border border-highlight/50 bg-highlight/15 px-3 py-1 text-sm">
                <Star className="mr-2 h-4 w-4 fill-highlight text-highlight" />
                <span className="font-semibold">4.9</span>
                <span className="mx-2 text-primary-foreground/50">|</span>
                <span>1538+ Google Reviews</span>
              </div>
              <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
                Taxi Fare Calculator for Smarter Travel
              </h1>
              <p className="max-w-xl text-lg text-primary-foreground/80">
                Enter your journey details for an instant estimate. Fixed fares, clear options, and
                professional drivers for every trip.
              </p>
              <div className="flex items-center gap-2 text-sm">
                <Phone className="h-4 w-4 text-highlight" />
                +44 7700 1409 00
              </div>
            </div>
            <div id="quote">
              <HomeBookingForm />
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-border bg-secondary py-20 md:py-28">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {featureRow.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className="flex flex-col items-center text-center">
                  <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-highlight/15 ring-1 ring-highlight/25">
                    <Icon className="h-7 w-7 text-highlight" />
                  </div>
                  <h3 className="text-lg font-bold text-foreground">{item.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-secondary py-20 md:py-28">
        <div className="container mx-auto px-4">
          <div className="mb-10 text-center">
            <h2 className="text-3xl font-bold text-foreground">Choose your vehicle</h2>
            <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">
              Select the right car for your group and luggage. Every option shows capacity at a
              glance.
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {fleet.map((v) => (
              <Card key={v.name} className="overflow-hidden border-0 shadow-md">
                <img src={v.img} alt={v.name} className="h-36 w-full object-cover" />
                <CardContent className="space-y-3 p-4">
                  <h3 className="text-lg font-bold text-foreground">{v.name}</h3>
                  <div className="flex gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Users className="h-4 w-4" /> {v.pax}
                    </span>
                    <span className="flex items-center gap-1">
                      <Briefcase className="h-4 w-4" /> {v.hand}
                    </span>
                    <span className="flex items-center gap-1">
                      <Briefcase className="h-4 w-4" /> {v.lug}
                    </span>
                  </div>
                  <Button asChild className="w-full bg-accent text-accent-foreground hover:bg-accent/90">
                    <Link href="#quote">Book Now</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-secondary py-20">
        <div className="container mx-auto grid items-center gap-10 px-4 md:grid-cols-2">
          <img
            src="/perfect-taxi.jpg"
            alt="Compare taxi fares"
            className="h-[300px] w-full rounded-2xl object-cover shadow-lg"
          />
          <div className="space-y-4">
            <h2 className="text-3xl font-bold text-foreground">Compare Taxi Fares & Save Money</h2>
            <p className="text-muted-foreground">
              Use our calculator to understand your route cost before you commit. UKride helps you
              plan smarter with upfront pricing tailored to your pickup, drop-off, and vehicle choice.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-secondary py-24 md:py-32">
        <div className="container mx-auto grid items-center gap-10 px-4 md:grid-cols-2">
          <div className="order-2 space-y-4 md:order-1">
            <h2 className="text-3xl font-bold text-foreground">Transparent Pricing With No Surprises</h2>
            <p className="text-muted-foreground">
              Your quote reflects the journey you book. We focus on clarity so you always know what
              you are paying for, from airport runs to cross-town trips.
            </p>
          </div>
          <img
            src="/airport_1.jpg"
            alt="Airport transfer"
            className="order-1 h-[300px] w-full rounded-2xl object-cover shadow-lg md:order-2"
          />
        </div>
      </section>

      <section className="bg-secondary py-20">
        <div className="container mx-auto grid items-center gap-10 px-4 md:grid-cols-2">
          <img
            src="/app-mockup.jpg"
            alt="Book in seconds"
            className="h-[300px] w-full rounded-2xl object-cover shadow-lg"
          />
          <div className="space-y-4">
            <h2 className="text-3xl font-bold text-foreground">Book Your Ride in Seconds</h2>
            <p className="text-muted-foreground">
              Once you are happy with the fare, confirm your details and lock your driver. Fast,
              simple, and built for busy schedules.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-secondary py-24 md:py-32">
        <div className="container mx-auto grid items-center gap-10 px-4 md:grid-cols-2">
          <div className="space-y-4">
            <h2 className="text-3xl font-bold text-foreground">Why Choose Our Taxi Fare Calculator?</h2>
            <p className="text-muted-foreground">
              UKride combines local expertise with a straightforward booking flow so you can plan
              airport, station, and city journeys with confidence.
            </p>
          </div>
          <img
            src="/fleet.jpg"
            alt="UKride fleet"
            className="h-[300px] w-full rounded-2xl object-cover shadow-lg"
          />
        </div>
      </section>

      <section className="bg-secondary py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto mb-12 max-w-4xl text-center">
            <h2 className="text-3xl font-bold text-foreground">Transfers to and from London Heathrow Airport</h2>
          </div>
          <div className="grid grid-cols-1 gap-x-12 gap-y-12 md:grid-cols-2">
            {valueProps.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className="text-center">
                  <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-highlight/15 ring-1 ring-highlight/25">
                    <Icon className="h-7 w-7 text-highlight" />
                  </div>
                  <h3 className="text-lg font-bold text-foreground">{item.title}</h3>
                  <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-muted-foreground">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-secondary py-24 md:py-32">
        <div className="container mx-auto max-w-4xl px-4">
          <div className="mb-10 text-center">
            <h2 className="text-3xl font-bold text-foreground">Frequently Asked Questions</h2>
          </div>
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((q, i) => (
              <AccordionItem key={q} value={`faq-${i}`}>
                <AccordionTrigger className="text-left text-lg font-medium text-foreground hover:text-highlight hover:no-underline">
                  {q}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  UKride provides fixed-fare quotes where applicable. Contact our team if your
                  journey needs a custom route or vehicle.
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      <FullFooterSection />
    </div>
  );
}
