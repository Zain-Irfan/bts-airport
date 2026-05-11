import { Phone, ShieldCheck, Star } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { FullFooterSection } from "@/components/FullFooterSection";
import { HomeBookingForm } from "@/components/forms/HomeBookingForm";
import { SiteTopHeader } from "@/components/layout/SiteTopHeader";

const londonAreas = [
  "Acton", "Aldgate", "Angel", "Balham", "Bank", "Barnet", "Battersea", "Bayswater",
  "Belgravia", "Bermondsey", "Bethnal Green", "Bloomsbury", "Brent", "Brixton",
  "Camberwell", "Camden", "Canary Wharf", "Charing Cross", "Chelsea", "Chiswick",
  "Clapham", "Covent Garden", "Croydon", "Dalston", "Docklands", "Ealing", "Earls Court",
  "Edgware", "Elephant & Castle", "Enfield", "Euston", "Farringdon", "Finsbury Park",
  "Fulham", "Greenwich", "Hackney", "Hammersmith", "Hampstead", "Harrow", "Heathrow",
  "Hendon", "Highbury", "Highgate", "Holborn", "Holland Park", "Hounslow", "Islington",
  "Kensington", "Kentish Town", "King's Cross", "Lambeth", "Lewisham", "Leyton", "Liverpool Street",
  "London Bridge", "Maida Vale", "Marble Arch", "Marylebone", "Mayfair", "Mile End",
  "Notting Hill", "Paddington", "Peckham", "Pimlico", "Putney", "Richmond", "Shoreditch",
  "Soho", "South Bank", "Southall", "Southwark", "St John's Wood", "Stamford Hill",
  "Stratford", "Tooting", "Tower Bridge", "Victoria", "Walthamstow", "Waterloo", "Wembley",
  "Westminster", "Whitechapel", "Wimbledon", "Wood Green", "Woolwich",
];

const gridImages = [
  "/airport_1.jpg",
  "/airport_2.jpg",
  "/airport_3.jpg",
  "/airport_4.jpg",
  "/airport_5.jpg",
  "/airport_6.jpg",
  "/perfect-taxi.jpg",
  "/fleet.jpg",
];

export default function LondonTaxiPage() {
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
            alt="London taxi services"
            className="absolute inset-0 h-full w-full object-cover opacity-25 mix-blend-overlay"
          />
          <div className="absolute inset-0 z-10 bg-gradient-to-b from-primary/80 to-primary" />
        </div>
        <div className="container relative z-20 mx-auto px-4">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center rounded-full border border-primary-foreground/20 bg-primary-foreground/10 px-3 py-1 text-sm">
                <Star className="mr-2 h-4 w-4 fill-accent text-accent" />
                <span className="font-semibold">4.9</span>
                <span className="mx-2 text-primary-foreground/50">|</span>
                <span>1538+ Google Reviews</span>
              </div>
              <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
                London Taxi Services
                <br />
                For Your Journey
              </h1>
              <p className="max-w-xl text-lg text-primary-foreground/80">
                Professional London taxi transfers from any pickup to any destination with fixed
                fares, quality vehicles, and trusted drivers.
              </p>
              <div className="flex flex-col gap-3 text-sm sm:flex-row sm:items-center">
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-accent" />
                  +44 7700 1409 00
                </div>
                <div className="hidden h-4 w-px bg-primary-foreground/30 sm:block" />
                <div className="flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4 text-accent" />
                  24/7 monitored journeys
                </div>
              </div>
            </div>
            <HomeBookingForm />
          </div>
        </div>
      </section>

      <section className="bg-[#f8f8fb] py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold text-foreground">Choose Your Car from and within UK</h2>
            <p className="mt-5 text-base leading-7 text-muted-foreground">
              Book your taxi from all London areas with UKride. We provide safe and reliable
              transfers for station journeys, hotel pickups, airport routes, and business travel.
            </p>
            <p className="mt-3 text-base leading-7 text-muted-foreground">
              Select your area below and reserve a trusted taxi in minutes with fixed pricing and
              professional support.
            </p>
          </div>

          <div className="mx-auto mt-14 grid max-w-6xl grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {londonAreas.slice(0, 32).map((area, index) => (
              <article
                key={area}
                className="group overflow-hidden rounded-xl border border-white/[0.08] bg-card shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md"
              >
                <img
                  src={gridImages[index % gridImages.length]}
                  alt={`${area} taxi`}
                  className="h-28 w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <p className="px-3 py-3 text-center text-sm font-semibold text-foreground/90">
                  {area}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <FullFooterSection />
    </div>
  );
}


