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
  { name: "Bridge Station", image: "/airport_6.jpg", desc: "Book 24/7 station taxi service with UKride." },
  { name: "St Pancras Station", image: "/perfect-taxi.jpg", desc: "Seamless Eurostar and city transfer support." },
  { name: "Waterloo Station", image: "/fleet.jpg", desc: "Efficient pickups around Waterloo and South Bank." },
];

const faqs = [
  "Can I book taxis to major train terminals?",
  "Do you provide transfers from station to home/hotel?",
  "Are your London station taxis available 24/7?",
  "Do you offer airport transfers direct from station?",
  "How much does a London station taxi transfer cost?",
  "Can I book a larger vehicle for family or group travel?",
  "Do you provide child seats in your taxis?",
  "What types of vehicles do you provide?",
  "What payment methods do you accept?",
  "How can I find my driver at the station?",
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

      <section className="relative bg-primary py-16 text-primary-foreground lg:py-20">
        <div className="absolute inset-0 overflow-hidden bg-primary">
          <img
            src="/hero-bg.jpg"
            alt="London station taxi"
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
                Your Ride from Any
                <br />
                London Station, Made Easy
              </h1>
              <p className="max-w-xl text-lg text-primary-foreground/80">
                Need station pickup in London? We provide fixed-fare station taxi services with
                fast arrivals and professional drivers.
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

      <section className="bg-secondary py-20 md:py-28">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-foreground">Trusted Taxis from All Major London Stations</h2>
          <p className="mx-auto mt-4 max-w-4xl text-muted-foreground">
            We make station travel simple with punctual pickups, fixed fares, and professional
            drivers. Book your ride from major terminals and travel to airports, hotels, offices,
            and home destinations across London.
          </p>
        </div>
      </section>

      <section className="bg-black py-16 text-white">
        <div className="container mx-auto px-4">
          <h2 className="mb-8 text-center text-2xl font-bold sm:text-3xl">London Station Transfers</h2>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {stations.map((station) => (
              <article key={station.name} className="overflow-hidden rounded-lg border border-white/10 bg-white/5">
                <img src={station.image} alt={station.name} className="h-24 w-full object-cover" />
                <div className="space-y-1 p-3">
                  <h3 className="text-sm font-semibold text-white">{station.name}</h3>
                  <p className="text-xs leading-5 text-white/70">{station.desc}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-secondary py-24 md:py-32">
        <div className="container mx-auto max-w-4xl px-4">
          <div className="mb-10 text-center">
            <h2 className="text-3xl font-bold text-foreground">Frequently Asked Questions</h2>
          </div>
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={faq} value={`faq-${index}`}>
                <AccordionTrigger className="text-left text-lg font-medium text-foreground">
                  {faq}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  UKride offers fixed-fare London station taxi transfers with trusted drivers,
                  clean vehicles, and support for all major station routes.
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

