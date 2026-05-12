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

const stations = [
  { name: "Euston Station", image: "/airport_1.jpg", desc: "Direct station pickups with smooth city connections." },
  { name: "King's Cross Station", image: "/airport_2.jpg", desc: "Fast transfers for rail arrivals and departures." },
  { name: "Victoria Station", image: "/airport_3.jpg", desc: "Private rides from Victoria to all London zones." },
  { name: "Paddington Station", image: "/airport_4.jpg", desc: "Reliable rides to hotels, airports, and offices." },
  { name: "Liverpool Street Station", image: "/airport_5.jpg", desc: "Business-ready transfers with fixed rates." },
  { name: "London Bridge", image: "/airport_6.jpg", desc: "Book 24/7 station taxi service with UKride." },
  { name: "St Pancras International", image: "/perfect-taxi.jpg", desc: "Seamless Eurostar and city transfer support." },
  { name: "Waterloo Station", image: "/fleet.jpg", desc: "Efficient pickups around Waterloo and South Bank." },
];

const faqs = [
  {
    q: "Can I book taxis to major train terminals?",
    a: "Yes — UKride covers Euston, King's Cross, St Pancras, Victoria, Paddington, Liverpool Street, London Bridge, Waterloo and more, 24/7.",
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

export default function LondonStationTaxiPage() {
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
              <div className="inline-flex items-center rounded-full border border-[rgba(192,192,192,0.22)] bg-[rgba(75,0,130,0.18)] px-3 py-1 text-sm shadow-[0_4px_18px_-6px_rgba(75,0,130,0.55)] backdrop-blur">
                <Star className="mr-2 h-4 w-4 fill-[#C0C0C0] text-[#C0C0C0]" />
                <span className="font-semibold text-[#F8F8F8]">4.9</span>
                <span className="mx-2 text-[#C0C0C0]/60">|</span>
                <span className="text-[#CFCFCF]">1538+ Google reviews</span>
              </div>
              <span className="ukride-pill">Station transfers</span>
              <h1 className="text-4xl font-bold tracking-tight text-[#F8F8F8] sm:text-5xl">
                Your ride from any London station, made easy
              </h1>
              <p className="max-w-xl text-[15px] leading-relaxed text-[#CFCFCF]">
                Fixed-fare station pickup across every major London terminal.
                Fast arrivals, professional drivers, premium vehicles.
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

      {/* Trust band */}
      <section className="ukride-section-charcoal relative py-20 md:py-24">
        <div className="container mx-auto max-w-4xl px-4 text-center">
          <span className="ukride-pill">Trusted across London</span>
          <h2 className="mt-6 text-3xl font-bold tracking-tight text-[#F8F8F8] md:text-4xl">
            Premium taxis from every major London station
          </h2>
          <div className="ukride-divider mx-auto mt-6 w-24" />
          <p className="mt-6 text-[15px] leading-relaxed text-[#CFCFCF]">
            We make station travel simple with punctual pickups, fixed fares,
            and professional drivers — to airports, hotels, offices, or home.
          </p>
        </div>
      </section>

      {/* Stations grid */}
      <section className="ukride-section-onyx relative py-20 md:py-28">
        <div className="container mx-auto px-4">
          <div className="mx-auto mb-12 max-w-3xl text-center">
            <span className="ukride-pill">Stations</span>
            <h2 className="mt-6 text-3xl font-bold tracking-tight text-[#F8F8F8] md:text-4xl">
              London station transfers
            </h2>
            <div className="ukride-divider mx-auto mt-6 w-24" />
          </div>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {stations.map((station) => (
              <article key={station.name} className="ukride-vehicle-card group">
                <div className="ukride-vehicle-media relative h-32">
                  <img src={station.image} alt={station.name} className="h-full w-full object-cover" />
                </div>
                <div className="space-y-2 p-4">
                  <h3 className="text-sm font-semibold tracking-tight text-[#F8F8F8]">{station.name}</h3>
                  <p className="text-xs leading-relaxed text-[#A5A7AA]">{station.desc}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="ukride-section-charcoal relative py-24 md:py-32">
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
