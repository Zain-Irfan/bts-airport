"use client";

import Link from "next/link";
import { useState } from "react";
import { format } from "date-fns";
import {
  Plane,
  MapPin,
  CalendarIcon,
  Clock,
  Users,
  Briefcase,
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
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export default function HeathrowAirportTransfersPage() {
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
            <span className="text-2xl font-bold tracking-tight text-foreground">UKRide</span>
          </Link>
          <MainNav />
          <div className="flex items-center gap-4">
            <Button asChild className="hidden sm:inline-flex bg-accent text-accent-foreground hover:bg-accent/90">
              <Link href="/login">Log In</Link>
            </Button>
            <Button asChild className="bg-accent text-accent-foreground hover:bg-accent/90">
              <Link href="/signup">Sign Up</Link>
            </Button>
          </div>
        </div>
      </header>

      <section className="relative bg-primary py-16 text-primary-foreground lg:py-20">
        <div className="absolute inset-0 overflow-hidden bg-primary">
          <img src="/airport_1.jpg" alt="Heathrow transfer" className="absolute inset-0 h-full w-full object-cover opacity-20 mix-blend-overlay" />
          <div className="absolute inset-0 bg-gradient-to-b from-primary/80 to-primary z-10" />
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
                Book Your Heathrow
                <br />
                Airport Transfer Now
              </h1>
              <p className="max-w-xl text-lg text-primary-foreground/80">
                Reliable pickups, fixed pricing, professional drivers, and 24/7 support for all Heathrow terminals.
              </p>
              <div className="flex flex-col gap-3 text-sm sm:flex-row sm:items-center">
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-accent" />
                  +44 7700 1409 00
                </div>
                <div className="hidden h-4 w-px bg-primary-foreground/30 sm:block" />
                <div className="flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4 text-accent" />
                  Flight monitored journeys
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
                  <h3 className="text-2xl font-semibold text-foreground">{item.title}</h3>
                  <p className="text-base leading-7 text-muted-foreground">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-20 bg-background">
        <div className="container mx-auto grid items-center gap-10 px-4 md:grid-cols-2">
          <img src="/perfect-taxi.jpg" alt="Heathrow pickup service" className="h-[320px] w-full rounded-2xl object-cover shadow-lg" />
          <div className="space-y-5">
            <h2 className="text-3xl font-bold text-foreground">Get a smooth Heathrow Airport transfer within London</h2>
            <p className="text-muted-foreground">
              With UKride, experience the convenience of professional airport pickup. Book your Heathrow airport taxi online and provide your flight number for real-time tracking. From the moment you land at Heathrow, our driver is ready to assist with luggage and provide a comfortable journey to your doorstep.
            </p>
            <p className="text-muted-foreground">
              Leave the responsibility of organising Heathrow airport transfer to us and ensure you receive a hassle-free journey. Our meticulous fleet and professional drivers cover trips to and from all airports efficiently.
            </p>
            <p className="text-muted-foreground">
              With complimentary waiting time and 24/7 availability, we guarantee a seamless travel experience that gets you to your destination on time.
            </p>
            <Button className="bg-accent text-accent-foreground hover:bg-accent/90">Book a Taxi</Button>
          </div>
        </div>
      </section>

      <section className="bg-secondary py-20">
        <div className="container mx-auto px-4">
          <div className="mb-10 text-center">
            <h2 className="text-3xl font-bold text-foreground">Choose The Ride for Every Destination</h2>
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
                  <Button className="w-full bg-accent text-accent-foreground hover:bg-accent/90">Book Now</Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 md:py-32 bg-secondary">
        <div className="container mx-auto grid items-center gap-10 px-4 md:grid-cols-2">
          <div className="space-y-5">
            <h2 className="text-3xl font-bold text-foreground">Reliable & Comfortable Heathrow Airport Taxi</h2>
            <p className="text-muted-foreground">
              UKride designed taxi services to transform your journey into an experience of comfort and refinement. Get a bespoke transfer into London City with our reliable Heathrow airport taxi. We go beyond the ordinary in adding small professional touches to our taxi services that make a big difference to your travel.
            </p>
            <p className="text-muted-foreground">
              Our Heathrow airport transfer is not just getting you from point A to Point B: it is about elevating your travel to the next level. With us, every mile is delivered with the opulence you deserve with a higher standard of taxi services.
            </p>
            <p className="text-muted-foreground">
              Trust UKride to provide Heathrow transfer services that turn an ordinary journey into an exceptional experience.
            </p>
            <Button className="bg-accent text-accent-foreground hover:bg-accent/90">Book a Taxi</Button>
          </div>
          <img src="/airport_5.jpg" alt="Reliable Heathrow airport taxi" className="h-[320px] w-full rounded-2xl object-cover shadow-lg" />
        </div>
      </section>

      <section className="py-20 bg-background">
        <div className="container mx-auto grid items-center gap-10 px-4 md:grid-cols-2">
          <img src="/airport_6.jpg" alt="Transfer between airports" className="h-[320px] w-full rounded-2xl object-cover shadow-lg" />
          <div className="space-y-5">
            <h2 className="text-3xl font-bold text-foreground">Moving from Heathrow to any other airport?</h2>
            <p className="text-muted-foreground">
              We make your travel between London's airports in total control. Our transfer service keeps you moving like a pro. Switching airports in London can be daunting, but our taxi service is built for speed, precision, and peace of mind.
            </p>
            <p className="text-muted-foreground">
              Whether it’s Gatwick to Heathrow airport transfer, UKride has got your back with top-tier vehicles and professional drivers who know every route.
            </p>
            <p className="text-muted-foreground">
              Visit our website and book your ride if you're looking for a Gatwick to Heathrow taxi transfer.
            </p>
            <Button className="bg-accent text-accent-foreground hover:bg-accent/90">Book a Taxi</Button>
          </div>
        </div>
      </section>

      <section className="py-24 md:py-32 bg-secondary">
        <div className="container mx-auto grid items-center gap-10 px-4 md:grid-cols-2">
          <div className="space-y-5">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">Your Gateway to London and Beyond</p>
            <h2 className="text-3xl font-bold text-foreground">
              UKride: Your Gateway to London and Beyond Heathrow Airport
            </h2>
            <p className="text-muted-foreground">
              Having a clear idea of where to go turns a stressful transfer into a smooth one. Don’t get lost at the massive airport in London. Ensure a hassle-free journey for your peace of mind by booking our taxi in advance.
            </p>
            <p className="text-muted-foreground">Heathrow Airport has four terminals:</p>
            <ul className="list-disc space-y-1 pl-6 text-muted-foreground">
              <li>Terminal 2 (The Queen’s Terminal)</li>
              <li>Terminal 3</li>
              <li>Terminal 4</li>
              <li>Terminal 5</li>
            </ul>
            <p className="text-muted-foreground">
              UKride will streamline your journey from the flight to your door. All the airport requirements can take time, so plan smartly. Meet our driver at the arrival hall, who will hold a sign with your name. Get enough time to check in, as our driver will drop you off at your terminal in the airport well in advance of your flight. Upgrade your travel experience with our comprehensive Heathrow Airport guide.
            </p>
            <Button className="bg-accent text-accent-foreground hover:bg-accent/90">Book a Taxi</Button>
          </div>
          <img
            src="/airport_3.jpg"
            alt="Heathrow airport terminal transfer"
            className="h-[380px] w-full rounded-2xl object-cover shadow-lg"
          />
        </div>
      </section>

      <section className="py-20 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="mb-10 text-center">
            <h2 className="text-3xl font-bold text-foreground">Transfers to and from London Heathrow Airport</h2>
          </div>
          <div className="mx-auto grid max-w-5xl gap-x-14 gap-y-12 md:grid-cols-2">
            {[
              {
                title: "Punctuality Guaranteed",
                desc: "We value your time as much as you do. With our intelligent dispatch system and real-time tracking, UKride ensures every pickup is punctual so you're never left waiting, whether it's an early flight or a late arrival.",
                icon: Plane,
              },
              {
                title: "Meet and greet service",
                desc: "Our professional drivers will greet you with a name tag at the terminal or baggage hall, eliminating taxi waiting time. Booking in advance also secures a fixed price guarantee, avoiding any surprises or hidden costs for your Heathrow transfer.",
                icon: Car,
              },
              {
                title: "Why Choose Us",
                desc: "We ensure unbeatable prices and highly professional service with carefully selected and fully licenced drivers, road ready vehicles and customer oriented service. Book with us and enjoy the most comfortable and seamless journey.",
                icon: ThumbsUp,
              },
              {
                title: "Transparent Pricing",
                desc: "With UKride, you'll find the best rates for your transfer, covering local taxes, tolls, parking, and VAT.",
                icon: BadgeDollarSign,
              },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className="text-center">
                  <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-highlight/15">
                    <Icon className="h-8 w-8 text-highlight" />
                  </div>
                  <h3 className="mb-3 text-3xl font-medium text-foreground">{item.title}</h3>
                  <p className="mx-auto max-w-md text-base leading-8 text-foreground/85">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-24 md:py-32 bg-secondary">
        <div className="container mx-auto max-w-4xl px-4">
          <div className="mb-10 text-center">
            <h2 className="text-3xl font-bold text-foreground">Frequently Asked Questions</h2>
          </div>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="faq-1">
              <AccordionTrigger className="text-left text-lg font-medium text-foreground">How early should I book Heathrow transfer?</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">You can book anytime, but we recommend booking at least 6-12 hours in advance for best availability.</AccordionContent>
            </AccordionItem>
            <AccordionItem value="faq-2">
              <AccordionTrigger className="text-left text-lg font-medium text-foreground">What if my flight is delayed?</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">We monitor live flight status and adjust your pickup timing accordingly.</AccordionContent>
            </AccordionItem>
            <AccordionItem value="faq-3">
              <AccordionTrigger className="text-left text-lg font-medium text-foreground">Do you provide child seats?</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">Yes, child and booster seats are available on request during booking.</AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

      <FullFooterSection />
    </div>
  );
}

