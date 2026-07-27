import Link from "next/link";
import {
  BadgeDollarSign,
  CarFront,
  Clock3,
  Phone,
  ShieldCheck,
  Star,
  UserRoundCheck,
} from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { FullFooterSection } from "@/components/FullFooterSection";
import { HomeBookingForm } from "@/components/forms/HomeBookingForm";
import { SiteTopHeader } from "@/components/layout/SiteTopHeader";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import type { ServiceContent } from "@/app/services/service-content";
import { getSiteSettings } from "@/lib/site-settings";

export async function ServiceDetailTemplate({ content }: { content: ServiceContent }) {
  const { whatsapp, phone } = await getSiteSettings();
  return (
    <div className="min-h-screen bg-background font-sans text-foreground">
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
              <div className="inline-flex items-center rounded-full border border-[rgba(192,192,192,0.22)] bg-[rgba(45,45,51,0.55)] px-3 py-1 text-sm shadow-[0_4px_18px_-6px_rgba(0,0,0,0.4)] backdrop-blur">
                <Star className="mr-2 h-4 w-4 fill-[#C0C0C0] text-[#C0C0C0]" />
                <span className="font-semibold text-[#F8F8F8]">4.9</span>
                <span className="mx-2 text-[#C0C0C0]/60">|</span>
                <span className="text-[#CFCFCF]">1538+ Google reviews</span>
              </div>
              <span className="BTS-pill">{content.title}</span>
              <h1 className="text-4xl font-bold tracking-tight text-[#F8F8F8] sm:text-5xl">
                {content.hero}
              </h1>
              <p className="max-w-xl text-[15px] leading-relaxed text-[#CFCFCF]">
                {content.subtitle}
              </p>
              <div className="flex flex-col gap-3 text-sm text-[#C0C0C0] sm:flex-row sm:items-center">
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  {phone}
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

      {/* Feature row */}
      <section className="BTS-section-charcoal relative py-20 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                title: "Free waiting time",
                desc: "Generous grace periods on every airport pickup.",
                icon: UserRoundCheck,
              },
              {
                title: "Premium vehicles",
                desc: "Road-ready cars for executive-grade comfort.",
                icon: CarFront,
              },
              {
                title: "24/7 availability",
                desc: "Pre-booked transfers any time, any day.",
                icon: Clock3,
              },
              {
                title: "Lowest-fare guarantee",
                desc: "Transparent, all-inclusive pricing — no surprises.",
                icon: BadgeDollarSign,
              },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className="space-y-4">
                  <div className="BTS-icon-halo h-12 w-12">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="text-xl font-semibold tracking-tight text-[#F8F8F8]">
                    {item.title}
                  </h3>
                  <p className="text-[14.5px] leading-relaxed text-[#CFCFCF]">
                    {item.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Section 1 */}
      <section className="BTS-section-onyx relative py-20 md:py-24">
        <div className="container mx-auto grid items-center gap-12 px-4 md:grid-cols-2">
          <div className="BTS-purple-glow relative h-[340px] overflow-hidden rounded-2xl">
            <img
              src="/images/heathrow-terminal5-couple.jpg"
              alt={content.title}
              className="h-full w-full object-cover"
            />
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,transparent_55%,rgba(13,13,15,0.85)_100%)]" />
          </div>
          <div className="space-y-5">
            <span className="BTS-pill">Premium service</span>
            <h2 className="text-3xl font-bold tracking-tight text-[#F8F8F8] md:text-4xl">
              {content.section1}
            </h2>
            {content.section1Paragraphs.map((paragraph) => (
              <p key={paragraph} className="text-[15px] leading-relaxed text-[#CFCFCF]">
                {paragraph}
              </p>
            ))}
            <Button asChild className="mt-2">
              <Link href="/taxi-quote">Book a taxi</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Section 2 */}
      <section className="BTS-section-charcoal relative py-24 md:py-32">
        <div className="container mx-auto grid items-center gap-12 px-4 md:grid-cols-2">
          <div className="order-2 space-y-5 md:order-1">
            <span className="BTS-pill">Comfort &amp; reliability</span>
            <h2 className="text-3xl font-bold tracking-tight text-[#F8F8F8] md:text-4xl">
              {content.section2}
            </h2>
            {content.section2Paragraphs.map((paragraph) => (
              <p key={paragraph} className="text-[15px] leading-relaxed text-[#CFCFCF]">
                {paragraph}
              </p>
            ))}
            <Button asChild className="mt-2">
              <Link href="/taxi-quote">Book a taxi</Link>
            </Button>
          </div>
          <div className="BTS-purple-glow relative order-1 h-[340px] overflow-hidden rounded-2xl md:order-2">
            <img
              src="/images/heathrow-driver-loading.jpg"
              alt={content.title}
              className="h-full w-full object-cover"
            />
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,transparent_55%,rgba(13,13,15,0.85)_100%)]" />
          </div>
        </div>
      </section>

      {/* Section 3 */}
      <section className="BTS-section-onyx relative py-20 md:py-24">
        <div className="container mx-auto grid items-center gap-12 px-4 md:grid-cols-2">
          <div className="BTS-purple-glow relative h-[340px] overflow-hidden rounded-2xl">
            <img
              src="/images/mpv-airport-boarding.jpg"
              alt={content.title}
              className="h-full w-full object-cover"
            />
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,transparent_55%,rgba(13,13,15,0.85)_100%)]" />
          </div>
          <div className="space-y-5">
            <span className="BTS-pill">For every journey</span>
            <h2 className="text-3xl font-bold tracking-tight text-[#F8F8F8] md:text-4xl">
              {content.section3}
            </h2>
            {content.section3Paragraphs.map((paragraph) => (
              <p key={paragraph} className="text-[15px] leading-relaxed text-[#CFCFCF]">
                {paragraph}
              </p>
            ))}
            <Button asChild className="mt-2">
              <Link href="/taxi-quote">Book a taxi</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Gateway */}
      <section className="BTS-section-charcoal relative py-24 md:py-32">
        <div className="container mx-auto grid items-center gap-12 px-4 md:grid-cols-2">
          <div className="space-y-5">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#C0C0C0]">
              {content.gatewayLabel}
            </p>
            <h2 className="text-3xl font-bold tracking-tight text-[#F8F8F8] md:text-4xl">
              {content.gatewayHeading}
            </h2>
            {content.gatewayParagraphs.map((paragraph) => (
              <p key={paragraph} className="text-[15px] leading-relaxed text-[#CFCFCF]">
                {paragraph}
              </p>
            ))}
            <Button asChild className="mt-2">
              <Link href="/taxi-quote">Book a taxi</Link>
            </Button>
          </div>
          <div className="BTS-purple-glow relative h-[400px] overflow-hidden rounded-2xl">
            <img
              src="/images/executive-passenger.jpg"
              alt={content.title}
              className="h-full w-full object-cover"
            />
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,transparent_55%,rgba(13,13,15,0.85)_100%)]" />
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="BTS-section-onyx relative py-20 md:py-28">
        <div className="container mx-auto px-4">
          <div className="mx-auto mb-12 max-w-3xl text-center">
            <span className="BTS-pill">Why London Airport Taxi Services</span>
            <h2 className="mt-6 text-3xl font-bold tracking-tight text-[#F8F8F8] md:text-4xl">
              {content.benefitsTitle}
            </h2>
            <div className="BTS-divider mx-auto mt-6 w-24" />
          </div>
          <div className="mx-auto grid max-w-5xl gap-x-14 gap-y-12 md:grid-cols-2">
            {content.benefitsItems.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className="text-center">
                  <div className="BTS-icon-halo mx-auto mb-5 h-14 w-14">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-semibold tracking-tight text-[#F8F8F8]">
                    {item.title}
                  </h3>
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
            <AccordionItem value="faq-1">
              <AccordionTrigger>How early should I book?</AccordionTrigger>
              <AccordionContent>
                Booking 6–12 hours in advance gives better vehicle availability
                and smoother scheduling.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="faq-2">
              <AccordionTrigger>Is the service available 24/7?</AccordionTrigger>
              <AccordionContent>
                Yes — our services run around the clock, all year.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="faq-3">
              <AccordionTrigger>Are prices fixed?</AccordionTrigger>
              <AccordionContent>
                Yes — pricing is transparent and locked at booking.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

      <FullFooterSection />
    </div>
  );
}
