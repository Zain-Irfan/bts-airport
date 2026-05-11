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

export default function GatwickAirportTransfersPage() {
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
          <img src="/airport_2.jpg" alt="Gatwick transfer" className="absolute inset-0 h-full w-full object-cover opacity-20 mix-blend-overlay" />
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
              <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">Book Your Gatwick Airport Transfer Now</h1>
              <p className="max-w-xl text-lg text-primary-foreground/80">Smooth Gatwick airport pickups and drop-offs with fixed fares and trusted local drivers.</p>
              <div className="flex flex-col gap-3 text-sm sm:flex-row sm:items-center">
                <div className="flex items-center gap-2"><Phone className="h-4 w-4 text-accent" />+44 7700 1409 00</div>
                <div className="hidden h-4 w-px bg-primary-foreground/30 sm:block" />
                <div className="flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-accent" />Flight monitored journeys</div>
              </div>
            </div>
            <HomeBookingForm />
          </div>
        </div>
      </section>

      <section className="bg-secondary py-16 md:py-24"><div className="container mx-auto px-4"><div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">{[{ title: "Grace Period", desc: "Get the free 45-minute waiting period and make your airport checkouts stress-free.", icon: UserRoundCheck }, { title: "Quality Vehicles", desc: "Well-managed road-ready vehicles for a comfortable journey.", icon: CarFront }, { title: "Available Around the Clock", desc: "24/7 availability for stress-free London airport transfers.", icon: Clock3 }, { title: "Lowest Price Guaranteed", desc: "Get competitive airport fares with no hidden surprises.", icon: BadgeDollarSign }].map((item) => { const Icon = item.icon; return <div key={item.title} className="space-y-3 text-left"><Icon className="h-10 w-10 text-accent" /><h3 className="text-2xl font-semibold text-foreground">{item.title}</h3><p className="text-base leading-7 text-muted-foreground">{item.desc}</p></div>; })}</div></div></section>

      <section className="bg-background py-20"><div className="container mx-auto grid items-center gap-10 px-4 md:grid-cols-2"><img src="/perfect-taxi.jpg" alt="Gatwick transfer service" className="h-[320px] w-full rounded-2xl object-cover shadow-lg" /><div className="space-y-5"><h2 className="text-3xl font-bold text-foreground">Get a smooth Gatwick Airport transfer within London</h2><p className="text-muted-foreground">With UKride, book Gatwick transfers in minutes and travel with complete peace of mind. We coordinate pickups with your flight details and terminal timing.</p><p className="text-muted-foreground">Whether you are heading into Central London or any nearby city, our professional drivers make your journey comfortable and punctual.</p><p className="text-muted-foreground">Enjoy fixed pricing and reliable support from booking to drop-off.</p><Button className="bg-accent text-accent-foreground hover:bg-accent/90">Book a Taxi</Button></div></div></section>

      <section className="bg-secondary py-20"><div className="container mx-auto px-4"><div className="mb-10 text-center"><h2 className="text-3xl font-bold text-foreground">Choose The Ride for Every Destination</h2></div><div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">{[{ name: "Saloon", img: "/saloon.jpg" }, { name: "MPV", img: "/mpv.jpg" }, { name: "Estate", img: "/estate.jpg" }, { name: "Chauffeur", img: "/chauffeur.jpg" }].map((car) => <Card key={car.name} className="overflow-hidden border-0 shadow-md"><img src={car.img} alt={car.name} className="h-36 w-full object-cover" /><CardContent className="space-y-3 p-4"><h3 className="text-lg font-bold text-foreground">{car.name}</h3><Button className="w-full bg-accent text-accent-foreground hover:bg-accent/90">Book Now</Button></CardContent></Card>)}</div></div></section>

      <section className="bg-secondary py-24 md:py-32"><div className="container mx-auto grid items-center gap-10 px-4 md:grid-cols-2"><div className="space-y-5"><h2 className="text-3xl font-bold text-foreground">Reliable & Comfortable Gatwick Airport Taxi</h2><p className="text-muted-foreground">Our Gatwick airport taxi service focuses on punctual pickups, clean vehicles, and experienced drivers who understand airport travel demands.</p><p className="text-muted-foreground">From business rides to family travel, we deliver dependable transfers with clear communication and route efficiency.</p><p className="text-muted-foreground">Book early and enjoy seamless airport-to-door transport with no last-minute stress.</p><Button className="bg-accent text-accent-foreground hover:bg-accent/90">Book a Taxi</Button></div><img src="/airport_5.jpg" alt="Gatwick airport taxi" className="h-[320px] w-full rounded-2xl object-cover shadow-lg" /></div></section>

      <section className="bg-background py-20"><div className="container mx-auto grid items-center gap-10 px-4 md:grid-cols-2"><img src="/airport_3.jpg" alt="Gatwick to other airports" className="h-[320px] w-full rounded-2xl object-cover shadow-lg" /><div className="space-y-5"><h2 className="text-3xl font-bold text-foreground">Moving from Gatwick to any other airport?</h2><p className="text-muted-foreground">Switching airports in London is easier with our inter-airport transfer service. We help you stay on schedule between flights.</p><p className="text-muted-foreground">From Gatwick to Heathrow, Luton, Stansted, or London City, our drivers know the fastest and most reliable routes.</p><p className="text-muted-foreground">Plan ahead and travel between terminals and airports without uncertainty.</p><Button className="bg-accent text-accent-foreground hover:bg-accent/90">Book a Taxi</Button></div></div></section>

      <section className="bg-secondary py-24 md:py-32"><div className="container mx-auto grid items-center gap-10 px-4 md:grid-cols-2"><div className="space-y-5"><p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">Your Gateway to London and Beyond</p><h2 className="text-3xl font-bold text-foreground">UKride: Your Gateway to Gatwick Airport Transfers</h2><p className="text-muted-foreground">Travel with confidence to and from Gatwick Airport using our pre-booked transfer service designed for speed, comfort, and reliability.</p><p className="text-muted-foreground">Our drivers assist with luggage, track flight updates, and ensure timely drop-offs across London and surrounding areas.</p><p className="text-muted-foreground">Book your Gatwick ride in advance and enjoy a stress-free journey from terminal to destination.</p><Button className="bg-accent text-accent-foreground hover:bg-accent/90">Book a Taxi</Button></div><img src="/airport_2.jpg" alt="Gatwick transfer travelers" className="h-[380px] w-full rounded-2xl object-cover shadow-lg" /></div></section>

      <section className="py-20 bg-secondary"><div className="container mx-auto px-4"><div className="mb-10 text-center"><h2 className="text-3xl font-bold text-foreground">Transfers to and from Gatwick Airport</h2></div><div className="mx-auto grid max-w-5xl gap-x-14 gap-y-12 md:grid-cols-2">{[{ title: "Punctuality Guaranteed", desc: "We schedule every journey with precision to keep your Gatwick pickup right on time.", icon: Plane }, { title: "Meet and greet service", desc: "Meet-and-greet options available for smooth arrivals and quick terminal exits.", icon: Car }, { title: "Why Choose Us", desc: "Professional drivers, quality vehicles, and dependable support for every trip.", icon: ThumbsUp }, { title: "Transparent Pricing", desc: "Clear, upfront pricing with no hidden airport transfer charges.", icon: BadgeDollarSign }].map((item) => { const Icon = item.icon; return <div key={item.title} className="text-center"><div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-highlight/15"><Icon className="h-8 w-8 text-[#d88700]" /></div><h3 className="mb-3 text-3xl font-medium text-foreground">{item.title}</h3><p className="mx-auto max-w-md text-base leading-8 text-foreground/85">{item.desc}</p></div>; })}</div></div></section>

      <section className="bg-secondary py-24 md:py-32"><div className="container mx-auto max-w-4xl px-4"><div className="mb-10 text-center"><h2 className="text-3xl font-bold text-foreground">Frequently Asked Questions</h2></div><Accordion type="single" collapsible className="w-full"><AccordionItem value="faq-1"><AccordionTrigger className="text-left text-lg font-medium text-foreground">How early should I book Gatwick airport transfer?</AccordionTrigger><AccordionContent className="text-muted-foreground">We recommend booking 6-12 hours earlier to secure your preferred vehicle and schedule.</AccordionContent></AccordionItem><AccordionItem value="faq-2"><AccordionTrigger className="text-left text-lg font-medium text-foreground">Do you cover both Gatwick terminals?</AccordionTrigger><AccordionContent className="text-muted-foreground">Yes, we provide pickup and drop-off for both North and South terminals.</AccordionContent></AccordionItem><AccordionItem value="faq-3"><AccordionTrigger className="text-left text-lg font-medium text-foreground">Can I book Gatwick to Heathrow transfer?</AccordionTrigger><AccordionContent className="text-muted-foreground">Yes, our inter-airport transfer service covers Gatwick to Heathrow and other London airports.</AccordionContent></AccordionItem></Accordion></div></section>

      <FullFooterSection />
    </div>
  );
}

