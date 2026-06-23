import Link from "next/link";
import {
  Plane,
  ShieldCheck,
  Star,
  Phone,
  Car,
  ThumbsUp,
  BadgeDollarSign,
  UserRoundCheck,
  CarFront,
  Clock3,
} from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { FullFooterSection } from "@/components/FullFooterSection";
import { HomeBookingForm } from "@/components/forms/HomeBookingForm";
import { SiteTopHeader } from "@/components/layout/SiteTopHeader";
import { Button } from "@/components/ui/button";
import { getSiteSettings } from "@/lib/site-settings";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export type AirportCityContent = {
  /** Display name e.g. "Heathrow", "Gatwick" */
  airportName: string;
  /** Pill text e.g. "Heathrow transfers" */
  pillLabel: string;
  /** Hero h1 e.g. "Book your Heathrow airport transfer" */
  headline: React.ReactNode;
  /** Hero subtitle */
  subtitle: string;
  /** Hero ambient image path */
  heroImage: string;
  /** Long-form intro paragraphs */
  intro: string[];
  /** Reliable & comfortable body paragraphs */
  reliable: string[];
  /** Inter-airport transfer body paragraphs */
  interAirport: string[];
  /** Gateway / closing body paragraphs */
  gateway: string[];
  /** Side images for the storytelling stack */
  storyImages?: {
    intro: string;
    reliable: string;
    inter: string;
    gateway: string;
  };
  /** FAQ list */
  faqs: { q: string; a: string }[];
  /** Optional: include terminals bullet list (Heathrow uses this) */
  terminals?: string[];
};

const DEFAULT_STORY_IMAGES = {
  intro: "/images/heathrow-terminal5-couple.jpg",
  reliable: "/images/heathrow-driver-loading.jpg",
  inter: "/images/heathrow-mpv-family.jpg",
  gateway: "/images/british-airways-plane.jpg",
};

const FEATURE_ROW = [
  {
    title: "45-min grace period",
    desc: "Free 45-minute waiting on every airport pickup — stress-free arrivals.",
    icon: UserRoundCheck,
  },
  {
    title: "Premium vehicles",
    desc: "Road-ready, immaculately maintained cars for every journey.",
    icon: CarFront,
  },
  {
    title: "24/7 availability",
    desc: "Pre-booked transfers around the clock, every day of the year.",
    icon: Clock3,
  },
  {
    title: "Lowest fare guarantee",
    desc: "Transparent pricing with no hidden charges, ever.",
    icon: BadgeDollarSign,
  },
];

const FLEET = [
  { name: "Saloon", img: "/images/saloon.jpeg" },
  { name: "MPV", img: "/images/vehicle-vclass-8seater.jpg" },
  { name: "Estate", img: "/images/vehicle-estate.jpg" },
  { name: "Chauffeur", img: "/images/vehicle-sclass-new.jpg" },
];

const VALUE_PROPS = [
  {
    title: "Punctuality guaranteed",
    desc: "Intelligent dispatch and live tracking keep every pickup on time.",
    icon: Plane,
  },
  {
    title: "Meet and greet",
    desc: "Optional in-terminal meet-and-greet with a name board for a seamless arrival.",
    icon: Car,
  },
  {
    title: "Why choose BTS",
    desc: "Licensed drivers, premium fleet, monitored journeys — built around your trip.",
    icon: ThumbsUp,
  },
  {
    title: "Transparent pricing",
    desc: "All-inclusive fares — local taxes, tolls, parking, and VAT included.",
    icon: BadgeDollarSign,
  },
];

export async function AirportCityPageTemplate({ content }: { content: AirportCityContent }) {
  const { whatsapp } = await getSiteSettings();
  const story = content.storyImages ?? DEFAULT_STORY_IMAGES;

  return (
    <div className="min-h-screen bg-background font-sans text-foreground">
      <a
        href={`https://wa.me/${whatsapp}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="fixed bottom-6 right-6 z-[60] flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-xl transition hover:scale-105 hover:bg-[#1ebe5d]"
      >
        <FaWhatsapp className="h-7 w-7" />
      </a>

      <SiteTopHeader />

      {/* Hero */}
      <section className="BTS-hero-ambient BTS-luxury-section-1 BTS-grid-bg relative overflow-hidden py-20 lg:py-28">
        <div className="absolute inset-0 z-0 overflow-hidden">
          <img
            src={content.heroImage}
            alt=""
            aria-hidden
            className="BTS-media-cinematic absolute inset-0 h-full w-full object-cover opacity-[0.22] mix-blend-overlay"
          />
        </div>
        <div className="container relative z-10 mx-auto px-4">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center rounded-full border border-[rgba(192,192,192,0.22)] bg-[rgba(45,45,51,0.55)] px-3 py-1 text-sm shadow-[0_4px_18px_-6px_rgba(0,0,0,0.4)] backdrop-blur">
                <Star className="mr-2 h-4 w-4 fill-[#C0C0C0] text-[#C0C0C0]" />
                <span className="font-semibold text-[#F8F8F8]">4.9</span>
                <span className="mx-2 text-[#C0C0C0]/60">|</span>
                <span className="text-[#CFCFCF]">1538+ Google reviews</span>
              </div>
              <span className="BTS-pill">{content.pillLabel}</span>
              <h1 className="text-4xl font-bold tracking-tight text-[#F8F8F8] sm:text-5xl">
                {content.headline}
              </h1>
              <p className="max-w-xl text-[15px] leading-relaxed text-[#CFCFCF]">
                {content.subtitle}
              </p>
              <div className="flex flex-col gap-3 text-sm text-[#C0C0C0] sm:flex-row sm:items-center">
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  +44 7700 1409 00
                </div>
                <div className="hidden h-4 w-px bg-[rgba(192,192,192,0.22)] sm:block" />
                <div className="flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4" />
                  Flight-monitored journeys
                </div>
              </div>
            </div>
            <HomeBookingForm />
          </div>
        </div>
      </section>

      {/* Feature row */}
      <section className="BTS-section-charcoal relative py-20 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {FEATURE_ROW.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className="space-y-4">
                  <div className="BTS-icon-halo h-12 w-12">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="text-xl font-semibold tracking-tight text-[#F8F8F8]">
                    {item.title}
                  </h3>
                  <p className="text-[14.5px] leading-relaxed text-[#CFCFCF]">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Intro */}
      <section className="BTS-section-onyx relative py-20 md:py-24">
        <div className="container mx-auto grid items-center gap-12 px-4 md:grid-cols-2">
          <div className="BTS-purple-glow relative h-[340px] overflow-hidden rounded-2xl">
            <img src={story.intro} alt="" className="h-full w-full object-cover" />
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,transparent_55%,rgba(13,13,15,0.85)_100%)]" />
          </div>
          <div className="space-y-5">
            <span className="BTS-pill">Premium service</span>
            <h2 className="text-3xl font-bold tracking-tight text-[#F8F8F8] md:text-4xl">
              A smooth {content.airportName} transfer, anywhere in London
            </h2>
            {content.intro.map((p, i) => (
              <p key={i} className="text-[15px] leading-relaxed text-[#CFCFCF]">
                {p}
              </p>
            ))}
            <Button asChild className="mt-2">
              <Link href="/taxi-quote">Book a taxi</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Fleet */}
      <section className="BTS-section-charcoal relative py-20 md:py-28">
        <div className="container mx-auto px-4">
          <div className="mx-auto mb-12 max-w-3xl text-center">
            <span className="BTS-pill">Choose your ride</span>
            <h2 className="mt-6 text-3xl font-bold tracking-tight text-[#F8F8F8] md:text-4xl">
              The right car for every destination
            </h2>
            <div className="BTS-divider mx-auto mt-6 w-24" />
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {FLEET.map((car) => (
              <div key={car.name} className="BTS-vehicle-card group">
                <div className="BTS-vehicle-media relative h-40">
                  <img src={car.img} alt={car.name} className="h-full w-full object-cover" />
                </div>
                <div className="space-y-3 p-5">
                  <h3 className="text-lg font-semibold tracking-tight text-[#F8F8F8]">
                    {car.name}
                  </h3>
                  <Button asChild className="w-full">
                    <Link href="/taxi-quote">Book now</Link>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Reliable */}
      <section className="BTS-section-onyx relative py-24 md:py-32">
        <div className="container mx-auto grid items-center gap-12 px-4 md:grid-cols-2">
          <div className="order-2 space-y-5 md:order-1">
            <span className="BTS-pill">Reliable &amp; comfortable</span>
            <h2 className="text-3xl font-bold tracking-tight text-[#F8F8F8] md:text-4xl">
              {content.airportName} airport taxis built around your journey
            </h2>
            {content.reliable.map((p, i) => (
              <p key={i} className="text-[15px] leading-relaxed text-[#CFCFCF]">
                {p}
              </p>
            ))}
            <Button asChild className="mt-2">
              <Link href="/taxi-quote">Book a taxi</Link>
            </Button>
          </div>
          <div className="BTS-purple-glow relative order-1 h-[340px] overflow-hidden rounded-2xl md:order-2">
            <img src={story.reliable} alt="" className="h-full w-full object-cover" />
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,transparent_55%,rgba(13,13,15,0.85)_100%)]" />
          </div>
        </div>
      </section>

      {/* Inter-airport */}
      <section className="BTS-section-charcoal relative py-20 md:py-24">
        <div className="container mx-auto grid items-center gap-12 px-4 md:grid-cols-2">
          <div className="BTS-purple-glow relative h-[340px] overflow-hidden rounded-2xl">
            <img src={story.inter} alt="" className="h-full w-full object-cover" />
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,transparent_55%,rgba(13,13,15,0.85)_100%)]" />
          </div>
          <div className="space-y-5">
            <span className="BTS-pill">Inter-airport</span>
            <h2 className="text-3xl font-bold tracking-tight text-[#F8F8F8] md:text-4xl">
              Moving from {content.airportName} to another airport?
            </h2>
            {content.interAirport.map((p, i) => (
              <p key={i} className="text-[15px] leading-relaxed text-[#CFCFCF]">
                {p}
              </p>
            ))}
            <Button asChild className="mt-2">
              <Link href="/taxi-quote">Book a taxi</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Gateway */}
      <section className="BTS-section-onyx relative py-24 md:py-32">
        <div className="container mx-auto grid items-center gap-12 px-4 md:grid-cols-2">
          <div className="space-y-5">
            <span className="BTS-pill">Gateway</span>
            <h2 className="text-3xl font-bold tracking-tight text-[#F8F8F8] md:text-4xl">
              BTS: your gateway to {content.airportName}
            </h2>
            {content.gateway.map((p, i) => (
              <p key={i} className="text-[15px] leading-relaxed text-[#CFCFCF]">
                {p}
              </p>
            ))}
            {content.terminals ? (
              <ul className="grid grid-cols-2 gap-2.5 pt-2 text-[14.5px] text-[#CFCFCF]">
                {content.terminals.map((t) => (
                  <li
                    key={t}
                    className="flex items-center gap-2.5 rounded-lg border border-[rgba(192,192,192,0.25)] bg-[linear-gradient(135deg,rgba(192,192,192,0.06)_0%,rgba(13,13,15,0.7)_100%)] px-3 py-2"
                  >
                    <span className="block h-1.5 w-1.5 rounded-full bg-[#C0C0C0]" />
                    {t}
                  </li>
                ))}
              </ul>
            ) : null}
            <Button asChild className="mt-2">
              <Link href="/taxi-quote">Book a taxi</Link>
            </Button>
          </div>
          <div className="BTS-purple-glow relative h-[400px] overflow-hidden rounded-2xl">
            <img src={story.gateway} alt="" className="h-full w-full object-cover" />
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,transparent_55%,rgba(13,13,15,0.85)_100%)]" />
          </div>
        </div>
      </section>

      {/* Value props */}
      <section className="BTS-section-charcoal relative py-20 md:py-28">
        <div className="container mx-auto px-4">
          <div className="mx-auto mb-12 max-w-3xl text-center">
            <span className="BTS-pill">Why BTS</span>
            <h2 className="mt-6 text-3xl font-bold tracking-tight text-[#F8F8F8] md:text-4xl">
              Transfers to and from {content.airportName}
            </h2>
            <div className="BTS-divider mx-auto mt-6 w-24" />
          </div>
          <div className="mx-auto grid max-w-5xl gap-x-14 gap-y-12 md:grid-cols-2">
            {VALUE_PROPS.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className="text-center">
                  <div className="BTS-icon-halo mx-auto mb-5 h-14 w-14">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-semibold text-[#F8F8F8]">{item.title}</h3>
                  <p className="mx-auto mt-3 max-w-md text-[14.5px] leading-relaxed text-[#CFCFCF]">
                    {item.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="BTS-section-onyx relative py-24 md:py-32">
        <div className="container mx-auto max-w-3xl px-4">
          <div className="mb-12 text-center">
            <span className="BTS-pill">FAQs</span>
            <h2 className="mt-6 text-3xl font-bold tracking-tight text-[#F8F8F8] md:text-4xl">
              Frequently asked questions
            </h2>
            <div className="BTS-divider mx-auto mt-6 w-24" />
          </div>
          <Accordion type="single" collapsible className="w-full">
            {content.faqs.map((item, i) => (
              <AccordionItem key={item.q} value={`faq-${i}`}>
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
