import Link from "next/link";
import {
  BadgeDollarSign,
  Briefcase,
  CarFront,
  Clock3,
  Phone,
  Plane,
  ShieldCheck,
  Star,
  ThumbsUp,
  Users,
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

const featureRow = [
  {
    title: "Get the Best Quotes",
    desc: "Compare routes and lock a fair fixed fare before you travel.",
    icon: BadgeDollarSign,
  },
  {
    title: "No Hidden Charges",
    desc: "Transparent pricing with a clear breakdown at booking.",
    icon: ShieldCheck,
  },
  {
    title: "Professional Drivers",
    desc: "Licensed, experienced drivers for every journey.",
    icon: Users,
  },
  {
    title: "24/7 Support",
    desc: "Round-the-clock help for bookings and trip updates.",
    icon: Clock3,
  },
];

const fleet = [
  { name: "Saloon", pax: 4, hand: 1, lug: 2, img: "/images/saloon.jpeg" },
  { name: "MPV", pax: 6, hand: 3, lug: 4, img: "/images/vehicle-vclass-8seater.jpg" },
  { name: "Executive", pax: 4, hand: 1, lug: 1, img: "/images/vehicle-sclass-new.jpg" },
  { name: "8 Seater", pax: 8, hand: 4, lug: 6, img: "/images/vehicle-transit.jpg" },
];

const valueProps = [
  {
    title: "Punctuality Guaranteed",
    desc: "Intelligent dispatch and live tracking keep every pickup on time.",
    icon: Plane,
  },
  {
    title: "Why Pre-Book in Advance?",
    desc: "Lock in your fare and ride at a guaranteed fixed rate. No surprises.",
    icon: CarFront,
  },
  {
    title: "Why Choose Us",
    desc: "Licensed drivers, road-ready cars, and elevated service standards.",
    icon: ThumbsUp,
  },
  {
    title: "Transparent Pricing",
    desc: "Best rates inclusive of local taxes, tolls, parking, and VAT.",
    icon: BadgeDollarSign,
  },
];

const faqs = [
  {
    q: "How is the taxi fare calculated?",
    a: "Fares combine route distance, vehicle class, time of travel, and any premium add-ons (meet & greet, child seats, return journey). The quote you confirm is the fare you pay.",
  },
  {
    q: "Are there any hidden fees in the quoted price?",
    a: "No. London Airport Taxi Services quotes include taxes, road tolls, parking on standard airport pickups, and VAT. Optional add-ons are shown clearly before confirmation.",
  },
  {
    q: "Can I get a quote for airport transfers?",
    a: "Yes — enter your terminal and destination and we'll show a fixed fare across all London Airport Taxi Services airports.",
  },
  {
    q: "How far in advance should I book?",
    a: "We recommend at least 6–12 hours in advance for best availability and pricing.",
  },
  {
    q: "What vehicle types are available?",
    a: "Saloon, Estate, Executive, MPV, 8-Seater and Chauffeur classes are available across all London journeys.",
  },
  {
    q: "Can I change my booking after getting a quote?",
    a: "Yes — bookings can be amended up to the cut-off window in our terms. Some changes may adjust the fare.",
  },
  {
    q: "Do you offer return journey pricing?",
    a: "Yes — toggle the return option in the booking form for a combined return fare.",
  },
  {
    q: "What payment methods are accepted?",
    a: "All major cards, Apple Pay, Google Pay, and corporate account billing.",
  },
  {
    q: "How do I contact support about my quote?",
    a: "Reach our support team 24/7 via phone, WhatsApp, or email — details are in the site footer.",
  },
  {
    q: "Is the fare fixed after I book?",
    a: "Yes. Once your booking is confirmed, your fare is locked. Optional changes can adjust the final amount.",
  },
];

export default async function TaxiFareCalculatorPage() {
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
        <div className="container mx-auto px-4">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center rounded-full border border-[rgba(192,192,192,0.22)] bg-[rgba(45,45,51,0.55)] px-3 py-1 text-sm shadow-[0_4px_18px_-6px_rgba(0,0,0,0.4)] backdrop-blur">
                <Star className="mr-2 h-4 w-4 fill-[#C0C0C0] text-[#C0C0C0]" />
                <span className="font-semibold text-[#F8F8F8]">4.9</span>
                <span className="mx-2 text-[#C0C0C0]/60">|</span>
                <span className="text-[#CFCFCF]">1538+ Google reviews</span>
              </div>
              <span className="BTS-pill">Fare calculator</span>
              <h1 className="text-4xl font-bold tracking-tight text-[#F8F8F8] sm:text-5xl">
                Smarter quotes for every London journey
              </h1>
              <p className="max-w-xl text-[15px] leading-relaxed text-[#CFCFCF]">
                Enter your route for an instant fixed-fare estimate. Premium
                vehicles, transparent pricing, professional drivers.
              </p>
              <div className="flex items-center gap-2 pt-1 text-sm text-[#C0C0C0]">
                <Phone className="h-4 w-4" />
                {phone}
              </div>
            </div>
            <div id="quote">
              <HomeBookingForm />
            </div>
          </div>
        </div>
      </section>

      {/* Feature row */}
      <section className="BTS-section-charcoal relative py-20 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {featureRow.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className="flex flex-col items-center text-center">
                  <div className="BTS-icon-halo mb-4 h-14 w-14">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-base font-semibold text-[#F8F8F8]">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-[#CFCFCF]">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Fleet */}
      <section className="BTS-section-onyx relative py-20 md:py-28">
        <div className="container mx-auto px-4">
          <div className="mx-auto mb-12 max-w-3xl text-center">
            <span className="BTS-pill">Choose a vehicle</span>
            <h2 className="mt-6 text-3xl font-bold tracking-tight text-[#F8F8F8] md:text-4xl">
              Select the right car for your group
            </h2>
            <div className="BTS-divider mx-auto mt-6 w-24" />
            <p className="mt-6 text-[15px] leading-relaxed text-[#CFCFCF]">
              Every option shows passenger and luggage capacity at a glance.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {fleet.map((v) => (
              <div key={v.name} className="BTS-vehicle-card group">
                <div className="BTS-vehicle-media relative h-40">
                  <img src={v.img} alt={v.name} className="h-full w-full object-cover" />
                </div>
                <div className="space-y-3 p-5">
                  <h3 className="text-lg font-semibold tracking-tight text-[#F8F8F8]">{v.name}</h3>
                  <div className="flex gap-4 text-sm text-[#A5A7AA]">
                    <span className="flex items-center gap-1.5">
                      <Users className="h-4 w-4" /> {v.pax}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Briefcase className="h-4 w-4" /> {v.hand}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Briefcase className="h-4 w-4" /> {v.lug}
                    </span>
                  </div>
                  <Button asChild className="w-full cursor-pointer">
                    <Link href="/#quote" className="cursor-pointer">
                      Book Now
                    </Link>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Side image story 1 */}
      <section className="BTS-section-charcoal relative py-20 md:py-24">
        <div className="container mx-auto grid items-center gap-12 px-4 md:grid-cols-2">
          <div className="BTS-purple-glow relative h-[320px] overflow-hidden rounded-2xl">
            <img
              src="/images/luxury-car-interior.jpg"
              alt="Compare taxi fares"
              className="h-full w-full object-cover"
            />
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,transparent_55%,rgba(13,13,15,0.85)_100%)]" />
          </div>
          <div className="space-y-5">
            <span className="BTS-pill">Compare &amp; save</span>
            <h2 className="text-3xl font-bold tracking-tight text-[#F8F8F8]">Compare taxi fares &amp; save money</h2>
            <p className="text-[15px] leading-relaxed text-[#CFCFCF]">
              Use our calculator to understand your route cost before you
              commit. London Airport Taxi Services helps you plan smarter with upfront pricing
              tailored to your pickup, drop-off, and vehicle choice.
            </p>
          </div>
        </div>
      </section>

      {/* Side image story 2 */}
      <section className="BTS-section-onyx relative py-24 md:py-32">
        <div className="container mx-auto grid items-center gap-12 px-4 md:grid-cols-2">
          <div className="order-2 space-y-5 md:order-1">
            <span className="BTS-pill">No surprises</span>
            <h2 className="text-3xl font-bold tracking-tight text-[#F8F8F8]">Transparent pricing</h2>
            <p className="text-[15px] leading-relaxed text-[#CFCFCF]">
              Your quote reflects the journey you book. We focus on clarity so
              you always know what you&apos;re paying for, from airport runs to
              cross-town trips.
            </p>
          </div>
          <div className="BTS-purple-glow relative order-1 h-[320px] overflow-hidden rounded-2xl md:order-2">
            <img
              src="/images/heathrow-exterior.jpg"
              alt="Airport transfer"
              className="h-full w-full object-cover"
            />
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,transparent_55%,rgba(13,13,15,0.85)_100%)]" />
          </div>
        </div>
      </section>

      {/* Side image story 3 */}
      <section className="BTS-section-charcoal relative py-20 md:py-24">
        <div className="container mx-auto grid items-center gap-12 px-4 md:grid-cols-2">
          <div className="BTS-purple-glow relative h-[320px] overflow-hidden rounded-2xl">
            <img
              src="/app-mockup.jpg"
              alt="Book in seconds"
              className="h-full w-full object-cover"
            />
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,transparent_55%,rgba(13,13,15,0.85)_100%)]" />
          </div>
          <div className="space-y-5">
            <span className="BTS-pill">Fast booking</span>
            <h2 className="text-3xl font-bold tracking-tight text-[#F8F8F8]">Book your ride in seconds</h2>
            <p className="text-[15px] leading-relaxed text-[#CFCFCF]">
              Once you&apos;re happy with the fare, confirm your details and
              lock your driver. Fast, simple, and built for busy schedules.
            </p>
          </div>
        </div>
      </section>

      {/* Value props */}
      <section className="BTS-section-onyx relative py-20 md:py-28">
        <div className="container mx-auto px-4">
          <div className="mx-auto mb-12 max-w-3xl text-center">
            <span className="BTS-pill">Why London Airport Taxi Services</span>
            <h2 className="mt-6 text-3xl font-bold tracking-tight text-[#F8F8F8] md:text-4xl">
              Built around your London journey
            </h2>
            <div className="BTS-divider mx-auto mt-6 w-24" />
          </div>
          <div className="mx-auto grid max-w-5xl gap-x-14 gap-y-12 md:grid-cols-2">
            {valueProps.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className="text-center">
                  <div className="BTS-icon-halo mx-auto mb-5 h-14 w-14">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-semibold text-[#F8F8F8]">{item.title}</h3>
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
      <section className="BTS-section-charcoal relative py-24 md:py-32">
        <div className="container mx-auto max-w-3xl px-4">
          <div className="mb-12 text-center">
            <span className="BTS-pill">FAQs</span>
            <h2 className="mt-6 text-3xl font-bold tracking-tight text-[#F8F8F8] md:text-4xl">
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
