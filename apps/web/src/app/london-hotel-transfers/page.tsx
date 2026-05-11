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
  { name: "Savoy Hotel Transfer", image: "/airport_1.jpg" },
  { name: "Millennium & Copthorne", image: "/airport_2.jpg" },
  { name: "Park Plaza Westminster", image: "/airport_3.jpg" },
  { name: "Royal Garden Hotel Transfer", image: "/airport_4.jpg" },
  { name: "Millennium Mayfair Hotel", image: "/airport_5.jpg" },
  { name: "Kensington Hotel Transfer", image: "/airport_6.jpg" },
  { name: "Claridge's Hotel Transfer", image: "/perfect-taxi.jpg" },
  { name: "The Cumberland Hotel", image: "/fleet.jpg" },
  { name: "The Savoy Taxi Service", image: "/app-mockup.jpg" },
  { name: "The Dorchester Transfer", image: "/airport_2.jpg" },
];

const faqs = [
  "Does UKride provide hotel transfers across London?",
  "Can I book a transfer both to and from a hotel and airport?",
  "Are UKride hotel transfers on fixed fare?",
  "How do I book a hotel transfer with UKride?",
  "Do UKride transfers run 24/7 from hotels?",
  "What vehicle options are available for hotel transfer?",
  "Does UKride offer meet and greet service at hotels?",
  "Can I book group transfer from my hotel location?",
  "Do UKride hotel transfers cover tourist attractions and shopping areas?",
  "Why should I choose UKride for London hotel transfers?",
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

      <section className="relative bg-primary py-16 text-primary-foreground lg:py-20">
        <div className="absolute inset-0 overflow-hidden bg-primary">
          <img
            src="/hero-bg.jpg"
            alt="London hotel transfers"
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
                Seamless Hotel Transfers
                <br />
                Across London
              </h1>
              <p className="max-w-xl text-lg text-primary-foreground/80">
                Need hotel to airport or airport to hotel transfer? Book your ride in minutes with
                fixed fares and professional drivers.
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
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Choose Your Hotel for Seamless Transfers
            </h2>
            <p className="mt-5 text-base leading-7 text-muted-foreground">
              Choose your London hotel and let us handle pickup, route planning, and on-time
              airport drop-offs for every journey.
            </p>
            <p className="mt-2 text-base leading-7 text-muted-foreground">
              From Heathrow to Gatwick, Luton, Stansted, and London City, our team provides smooth
              travel with fixed fares and support.
            </p>
          </div>

          <div className="mx-auto mt-12 grid max-w-6xl grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-5">
            {hotels.map((hotel) => (
              <article
                key={hotel.name}
                className="group overflow-hidden rounded-lg border border-white/[0.08] bg-card shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md"
              >
                <div className="overflow-hidden">
                  <img
                    src={hotel.image}
                    alt={hotel.name}
                    className="aspect-[16/7] w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <p className="px-2 py-2 text-center text-xs font-medium leading-5 text-foreground/85">
                  {hotel.name}
                </p>
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
                  UKride provides professional hotel transfer support with fixed fares, trained
                  drivers, and 24/7 service across London.
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

