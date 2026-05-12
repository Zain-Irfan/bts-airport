import { CheckCircle2, Apple } from "lucide-react";
import { FaWhatsapp, FaGooglePlay } from "react-icons/fa";
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
  {
    q: "What is the UKride Taxi App?",
    a: "A premium ride booking experience for pre-booked London taxis with live tracking, fixed fares and account-wide booking history.",
  },
  {
    q: "Is there any booking fee while using the UKride app?",
    a: "No booking fees are added when you reserve through the UKride app. The quoted price is the final fare.",
  },
  {
    q: "How do I book a taxi using the UKride app?",
    a: "Enter pickup and dropoff, choose your vehicle class, confirm your details, and pay securely in-app.",
  },
  {
    q: "Can I get fare details in advance?",
    a: "Yes — the app shows a transparent fixed quote before you confirm. No surge or hidden charges.",
  },
  {
    q: "Does UKride offer airport transfers?",
    a: "Yes — flight-monitored airport transfers across Heathrow, Gatwick, Luton, Stansted, City and Southend.",
  },
  {
    q: "Can I manage bookings inside the app?",
    a: "View, amend, or cancel any booking from your dashboard, and re-book past journeys with one tap.",
  },
  {
    q: "Is the UKride app available across all London?",
    a: "Yes — UKride covers all London zones plus major UK airport routes.",
  },
  {
    q: "Is customer support available in the app?",
    a: "24/7 support via in-app chat, phone, and WhatsApp.",
  },
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

      {/* Hero */}
      <section className="ukride-hero-ambient ukride-luxury-section-1 ukride-grid-bg relative overflow-hidden py-20 lg:py-28">
        <div className="container mx-auto px-4">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div className="space-y-6">
              <span className="ukride-pill">UKride app</span>
              <h1 className="text-4xl font-bold tracking-tight text-[#F8F8F8] sm:text-5xl">
                Travel smarter with the trusted UKride taxi app
              </h1>
              <p className="max-w-xl text-[15px] leading-relaxed text-[#CFCFCF]">
                Book rides, track drivers live, and manage your journeys in
                one place. Premium service, transparent fares, on every
                journey.
              </p>
              <div className="flex flex-wrap gap-4 pt-2">
                <a
                  href="#"
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-xl border border-[rgba(192,192,192,0.22)] bg-[linear-gradient(135deg,#5B0F9C_0%,#4B0082_55%,#3B0A57_100%)] px-6 text-sm font-semibold text-[#F8F8F8] shadow-[inset_0_1px_0_rgba(192,192,192,0.18),0_10px_28px_-10px_rgba(75,0,130,0.55)] transition hover:-translate-y-[1px]"
                >
                  <Apple className="h-4 w-4" />
                  App Store
                </a>
                <a
                  href="#"
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-xl border border-[rgba(192,192,192,0.22)] bg-[linear-gradient(180deg,#1A1A1D_0%,#0D0D0F_100%)] px-6 text-sm font-semibold text-[#F8F8F8] shadow-[inset_0_1px_0_rgba(192,192,192,0.12),0_6px_22px_-8px_rgba(0,0,0,0.6)] transition hover:-translate-y-[1px] hover:border-[rgba(192,192,192,0.36)]"
                >
                  <FaGooglePlay className="h-4 w-4" />
                  Google Play
                </a>
              </div>
            </div>
            <div className="relative flex justify-center">
              <div className="absolute top-1/2 left-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[rgba(45,45,51,0.6)] blur-3xl opacity-50"></div>
              <img
                src="/app-mockup.jpg"
                alt="UKride app preview"
                className="relative z-10 h-[420px] w-[230px] rounded-[2.5rem] border-[8px] border-[rgba(192,192,192,0.18)] object-cover shadow-[0_36px_88px_-28px_rgba(0,0,0,0.75),0_18px_52px_-12px_rgba(75,0,130,0.55)]"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="ukride-section-charcoal relative py-20 md:py-28">
        <div className="container mx-auto grid items-center gap-12 px-4 md:grid-cols-2">
          <div className="ukride-purple-glow relative h-[420px] overflow-hidden rounded-2xl">
            <img
              src="/app-mockup.jpg"
              alt="Taxi booking app features"
              className="h-full w-full object-cover"
            />
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,transparent_55%,rgba(13,13,15,0.85)_100%)]" />
          </div>
          <div className="space-y-6">
            <span className="ukride-pill">Features</span>
            <h2 className="text-3xl font-bold tracking-tight text-[#F8F8F8] md:text-4xl">
              Engineered for executive travel
            </h2>
            <ul className="space-y-3.5">
              {featureItems.map((item) => (
                <li key={item} className="flex items-start gap-3 text-[15px] leading-relaxed text-[#CFCFCF]">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-[#C0C0C0]" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="ukride-section-onyx relative py-20 md:py-28">
        <div className="container mx-auto grid items-center gap-12 px-4 md:grid-cols-2">
          <div className="space-y-6">
            <span className="ukride-pill">How it works</span>
            <h2 className="text-3xl font-bold tracking-tight text-[#F8F8F8] md:text-4xl">
              From download to door-to-door in 5 steps
            </h2>
            <ol className="space-y-4">
              {howItWorks.map((item, index) => (
                <li
                  key={item}
                  className="flex items-start gap-4 rounded-2xl border border-[rgba(192,192,192,0.1)] bg-[linear-gradient(180deg,rgba(26,26,29,0.5)_0%,rgba(13,13,15,0.7)_100%)] p-4"
                >
                  <span className="grid h-9 w-9 flex-shrink-0 place-items-center rounded-full border border-[rgba(192,192,192,0.18)] bg-[linear-gradient(135deg,rgba(75,0,130,0.32)_0%,rgba(43,18,56,0.4)_100%)] text-xs font-bold text-[#F8F8F8]">
                    {index + 1}
                  </span>
                  <p className="text-[15px] leading-relaxed text-[#CFCFCF]">{item}</p>
                </li>
              ))}
            </ol>
          </div>
          <div className="ukride-purple-glow relative h-[420px] overflow-hidden rounded-2xl">
            <img
              src="/app-mockup.jpg"
              alt="How the UKride app works"
              className="h-full w-full object-cover"
            />
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,transparent_55%,rgba(13,13,15,0.85)_100%)]" />
          </div>
        </div>
      </section>

      {/* Sub-section */}
      <section className="ukride-section-charcoal relative py-20 md:py-28">
        <div className="container mx-auto max-w-3xl px-4 text-center">
          <span className="ukride-pill">Always reliable</span>
          <h2 className="mt-6 text-3xl font-bold tracking-tight text-[#F8F8F8] md:text-4xl">
            One app for every London journey
          </h2>
          <div className="ukride-divider mx-auto mt-6 w-24" />
          <p className="mt-6 text-[15px] leading-relaxed text-[#CFCFCF]">
            The UKride app gives you a refined, secure way to schedule rides
            across London — airport transfers, station pickups, hotel runs,
            and corporate journeys, all in one polished experience.
          </p>
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
