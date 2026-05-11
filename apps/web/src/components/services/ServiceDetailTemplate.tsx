import Link from "next/link";
import {
  BadgeDollarSign,
  Briefcase,
  CarFront,
  Clock3,
  MapPin,
  Phone,
  ShieldCheck,
  Star,
  UserRoundCheck,
  Users,
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

export function ServiceDetailTemplate({ content }: { content: ServiceContent }) {
  return (
    <div className="min-h-screen bg-background font-sans text-foreground">
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

      <section className="ukride-hero-ambient ukride-luxury-section-1 relative py-16 text-primary-foreground lg:py-20">
        <div className="absolute inset-0 z-0 overflow-hidden">
          <img
            src="/hero-bg.jpg"
            alt={content.title}
            className="ukride-media-cinematic absolute inset-0 h-full w-full object-cover opacity-[0.28] mix-blend-overlay"
          />
          <div className="ukride-media-overlay" />
        </div>
        <div className="container relative z-20 mx-auto px-4">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center rounded-full border border-[rgba(192,192,192,0.18)] bg-[rgba(75,0,130,0.22)] px-3 py-1 text-sm shadow-[0_4px_18px_-6px_rgba(75,0,130,0.55)] backdrop-blur-sm">
                <Star className="mr-2 h-4 w-4 fill-highlight text-highlight" />
                <span className="font-semibold">4.9</span>
                <span className="mx-2 text-[#C0C0C0]/60">|</span>
                <span className="text-[#F8F8F8]/90">1538+ Google Reviews</span>
              </div>
              <h1 className="text-4xl font-extrabold tracking-tight text-[#F8F8F8] drop-shadow-[0_2px_20px_rgba(75,0,130,0.35)] sm:text-5xl">
                {content.hero}
              </h1>
              <p className="max-w-xl text-lg text-[#D1D5DB]">
                {content.subtitle}
              </p>
              <div className="flex flex-col gap-3 text-sm text-[#D1D5DB] sm:flex-row sm:items-center">
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-highlight" />
                  +44 7700 1409 00
                </div>
                <div className="hidden h-4 w-px bg-[rgba(192,192,192,0.25)] sm:block" />
                <div className="flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4 text-highlight" />
                  24/7 monitored journeys
                </div>
              </div>
            </div>

            <HomeBookingForm />
          </div>
        </div>
      </section>

      <section className="bg-secondary py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {[
              {
                title: "Grace Period",
                desc: "Get free waiting time and smoother pickups every time.",
                icon: UserRoundCheck,
              },
              {
                title: "Quality Vehicles",
                desc: "Road-ready vehicles for comfort and reliability.",
                icon: CarFront,
              },
              {
                title: "Available Around the Clock",
                desc: "24/7 service whenever you need a ride.",
                icon: Clock3,
              },
              {
                title: "Lowest Price Guaranteed",
                desc: "Transparent and competitive pricing on every route.",
                icon: BadgeDollarSign,
              },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className="space-y-3 text-left">
                  <Icon className="h-10 w-10 text-highlight" />
                  <h3 className="text-2xl font-semibold text-foreground">
                    {item.title}
                  </h3>
                  <p className="text-base leading-7 text-muted-foreground">
                    {item.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-background py-20">
        <div className="container mx-auto grid items-center gap-10 px-4 md:grid-cols-2">
          <img
            src="/perfect-taxi.jpg"
            alt={content.title}
            className="h-[320px] w-full rounded-2xl object-cover shadow-lg"
          />
          <div className="space-y-5">
            <h2 className="text-3xl font-bold text-foreground">{content.section1}</h2>
            {content.section1Paragraphs.map((paragraph) => (
              <p key={paragraph} className="text-muted-foreground">
                {paragraph}
              </p>
            ))}
            <Button asChild className="bg-accent text-accent-foreground hover:bg-accent/90">
              <Link href="/taxi-quote">Book a Taxi</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="bg-secondary py-24 md:py-32">
        <div className="container mx-auto grid items-center gap-10 px-4 md:grid-cols-2">
          <div className="space-y-5">
            <h2 className="text-3xl font-bold text-foreground">{content.section2}</h2>
            {content.section2Paragraphs.map((paragraph) => (
              <p key={paragraph} className="text-muted-foreground">
                {paragraph}
              </p>
            ))}
            <Button asChild className="bg-accent text-accent-foreground hover:bg-accent/90">
              <Link href="/taxi-quote">Book a Taxi</Link>
            </Button>
          </div>
          <img
            src="/fleet.jpg"
            alt={content.title}
            className="h-[320px] w-full rounded-2xl object-cover shadow-lg"
          />
        </div>
      </section>

      <section className="bg-background py-20">
        <div className="container mx-auto grid items-center gap-10 px-4 md:grid-cols-2">
          <img
            src="/airport_6.jpg"
            alt={content.title}
            className="h-[320px] w-full rounded-2xl object-cover shadow-lg"
          />
          <div className="space-y-5">
            <h2 className="text-3xl font-bold text-foreground">{content.section3}</h2>
            {content.section3Paragraphs.map((paragraph) => (
              <p key={paragraph} className="text-muted-foreground">
                {paragraph}
              </p>
            ))}
            <Button asChild className="bg-accent text-accent-foreground hover:bg-accent/90">
              <Link href="/taxi-quote">Book a Taxi</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="bg-secondary py-24 md:py-32">
        <div className="container mx-auto grid items-center gap-10 px-4 md:grid-cols-2">
          <div className="space-y-5">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">{content.gatewayLabel}</p>
            <h2 className="text-3xl font-bold text-foreground">{content.gatewayHeading}</h2>
            {content.gatewayParagraphs.map((paragraph) => (
              <p key={paragraph} className="text-muted-foreground">
                {paragraph}
              </p>
            ))}
            <Button asChild className="bg-accent text-accent-foreground hover:bg-accent/90">
              <Link href="/taxi-quote">Book a Taxi</Link>
            </Button>
          </div>
          <img
            src="/airport_3.jpg"
            alt={content.title}
            className="h-[380px] w-full rounded-2xl object-cover shadow-lg"
          />
        </div>
      </section>

      <section className="bg-secondary py-20">
        <div className="container mx-auto px-4">
          <div className="mb-10 text-center">
            <h2 className="text-3xl font-bold text-foreground">{content.benefitsTitle}</h2>
          </div>
          <div className="mx-auto grid max-w-5xl gap-x-14 gap-y-12 md:grid-cols-2">
            {content.benefitsItems.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className="text-center">
                  <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-highlight/15">
                    <Icon className="h-8 w-8 text-highlight" />
                  </div>
                  <h3 className="mb-3 text-3xl font-medium text-foreground">
                    {item.title}
                  </h3>
                  <p className="mx-auto max-w-md text-base leading-8 text-foreground/85">
                    {item.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-secondary py-24 md:py-32">
        <div className="container mx-auto max-w-4xl px-4">
          <div className="mb-10 text-center">
            <h2 className="text-3xl font-bold text-foreground">Frequently Asked Questions</h2>
          </div>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="faq-1">
              <AccordionTrigger className="text-left text-lg font-medium text-foreground hover:text-highlight hover:no-underline">
                How early should I book?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                Booking 6-12 hours in advance gives better vehicle availability and
                smoother scheduling.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="faq-2">
              <AccordionTrigger className="text-left text-lg font-medium text-foreground hover:text-highlight hover:no-underline">
                Is the service available 24/7?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                Yes, our services are available around the clock.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="faq-3">
              <AccordionTrigger className="text-left text-lg font-medium text-foreground hover:text-highlight hover:no-underline">
                Are prices fixed?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                Yes, pricing is transparent and fixed at booking.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

      <FullFooterSection />
    </div>
  );
}

