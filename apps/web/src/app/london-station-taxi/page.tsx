import type { Metadata } from "next";
import { Phone, ShieldCheck, Star } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { FullFooterSection } from "@/components/FullFooterSection";
import { HomeBookingForm } from "@/components/forms/HomeBookingForm";
import { SiteTopHeader } from "@/components/layout/SiteTopHeader";
import { getSiteSettings } from "@/lib/site-settings";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const metadata: Metadata = {
  title: "London Station Taxi",
  description: "Pre-book a fixed-price taxi to or from any London railway station, with a professional driver ready when you arrive.",
};

const stations = [
  { name: "Euston Station", image: "/images/london-taxi-sightseeing.jpg", desc: "Direct station pickups with smooth city connections." },
  { name: "King's Cross Station", image: "/images/executive-passenger.jpg", desc: "Fast transfers for rail arrivals and departures." },
  { name: "Victoria Station", image: "/images/luxury-car-interior.jpg", desc: "Private rides from Victoria to all London zones." },
  { name: "Paddington Station", image: "/images/heathrow-driver-loading.jpg", desc: "Reliable rides to hotels, airports, and offices." },
  { name: "Liverpool Street Station", image: "/images/hotel-chauffeur.jpg", desc: "Business-ready transfers with fixed rates." },
  { name: "London Bridge", image: "/images/mpv-airport-boarding.jpg", desc: "Book 24/7 station taxi service with MRM Executive Voyage." },
  { name: "St Pancras International", image: "/images/heathrow-terminal5-couple.jpg", desc: "Seamless Eurostar and city transfer support." },
  { name: "Waterloo Station", image: "/images/heathrow-mpv-family.jpg", desc: "Efficient pickups around Waterloo and South Bank." },
];

const faqs = [
  {
    q: "Can I book taxis to major train terminals?",
    a: "Yes — MRM Executive Voyage covers Euston, King's Cross, St Pancras, Victoria, Paddington, Liverpool Street, London Bridge, Waterloo and more, 24/7.",
  },
  {
    q: "Do you provide transfers from station to home/hotel?",
    a: "Yes — door-to-door fixed-fare transfers from any London terminal to your home, hotel, or office.",
  },
  {
    q: "Are your London station taxis available 24/7?",
    a: "Yes. Late-night arrivals, early-morning departures, weekends and bank holidays are all covered.",
  },
  {
    q: "Do you offer airport transfers direct from station?",
    a: "Yes — book a direct station-to-airport transfer in one journey, with fixed pricing.",
  },
  {
    q: "How much does a London station taxi transfer cost?",
    a: "Fares are calculated by route, vehicle class, and any add-ons — your final quote is locked at booking.",
  },
  {
    q: "Can I book a larger vehicle for family or group travel?",
    a: "Yes — Estate, MPV and 8-Seater options are available across all station routes.",
  },
  {
    q: "Do you provide child seats in your taxis?",
    a: "Yes — infant, child and booster seats are available on request, free of charge.",
  },
  {
    q: "What types of vehicles do you provide?",
    a: "Saloon, Estate, Executive, MPV, 8-Seater and Chauffeur classes.",
  },
  {
    q: "What payment methods do you accept?",
    a: "All major credit/debit cards, Apple Pay, Google Pay, and corporate accounts.",
  },
  {
    q: "How can I find my driver at the station?",
    a: "Your driver will share their location and a real-time tracking link before pickup, and meet at the agreed pickup zone.",
  },
];

export default async function LondonStationTaxiPage() {
  const { whatsapp, phone } = await getSiteSettings();
  return (
    <div className="min-h-screen bg-background text-foreground">
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
            src="/hero-bg.jpg"
            alt=""
            aria-hidden
            className="BTS-media-cinematic absolute inset-0 h-full w-full object-cover opacity-[0.22] mix-blend-overlay"
          />
        </div>
        <div className="container relative z-10 mx-auto px-4">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center rounded-full border border-border bg-muted px-3 py-1 text-sm shadow-sm backdrop-blur">
                <Star className="mr-2 h-4 w-4 fill-gold text-gold-ink" />
                <span className="font-semibold text-foreground">4.9</span>
                <span className="mx-2 text-muted-foreground/60">|</span>
                <span className="text-body">1538+ Google reviews</span>
              </div>
              <span className="BTS-pill">Station transfers</span>
              <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
                Your ride from any London station, made easy
              </h1>
              <p className="max-w-xl text-[15px] leading-relaxed text-body">
                Fixed-fare station pickup across every major London terminal.
                Fast arrivals, professional drivers, premium vehicles.
              </p>
              <div className="flex flex-col gap-3 text-sm text-gold-ink sm:flex-row sm:items-center">
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  {phone}
                </div>
                <div className="hidden h-4 w-px bg-border sm:block" />
                <div className="flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4" />
                  24/7 monitored journeys
                </div>
              </div>
            </div>
            <HomeBookingForm />
          </div>
        </div>
      </section>

      {/* Trust band */}
      <section className="BTS-section-charcoal relative py-20 md:py-24">
        <div className="container mx-auto max-w-4xl px-4 text-center">
          <span className="BTS-pill">Trusted across London</span>
          <h2 className="mt-6 text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            Premium taxis from every major London station
          </h2>
          <div className="BTS-divider mx-auto mt-6 w-24" />
          <p className="mt-6 text-[15px] leading-relaxed text-body">
            We make station travel simple with punctual pickups, fixed fares,
            and professional drivers — to airports, hotels, offices, or home.
          </p>
        </div>
      </section>

      {/* Stations grid */}
      <section className="BTS-section-onyx relative py-20 md:py-28">
        <div className="container mx-auto px-4">
          <div className="mx-auto mb-12 max-w-3xl text-center">
            <span className="BTS-pill">Stations</span>
            <h2 className="mt-6 text-3xl font-bold tracking-tight text-foreground md:text-4xl">
              London station transfers
            </h2>
            <div className="BTS-divider mx-auto mt-6 w-24" />
          </div>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {stations.map((station) => (
              <article key={station.name} className="BTS-vehicle-card group">
                <div className="BTS-vehicle-media relative h-32">
                  <img src={station.image} alt={station.name} className="h-full w-full object-cover" />
                </div>
                <div className="space-y-2 p-4">
                  <h3 className="text-sm font-semibold tracking-tight text-foreground">{station.name}</h3>
                  <p className="text-xs leading-relaxed text-muted-foreground">{station.desc}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="BTS-section-charcoal relative py-24 md:py-32">
        <div className="container mx-auto max-w-3xl px-4">
          <div className="mb-12 text-center">
            <span className="BTS-pill">FAQs</span>
            <h2 className="mt-6 text-3xl font-bold tracking-tight text-foreground md:text-4xl">
              Frequently asked questions
            </h2>
            <div className="BTS-divider mx-auto mt-6 w-24" />
          </div>
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((item, i) => (
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
