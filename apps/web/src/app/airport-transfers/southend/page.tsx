"use client";

import Link from "next/link";
import {
  Plane,
  ShieldCheck,
  CheckCircle2,
  Star,
  Phone,
  Car,
  ThumbsUp,
  BadgeDollarSign,
  UserRoundCheck,
  CarFront,
  Clock3,
} from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { MainNav } from "@/components/MainNav";
import { FullFooterSection } from "@/components/FullFooterSection";
import { HomeBookingForm } from "@/components/forms/HomeBookingForm";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function SouthendAirportTransfersPage() {
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

      <header className="sticky top-0 z-50 w-full border-b ukride-glass-nav">
        <div className="container mx-auto flex h-20 items-center justify-between px-4">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Plane className="h-6 w-6" />
            </div>
            <span className="text-2xl font-bold tracking-tight text-foreground">
              UKRide
            </span>
          </Link>
          <MainNav />
          <div className="flex items-center gap-4">
            <Button
              asChild
              className="hidden sm:inline-flex bg-accent text-accent-foreground hover:bg-accent/90"
            >
              <Link href="/login">Log In</Link>
            </Button>
            <Button
              asChild
              className="bg-accent text-accent-foreground hover:bg-accent/90"
            >
              <Link href="/signup">Sign Up</Link>
            </Button>
          </div>
        </div>
      </header>

      <section className="relative bg-primary py-16 text-primary-foreground lg:py-20">
        <div className="absolute inset-0 overflow-hidden bg-primary">
          <img
            src="/airport_6.jpg"
            alt="Southend transfer"
            className="absolute inset-0 h-full w-full object-cover opacity-20 mix-blend-overlay"
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
                Book Your Southend
                <br />
                Airport Transfer Now
              </h1>
              <p className="max-w-xl text-lg text-primary-foreground/80">
                Fast and reliable Southend transfers with fixed pricing, professional
                drivers, and 24/7 support.
              </p>
              <div className="flex flex-col gap-3 text-sm sm:flex-row sm:items-center">
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-accent" />
                  +44 7700 1409 00
                </div>
                <div className="hidden h-4 w-px bg-primary-foreground/30 sm:block" />
                <div className="flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4 text-accent" />
                  Live flight monitored journeys
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
                desc: "Get the free 45-minute waiting period and make your airport checkouts stress-free.",
                icon: UserRoundCheck,
              },
              {
                title: "Quality Vehicles",
                desc: "We provide well-managed road-ready vehicles to ensure a comfortable ride for you.",
                icon: CarFront,
              },
              {
                title: "Available Around the Clock",
                desc: "We ensure 24/7 availability to make your London airport transfers hassle free.",
                icon: Clock3,
              },
              {
                title: "Lowest Price Guaranteed",
                desc: "Get the lowest prices available in the market when booking with UKride.",
                icon: BadgeDollarSign,
              },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className="space-y-3 text-left">
                  <Icon className="h-10 w-10 text-accent" />
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
            alt="Southend pickup service"
            className="h-[320px] w-full rounded-2xl object-cover shadow-lg"
          />
          <div className="space-y-5">
            <h2 className="text-3xl font-bold text-foreground">
              Get a smooth Southend Airport transfer within London
            </h2>
            <p className="text-muted-foreground">
              With UKride, enjoy hassle-free Southend pickups and drop-offs with
              well-trained drivers and easy online booking. Share your flight
              details and we will handle the timing for you.
            </p>
            <p className="text-muted-foreground">
              From airport arrivals to city hotels and residential addresses, our
              Southend transfer service is built for comfort, safety, and
              punctuality.
            </p>
            <p className="text-muted-foreground">
              With complimentary waiting time and 24/7 availability, we make every
              airport journey simple and stress-free.
            </p>
            <Button className="bg-accent text-accent-foreground hover:bg-accent/90">
              Book a Taxi
            </Button>
          </div>
        </div>
      </section>

      <section className="bg-secondary py-20">
        <div className="container mx-auto px-4">
          <div className="mb-10 text-center">
            <h2 className="text-3xl font-bold text-foreground">
              Choose The Ride for Every Destination
            </h2>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { name: "Saloon", img: "/saloon.jpg" },
              { name: "MPV", img: "/mpv.jpg" },
              { name: "Estate", img: "/estate.jpg" },
              { name: "Chauffeur", img: "/chauffeur.jpg" },
            ].map((car) => (
              <Card key={car.name} className="overflow-hidden border-0 shadow-md">
                <img src={car.img} alt={car.name} className="h-36 w-full object-cover" />
                <CardContent className="space-y-3 p-4">
                  <h3 className="text-lg font-bold text-foreground">{car.name}</h3>
                  <Button className="w-full bg-accent text-accent-foreground hover:bg-accent/90">
                    Book Now
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-secondary py-24 md:py-32">
        <div className="container mx-auto grid items-center gap-10 px-4 md:grid-cols-2">
          <div className="space-y-5">
            <h2 className="text-3xl font-bold text-foreground">
              Reliable & Comfortable Southend Airport Taxi
            </h2>
            <p className="text-muted-foreground">
              UKride provides dependable Southend taxi services designed for smooth
              airport travel. Our drivers are punctual, courteous, and ready to
              support you with luggage and route planning.
            </p>
            <p className="text-muted-foreground">
              Whether it is a business trip or family travel, our service standard
              ensures every ride is comfortable and professionally managed.
            </p>
            <p className="text-muted-foreground">
              Book in advance to enjoy fixed fares and a seamless transfer from
              your terminal to your final destination.
            </p>
            <Button className="bg-accent text-accent-foreground hover:bg-accent/90">
              Book a Taxi
            </Button>
          </div>
          <img
            src="/airport_5.jpg"
            alt="Reliable Southend airport taxi"
            className="h-[320px] w-full rounded-2xl object-cover shadow-lg"
          />
        </div>
      </section>

      <section className="bg-background py-20">
        <div className="container mx-auto grid items-center gap-10 px-4 md:grid-cols-2">
          <img
            src="/airport_3.jpg"
            alt="Travel between Southend and other airports"
            className="h-[320px] w-full rounded-2xl object-cover shadow-lg"
          />
          <div className="space-y-5">
            <h2 className="text-3xl font-bold text-foreground">
              Moving from Southend to any other airport?
            </h2>
            <p className="text-muted-foreground">
              We help you move smoothly between London airports with precise pickup
              coordination and route-focused drivers.
            </p>
            <p className="text-muted-foreground">
              If you are switching from Southend to Heathrow, Gatwick, Luton, or
              Stansted, our transfer team keeps your schedule on track.
            </p>
            <p className="text-muted-foreground">
              Book your inter-airport ride in advance and travel with complete
              confidence.
            </p>
            <Button className="bg-accent text-accent-foreground hover:bg-accent/90">
              Book a Taxi
            </Button>
          </div>
        </div>
      </section>

      <section className="bg-secondary py-24 md:py-32">
        <div className="container mx-auto grid items-center gap-10 px-4 md:grid-cols-2">
          <div className="space-y-5">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              Your Gateway to Essex and London
            </p>
            <h2 className="text-3xl font-bold text-foreground">
              UKride: Your Gateway to Southend Airport Transfers
            </h2>
            <p className="text-muted-foreground">
              Avoid travel stress with planned airport transfers from Southend to
              any London location. We make pickups and drop-offs clear and easy.
            </p>
            <p className="text-muted-foreground">
              Southend Airport is ideal for fast departures, and our drivers ensure
              you arrive on time with enough buffer for check-in and terminal
              formalities.
            </p>
            <p className="text-muted-foreground">
              From arrival hall meetups to doorstep drop-offs, UKride offers a
              complete Southend transfer experience with dependable service.
            </p>
            <Button className="bg-accent text-accent-foreground hover:bg-accent/90">
              Book a Taxi
            </Button>
          </div>
          <img
            src="/airport_2.jpg"
            alt="Southend airport travelers"
            className="h-[380px] w-full rounded-2xl object-cover shadow-lg"
          />
        </div>
      </section>

      <section className="py-20 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="mb-10 text-center">
            <h2 className="text-3xl font-bold text-foreground">
              Transfers to and from London Southend Airport
            </h2>
          </div>
          <div className="mx-auto grid max-w-5xl gap-x-14 gap-y-12 md:grid-cols-2">
            {[
              {
                title: "Punctuality Guaranteed",
                desc: "We value your time with precise scheduling and smart dispatch, so every Southend pickup is on time.",
                icon: Plane,
              },
              {
                title: "Meet and greet service",
                desc: "Our drivers can welcome you with a name board, helping you skip taxi queues and travel faster.",
                icon: Car,
              },
              {
                title: "Why Choose Us",
                desc: "Affordable pricing, licensed drivers, and professional service for reliable airport transfers every day.",
                icon: ThumbsUp,
              },
              {
                title: "Transparent Pricing",
                desc: "Our Southend fares include the key costs upfront, giving you clear and dependable pricing.",
                icon: BadgeDollarSign,
              },
            ].map((item) => {
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
            <h2 className="text-3xl font-bold text-foreground">
              Frequently Asked Questions
            </h2>
          </div>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="faq-1">
              <AccordionTrigger className="text-left text-lg font-medium text-foreground">
                How early should I book Southend airport transfer?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                We recommend booking at least 6-12 hours before travel for better
                vehicle availability and smoother scheduling.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="faq-2">
              <AccordionTrigger className="text-left text-lg font-medium text-foreground">
                Do you track flights for Southend pickups?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                Yes. We monitor flight timing to align your pickup when arrival
                times change.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="faq-3">
              <AccordionTrigger className="text-left text-lg font-medium text-foreground">
                Can I book transfer from Southend to other London airports?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                Yes, we provide inter-airport transfers including Heathrow, Gatwick,
                Luton, London City, and Stansted.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

      <FullFooterSection />
    </div>
  );
}

