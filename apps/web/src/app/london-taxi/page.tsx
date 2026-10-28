import type { Metadata } from "next";
import Link from "next/link";
import { Phone, ShieldCheck, Star, MapPin } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { FullFooterSection } from "@/components/FullFooterSection";
import { HomeBookingForm } from "@/components/forms/HomeBookingForm";
import { SiteTopHeader } from "@/components/layout/SiteTopHeader";
import { getSiteSettings } from "@/lib/site-settings";

export const metadata: Metadata = {
  title: "London Taxi Services",
  description: "Pre-booked London taxis at fixed prices for airport runs, business travel and city journeys, with licensed drivers 24/7.",
};

const londonAreas = [
  "Acton", "Aldgate", "Angel", "Balham", "Bank", "Barnet", "Battersea", "Bayswater",
  "Belgravia", "Bermondsey", "Bethnal Green", "Bloomsbury", "Brent", "Brixton",
  "Camberwell", "Camden", "Canary Wharf", "Charing Cross", "Chelsea", "Chiswick",
  "Clapham", "Covent Garden", "Croydon", "Dalston", "Docklands", "Ealing", "Earls Court",
  "Edgware", "Elephant & Castle", "Enfield", "Euston", "Farringdon",
];

const gridImages = [
  "/images/heathrow-exterior.jpg",
  "/images/gatwick-sign.jpg",
  "/images/london-taxi-sightseeing.jpg",
  "/images/luxury-car-interior.jpg",
  "/images/executive-passenger.jpg",
  "/images/heathrow-mpv-family.jpg",
  "/images/hotel-chauffeur.jpg",
  "/images/mpv-airport-boarding.jpg",
];

export default async function LondonTaxiPage() {
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
              <span className="BTS-pill">London taxi</span>
              <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
                London Taxi Services
                {" "}<br />
                <span className="text-foreground">
                  for your journey
                </span>
              </h1>
              <p className="max-w-xl text-[15px] leading-relaxed text-body">
                Professional London taxi transfers — any pickup, any
                destination. Fixed fares, quality vehicles, trusted drivers.
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

      {/* Areas */}
      <section className="BTS-section-charcoal relative py-20 md:py-28">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <span className="BTS-pill">London areas</span>
            <h2 className="mt-6 text-3xl font-bold tracking-tight text-foreground md:text-4xl">
              Choose your car from any London area
            </h2>
            <div className="BTS-divider mx-auto mt-6 w-24" />
            <p className="mt-6 text-[15px] leading-relaxed text-body">
              MRM Executive Voyage covers every London neighbourhood with safe, reliable
              transfers for station journeys, hotel pickups, airport routes,
              and business travel.
            </p>
          </div>

          <div className="mx-auto mt-14 grid max-w-6xl grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {londonAreas.map((area, index) => (
              <Link
                key={area}
                href="/taxi-quote"
                className="BTS-vehicle-card group block"
              >
                <div className="BTS-vehicle-media relative h-28">
                  <img
                    src={gridImages[index % gridImages.length]}
                    alt={`${area} taxi`}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="flex items-center justify-between gap-2 px-4 py-3">
                  <span className="flex items-center gap-2 text-sm font-semibold text-foreground">
                    <MapPin className="h-3.5 w-3.5 text-muted-foreground" />
                    {area}
                  </span>
                  <span className="text-muted-foreground opacity-60 transition group-hover:opacity-100">
                    →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <FullFooterSection />
    </div>
  );
}
