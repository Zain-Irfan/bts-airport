import { Phone, ShieldCheck, Star } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { FullFooterSection } from "@/components/FullFooterSection";
import { HomeBookingForm } from "@/components/forms/HomeBookingForm";
import { SiteTopHeader } from "@/components/layout/SiteTopHeader";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const hotels = [
  { name: "The Savoy Hotel", image: "/airport_1.jpg" },
  { name: "Millennium & Copthorne", image: "/airport_2.jpg" },
  { name: "Park Plaza Westminster", image: "/airport_3.jpg" },
  { name: "Royal Garden Hotel", image: "/airport_4.jpg" },
  { name: "Millennium Mayfair", image: "/airport_5.jpg" },
  { name: "Kensington Hotel", image: "/airport_6.jpg" },
  { name: "Claridge's", image: "/perfect-taxi.jpg" },
  { name: "The Cumberland", image: "/fleet.jpg" },
  { name: "The Savoy Taxi", image: "/app-mockup.jpg" },
  { name: "The Dorchester", image: "/airport_2.jpg" },
];

const faqs = [
  {
    q: "Does UKride provide hotel transfers across London?",
    a: "Yes — fixed-fare hotel pickups and drop-offs across central and greater London.",
  },
  {
    q: "Can I book a transfer both to and from a hotel and airport?",
    a: "Yes — single or return airport↔hotel transfers at a guaranteed fare.",
  },
  {
    q: "Are UKride hotel transfers on fixed fare?",
    a: "Yes. Your quote is locked at booking — taxes, tolls and parking included.",
  },
  {
    q: "How do I book a hotel transfer with UKride?",
    a: "Enter pickup hotel and destination, choose your vehicle, and confirm. We handle the rest.",
  },
  {
    q: "Do UKride transfers run 24/7 from hotels?",
    a: "Yes — 24/7 service for late-night arrivals and early-morning departures.",
  },
  {
    q: "What vehicle options are available for hotel transfer?",
    a: "Saloon, Estate, Executive, MPV, 8-Seater and Chauffeur classes.",
  },
  {
    q: "Does UKride offer meet and greet service at hotels?",
    a: "Yes — meet-and-greet with name board on request.",
  },
  {
    q: "Can I book group transfer from my hotel location?",
    a: "Yes — 8-seater and multi-vehicle group transfers for any London hotel.",
  },
  {
    q: "Do UKride hotel transfers cover tourist attractions and shopping areas?",
    a: "Yes — hourly chauffeur hire is available for shopping, dining and sightseeing routes.",
  },
  {
    q: "Why should I choose UKride for London hotel transfers?",
    a: "Premium fleet, executive drivers, fixed fares, monitored journeys, and 24/7 concierge support.",
  },
];

export default function LondonHotelTransfersPage() {
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

      {/* Hero */}
      <section className="ukride-hero-ambient ukride-luxury-section-1 ukride-grid-bg relative overflow-hidden py-20 lg:py-28">
        <div className="absolute inset-0 z-0 overflow-hidden">
          <img
            src="/hero-bg.jpg"
            alt=""
            aria-hidden
            className="ukride-media-cinematic absolute inset-0 h-full w-full object-cover opacity-[0.22] mix-blend-overlay"
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
              <span className="ukride-pill">Hotel transfers</span>
              <h1 className="text-4xl font-bold tracking-tight text-[#F8F8F8] sm:text-5xl">
                Seamless hotel transfers across London
              </h1>
              <p className="max-w-xl text-[15px] leading-relaxed text-[#CFCFCF]">
                Hotel-to-airport, airport-to-hotel, or hotel-to-anywhere — book
                a premium fixed-fare transfer in minutes.
              </p>
              <div className="flex flex-col gap-3 text-sm text-[#C0C0C0] sm:flex-row sm:items-center">
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  +44 7700 1409 00
                </div>
                <div className="hidden h-4 w-px bg-[rgba(192,192,192,0.22)] sm:block" />
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

      {/* Hotels grid */}
      <section className="ukride-section-charcoal relative py-20 md:py-28">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl text-center">
            <span className="ukride-pill">London hotels</span>
            <h2 className="mt-6 text-3xl font-bold tracking-tight text-[#F8F8F8] md:text-4xl">
              Choose your hotel for seamless transfers
            </h2>
            <div className="ukride-divider mx-auto mt-6 w-24" />
            <p className="mt-6 text-[15px] leading-relaxed text-[#CFCFCF]">
              From Heathrow to Gatwick, Luton, Stansted, and London City — we
              handle pickup, route planning, and on-time arrivals for every
              journey.
            </p>
          </div>

          <div className="mx-auto mt-12 grid max-w-6xl grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-5">
            {hotels.map((hotel) => (
              <article key={hotel.name} className="ukride-vehicle-card group">
                <div className="ukride-vehicle-media relative aspect-[16/9]">
                  <img
                    src={hotel.image}
                    alt={hotel.name}
                    className="h-full w-full object-cover"
                  />
                </div>
                <p className="px-3 py-3 text-center text-xs font-semibold tracking-tight text-[#E5E7EB]">
                  {hotel.name}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="ukride-section-onyx relative py-24 md:py-32">
        <div className="container mx-auto max-w-3xl px-4">
          <div className="mb-12 text-center">
            <span className="ukride-pill">FAQs</span>
            <h2 className="mt-6 text-3xl font-bold tracking-tight text-[#F8F8F8] md:text-4xl">
              Frequently asked questions
            </h2>
            <div className="ukride-divider mx-auto mt-6 w-24" />
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
