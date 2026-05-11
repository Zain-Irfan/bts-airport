import { CheckCircle2 } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { FullFooterSection } from "@/components/FullFooterSection";
import { SiteTopHeader } from "@/components/layout/SiteTopHeader";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const featureItems = [
  "Book your taxi in seconds with easy pickup and dropoff setup.",
  "Get transparent fixed fares before confirming your ride.",
  "Track your driver in real time with live journey updates.",
  "Manage upcoming and past bookings in one app dashboard.",
  "Save frequent destinations for faster repeat bookings.",
  "Receive instant alerts for driver arrival and trip status.",
];

const howItWorks = [
  "Download the UKride Taxi App from your preferred app store.",
  "Create your account and verify your mobile number securely.",
  "Enter pickup and destination details to get an instant quote.",
  "Choose your vehicle type and confirm the booking.",
  "Track your assigned driver and enjoy a smooth journey.",
];

const faqs = [
  "What is the UKride Taxi App?",
  "Is there any booking fee while using the UKride app?",
  "How do I book taxi using the UKride app?",
  "Can I get fare details in advance?",
  "Does UKride offer airport transfers?",
  "Can I manage bookings inside the app?",
  "Is the UKride app available across all London?",
  "Is customer support available in the app?",
];

export default function TaxiBookingAppPage() {
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
            alt="Taxi booking app"
            className="absolute inset-0 h-full w-full object-cover opacity-30 mix-blend-overlay"
          />
          <div className="absolute inset-0 z-10 bg-gradient-to-b from-primary/80 to-primary" />
        </div>
        <div className="container relative z-20 mx-auto px-4">
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <div className="space-y-5">
              <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
                Travel Smarter with
                <br />
                Trusted Taxi App
              </h1>
              <p className="max-w-xl text-primary-foreground/80">
                Book rides, track drivers live, and manage your journeys in one place with the
                UKride Taxi Booking App.
              </p>
              <div className="flex flex-wrap gap-3 pt-2">
                <button className="rounded-md bg-foreground/10 px-4 py-2 text-sm font-semibold">App Store</button>
                <button className="rounded-md bg-foreground/10 px-4 py-2 text-sm font-semibold">Google Play</button>
              </div>
            </div>
            <div className="flex justify-center lg:justify-end">
              <img
                src="/app-mockup.jpg"
                alt="UKride app preview"
                className="h-[270px] w-[180px] rounded-3xl object-cover shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-secondary py-20 md:py-28">
        <div className="container mx-auto grid items-center gap-12 px-4 md:grid-cols-2">
          <div className="flex justify-center">
            <img
              src="/app-mockup.jpg"
              alt="Taxi booking app features"
              className="h-[260px] w-[180px] rounded-3xl object-cover shadow-xl"
            />
          </div>
          <div className="space-y-5">
            <h2 className="text-3xl font-bold text-foreground">Taxi Booking App Features</h2>
            <ul className="space-y-3">
              {featureItems.map((item) => (
                <li key={item} className="flex items-start gap-3 text-muted-foreground">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-highlight" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="bg-[#f4f4f7] py-16">
        <div className="container mx-auto grid items-center gap-12 px-4 md:grid-cols-2">
          <div className="space-y-5">
            <h2 className="text-3xl font-bold text-foreground">How the UKride Taxi App Works</h2>
            <ol className="space-y-3 text-muted-foreground">
              {howItWorks.map((item, index) => (
                <li key={item}>
                  <span className="font-semibold text-foreground">{`Step ${index + 1}: `}</span>
                  {item}
                </li>
              ))}
            </ol>
          </div>
          <div className="flex justify-center">
            <img
              src="/app-mockup.jpg"
              alt="How app works"
              className="h-[260px] w-[180px] rounded-3xl object-cover shadow-xl"
            />
          </div>
        </div>
      </section>

      <section className="bg-secondary py-20 md:py-28">
        <div className="container mx-auto max-w-4xl px-4 text-center">
          <h2 className="text-3xl font-bold text-foreground">Your trusted Gatwick Airport Taxi Service</h2>
          <p className="mt-4 text-muted-foreground">
            The UKride Taxi App gives you a convenient and secure way to schedule rides across
            London, including airport transfers, station pickups, and city journeys.
          </p>
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
                  UKride app helps you book, track, and manage rides quickly with fixed fares and
                  reliable support.
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

