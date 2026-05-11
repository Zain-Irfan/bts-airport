import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { MapPin, CalendarIcon, Clock, Users, Briefcase, Plane, Star, Phone, Facebook, Instagram, ChevronDown, CheckCircle2, ShieldCheck, Zap, UserCheck } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

export default function Home() {
  const [date, setDate] = useState<Date>();

  return (
    <div className="min-h-screen bg-background font-sans text-foreground">
      {/* 1. Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
        <div className="container mx-auto flex h-20 items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Plane className="h-6 w-6" />
            </div>
            <span className="text-2xl font-bold tracking-tight text-primary">UKRide</span>
          </div>
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
            <a href="#" className="transition-colors hover:text-accent">Services</a>
            <a href="#" className="transition-colors hover:text-accent">Fleet</a>
            <a href="#" className="transition-colors hover:text-accent">Airports</a>
            <a href="#" className="transition-colors hover:text-accent">Contact</a>
          </nav>
          <div className="flex items-center gap-4">
            <Button variant="outline" className="hidden sm:inline-flex">Log In</Button>
            <Button className="bg-accent text-accent-foreground hover:bg-accent/90">Sign Up</Button>
          </div>
        </div>
      </header>

      {/* 2. Hero Section & 3. Booking Form */}
      <section className="relative bg-primary pt-16 pb-32 text-primary-foreground lg:pt-24 lg:pb-40">
        <div className="absolute inset-0 overflow-hidden bg-primary">
          <img src="/hero-bg.jpg" alt="London at night" className="absolute inset-0 w-full h-full object-cover opacity-10 mix-blend-overlay" />
          <div className="absolute inset-0 bg-gradient-to-b from-primary/80 to-primary z-10"></div>
        </div>
        
        <div className="container relative z-20 mx-auto px-4">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-8 items-center">
            
            <div className="space-y-8">
              <div className="inline-flex items-center rounded-full border border-primary-foreground/20 bg-primary-foreground/10 px-3 py-1 text-sm">
                <Star className="mr-2 h-4 w-4 fill-accent text-accent" />
                <span className="font-semibold">4.9</span>
                <span className="mx-2 text-primary-foreground/50">|</span>
                <span>1538+ Google Reviews</span>
              </div>
              
              <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
                London Taxi Services <br/>
                <span className="text-accent">— Anytime You Need</span>
              </h1>
              
              <p className="text-lg text-primary-foreground/80 max-w-xl">
                Pre-Booked Transfers To-From-Within London. Reliable, professional, and guaranteed lowest prices.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary-foreground/10">
                    <Phone className="h-5 w-5 text-accent" />
                  </div>
                  <div>
                    <p className="text-xs text-primary-foreground/60 uppercase tracking-wider">Book by Phone</p>
                    <p className="text-lg font-bold">+44 7700 1409 00</p>
                  </div>
                </div>
                <div className="hidden sm:block w-px bg-primary-foreground/20"></div>
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary-foreground/10">
                    <Phone className="h-5 w-5 text-accent" />
                  </div>
                  <div>
                    <p className="text-xs text-primary-foreground/60 uppercase tracking-wider">Support</p>
                    <p className="text-lg font-bold">+44 2080 5090 14</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Booking Form */}
            <Card className="shadow-2xl border-0 bg-white text-foreground">
              <CardContent className="p-6 sm:p-8 space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between border-b pb-4">
                    <h3 className="text-xl font-bold text-primary">Book Your Transfer</h3>
                    <div className="text-sm font-medium text-muted-foreground flex items-center gap-1 cursor-pointer hover:text-primary">
                      Return Journey <ChevronDown className="h-4 w-4" />
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="relative">
                      <MapPin className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                      <Input placeholder="Pickup Address or Airport" className="pl-10 h-12 bg-muted/50 border-0 focus-visible:ring-1" />
                    </div>
                    <div className="flex justify-end -mt-1 -mb-1 relative z-10 pr-2">
                      <span className="text-xs font-medium text-primary bg-secondary px-2 py-1 rounded-md cursor-pointer hover:bg-primary hover:text-white transition-colors">+ Add Via</span>
                    </div>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-3 h-5 w-5 text-accent fill-accent" />
                      <Input placeholder="Dropoff Address or Airport" className="pl-10 h-12 bg-muted/50 border-0 focus-visible:ring-1" />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    <div className="space-y-1.5">
                      <label className="text-xs font-medium text-muted-foreground">Date</label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button variant="outline" className="w-full justify-start text-left font-normal bg-muted/50 border-0 h-10 px-3">
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {date ? format(date, "PPP") : <span>Select</span>}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
                        </PopoverContent>
                      </Popover>
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-medium text-muted-foreground">Time</label>
                      <Select>
                        <SelectTrigger className="bg-muted/50 border-0 h-10">
                          <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                          <SelectValue placeholder="12:00" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="12:00">12:00</SelectItem>
                          <SelectItem value="12:30">12:30</SelectItem>
                          <SelectItem value="13:00">13:00</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-medium text-muted-foreground">Persons</label>
                      <Select>
                        <SelectTrigger className="bg-muted/50 border-0 h-10">
                          <Users className="mr-2 h-4 w-4 text-muted-foreground" />
                          <SelectValue placeholder="1" />
                        </SelectTrigger>
                        <SelectContent>
                          {[1,2,3,4,5,6,7,8,9,10].map(n => <SelectItem key={n} value={n.toString()}>{n}</SelectItem>)}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-medium text-muted-foreground">Luggage</label>
                      <Select>
                        <SelectTrigger className="bg-muted/50 border-0 h-10">
                          <Briefcase className="mr-2 h-4 w-4 text-muted-foreground" />
                          <SelectValue placeholder="0" />
                        </SelectTrigger>
                        <SelectContent>
                          {[0,1,2,3,4,5,6,7,8,9,10].map(n => <SelectItem key={n} value={n.toString()}>{n}</SelectItem>)}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-3">
                     <div className="space-y-1.5">
                      <label className="text-xs font-medium text-muted-foreground">Flight Number (Optional)</label>
                      <div className="relative">
                        <Plane className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                        <Input placeholder="e.g. BA123" className="pl-10 h-10 bg-muted/50 border-0 focus-visible:ring-1" />
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-medium text-muted-foreground">Meet & Greet</label>
                      <Select defaultValue="yes">
                        <SelectTrigger className="bg-muted/50 border-0 h-10">
                          <SelectValue placeholder="Yes" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="yes">Yes (+£10)</SelectItem>
                          <SelectItem value="no">No</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <Button size="lg" className="w-full h-14 text-lg font-bold bg-accent text-accent-foreground hover:bg-accent/90 shadow-lg shadow-accent/20">
                    Get Quote & Book Now
                  </Button>
                </div>
              </CardContent>
            </Card>

          </div>
        </div>
      </section>

      {/* 4. Feature Icons Row */}
      <section className="py-12 bg-white relative z-10 -mt-10 mx-4 lg:mx-auto max-w-7xl rounded-2xl shadow-xl border border-muted">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 divide-y md:divide-y-0 md:divide-x divide-muted">
            <div className="flex flex-col items-center text-center px-4 pt-4 md:pt-0">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Clock className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-bold mb-2">45-Min Grace Period</h3>
              <p className="text-sm text-muted-foreground">Get the free 45-minute waiting period and make your airport checkouts stress-free.</p>
            </div>
            <div className="flex flex-col items-center text-center px-4 pt-4 md:pt-0">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <ShieldCheck className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-bold mb-2">Quality Vehicles</h3>
              <p className="text-sm text-muted-foreground">We provide well-managed road-ready vehicles to ensure a comfortable ride.</p>
            </div>
            <div className="flex flex-col items-center text-center px-4 pt-4 md:pt-0">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Zap className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-bold mb-2">Available 24/7</h3>
              <p className="text-sm text-muted-foreground">We ensure 24/7 availability to make your London airport transfers hassle free.</p>
            </div>
            <div className="flex flex-col items-center text-center px-4 pt-4 md:pt-0">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <CheckCircle2 className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-bold mb-2">Lowest Price Guaranteed</h3>
              <p className="text-sm text-muted-foreground">Get the lowest prices available in the market when booking with UKride.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Pre-Book Taxis Section */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-primary">Pre-Book Taxis Online with UK Ride</h2>
          <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
            UK Ride is your trusted partner for all transport needs across London and its major airports. Whether you're heading to a crucial business meeting, catching a flight from Heathrow, or simply exploring the city, our pre-booking platform ensures a seamless, comfortable journey from start to finish.
          </p>
          <p className="text-lg text-muted-foreground mb-10 leading-relaxed">
            With transparent pricing, professional drivers, and a diverse fleet tailored to your requirements, we take the stress out of London travel. Secure your ride in minutes and experience transport the way it should be.
          </p>
          <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 px-8">
            Book a Taxi
          </Button>
        </div>
      </section>

      {/* 6. Perfect Taxi Service Section */}
      <section className="py-24 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold text-primary">Find the Perfect Taxi Service for Every Journey</h2>
              <p className="text-lg text-muted-foreground">
                Our services are designed to cater to every specific requirement. From standard point-to-point transfers to extensive corporate roadshows, we have the logistical capability and the premium vehicles to deliver excellence.
              </p>
              <ul className="space-y-4 pt-4">
                {[
                  "Executive business travel for seamless productivity",
                  "Spacious minivans for family trips and group tours",
                  "Luxury chauffeurs for special occasions",
                  "Dedicated account management for corporate clients"
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="h-6 w-6 text-accent flex-shrink-0" />
                    <span className="font-medium text-foreground/80">{item}</span>
                  </li>
                ))}
              </ul>
              <div className="pt-6">
                <Button size="lg" className="bg-primary text-primary-foreground">
                  Explore Services
                </Button>
              </div>
            </div>
            <div className="relative h-[500px] rounded-2xl overflow-hidden shadow-xl">
              <img 
                src="/perfect-taxi.jpg" 
                alt="Perfect Taxi Service" 
                className="absolute inset-0 h-full w-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 7. Why UK Ride Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center flex-row-reverse">
            <div className="order-2 md:order-1 relative h-[500px] rounded-2xl overflow-hidden shadow-xl">
              <img 
                src="/fleet.jpg" 
                alt="UKRide Fleet" 
                className="absolute inset-0 h-full w-full object-cover"
              />
            </div>
            <div className="order-1 md:order-2 space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold text-primary">Why UK Ride is the Right Choice</h2>
              <p className="text-lg text-muted-foreground">
                We don't just provide a ride; we provide a reliable transport partnership. With a focus on professionalism, punctuality, and comfort, UKRide stands out as London's premier transfer service.
              </p>
              <ul className="space-y-4 pt-4">
                {[
                  "Fully Insured & Licensed Drivers",
                  "Modern, Eco-Friendly EV Options",
                  "Fixed, Transparent Pricing — No Hidden Fees",
                  "Complimentary Meet & Greet Service"
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="h-6 w-6 text-primary flex-shrink-0" />
                    <span className="font-medium text-foreground/80">{item}</span>
                  </li>
                ))}
              </ul>
              <div className="pt-6">
                <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
                  Book a Taxi
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. London Airport Transfers */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">London Airport Transfers</h2>
            <p className="text-lg text-muted-foreground">
              Reliable, punctual transfers to and from all major London airports. We monitor your flight to ensure we're there exactly when you need us.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { name: "Heathrow Airport", desc: "Terminal 2, 3, 4, 5 transfers", img: "/airport_1.jpg" },
              { name: "Gatwick Airport", desc: "North and South terminal services", img: "/airport_2.jpg" },
              { name: "London City Airport", desc: "Fast business hub connections", img: "/airport_3.jpg" },
              { name: "Luton Airport", desc: "Budget airline connections", img: "/airport_4.jpg" },
              { name: "Stansted Airport", desc: "Reliable northern hub transfers", img: "/airport_5.jpg" },
              { name: "Southend Airport", desc: "Eastern connection specialist", img: "/airport_6.jpg" }
            ].map((airport, i) => (
              <Card key={i} className="overflow-hidden group cursor-pointer border-0 shadow-lg hover:shadow-xl transition-all">
                <div className="relative h-48 overflow-hidden">
                  <div className="absolute inset-0 bg-primary/20 group-hover:bg-primary/10 transition-colors z-10" />
                  <img src={airport.img} alt={airport.name} className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <CardContent className="p-6 bg-white">
                  <h3 className="text-xl font-bold text-primary mb-2">{airport.name}</h3>
                  <p className="text-muted-foreground">{airport.desc}</p>
                  <Button variant="link" className="px-0 mt-4 text-accent hover:text-primary font-semibold">
                    Book Transfer &rarr;
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* 9. Vehicle Fleet Section */}
      <section className="py-24 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">Luxury Vehicles for Every Desire</h2>
            <p className="text-lg text-muted-foreground">
              From eco-friendly electrics to spacious minivans, our immaculately maintained fleet is ready to serve.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { name: "Saloon", pax: 4, hand: 1, lug: 2, img: "/saloon.jpg" },
              { name: "Executive", pax: 4, hand: 1, lug: 1, img: "/executive.jpg" },
              { name: "Estate", pax: 4, hand: 2, lug: 3, img: "/estate.jpg" },
              { name: "MPV", pax: 6, hand: 3, lug: 4, img: "/mpv.jpg" },
              { name: "8 Seater Minibus", pax: 8, hand: 4, lug: 6, img: "/mpv.jpg" },
              { name: "Electric", pax: 4, hand: 2, lug: 1, img: "/saloon.jpg" },
              { name: "Chauffeur", pax: 4, hand: 1, lug: 2, img: "/chauffeur.jpg" }
            ].map((vehicle, i) => (
              <Card key={i} className="border-0 shadow-md">
                <div className="p-6 pb-0">
                  <h3 className="text-xl font-bold text-primary mb-1">{vehicle.name}</h3>
                  <div className="flex gap-4 text-sm text-muted-foreground mb-4">
                    <span className="flex items-center gap-1"><Users className="h-4 w-4"/> {vehicle.pax}</span>
                    <span className="flex items-center gap-1"><Briefcase className="h-4 w-4"/> {vehicle.hand}</span>
                    <span className="flex items-center gap-1"><Briefcase className="h-4 w-4"/> {vehicle.lug}</span>
                  </div>
                </div>
                <div className="px-6 pb-6">
                  <img src={vehicle.img} alt={vehicle.name} className="w-full h-32 object-cover rounded-md mb-4" />
                  <Button className="w-full bg-primary hover:bg-primary/90">Book {vehicle.name}</Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* 10. Why Choose UKRide Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 text-center max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6">Why Choose UKRide for Your London Travel?</h2>
          <p className="text-lg text-muted-foreground leading-relaxed mb-6">
            Navigating London's busy streets and airports requires local expertise and reliable logistics. We've built our reputation on ensuring every passenger reaches their destination comfortably and safely. Our advanced booking system, flight monitoring technology, and dedicated customer support team work in tandem to deliver an unparalleled service experience.
          </p>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Whether you are a solo traveler, a family on vacation, or a corporate team, we have the right vehicle and the right driver for you. Experience the UKRide difference today.
          </p>
        </div>
      </section>

      {/* 11. App Download Section */}
      <section className="py-24 bg-primary text-primary-foreground overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <h2 className="text-3xl md:text-5xl font-bold">Get an Instant Quote with the UKRide App!</h2>
              <p className="text-lg text-primary-foreground/80">
                Book your ride faster, track your driver in real-time, and manage all your bookings from your pocket. Available on iOS and Android.
              </p>
              <div className="flex flex-wrap gap-4 pt-4">
                <Button size="lg" variant="outline" className="bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary h-14 px-8">
                  App Store
                </Button>
                <Button size="lg" variant="outline" className="bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary h-14 px-8">
                  Google Play
                </Button>
              </div>
            </div>
            <div className="relative flex justify-center mt-12 md:mt-0">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-accent rounded-full blur-3xl opacity-20"></div>
              <img 
                src="/app-mockup.jpg" 
                alt="App Mockup" 
                className="relative z-10 w-[280px] h-[580px] object-cover rounded-[3rem] border-[8px] border-primary-foreground/20 shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 12. FAQ Accordion */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">Frequently Asked Questions</h2>
            <p className="text-lg text-muted-foreground">Everything you need to know about booking with UKRide.</p>
          </div>

          <Accordion type="single" collapsible className="w-full">
            {[
              "How far in advance should I book my airport transfer?",
              "What happens if my flight is delayed?",
              "Are your prices fixed or metered?",
              "Do you provide child seats?",
              "How do I find my driver at the airport?",
              "What payment methods do you accept?",
              "Can I cancel or amend my booking?",
              "Is the 45-minute waiting time really free?",
            ].map((q, i) => (
              <AccordionItem key={i} value={`item-${i}`}>
                <AccordionTrigger className="text-left text-lg font-medium text-primary py-4">{q}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* 13. CTA Banner */}
      <section className="py-24 relative overflow-hidden bg-primary flex items-center justify-center min-h-[400px]">
        <div className="absolute inset-0 bg-primary flex items-center justify-center overflow-hidden">
          <div className="absolute w-full h-full bg-primary/80 z-10"></div>
          <img src="/cta-bg.jpg" alt="London taxi at night" className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-50" />
        </div>
        <div className="container relative z-20 text-center px-4">
          <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-6 tracking-tight">ARE YOU READY TO HIRE?</h2>
          <p className="text-xl text-white/80 max-w-2xl mx-auto mb-10">
            Experience the pinnacle of London transport. Professional, reliable, and always on time.
          </p>
          <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 h-14 px-10 text-lg font-bold shadow-xl shadow-accent/20">
            Book a Taxi Now
          </Button>
        </div>
      </section>

      {/* 14. Footer */}
      <footer className="bg-primary text-primary-foreground pt-20 pb-10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
            
            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-6">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent text-accent-foreground">
                  <Plane className="h-5 w-5" />
                </div>
                <span className="text-xl font-bold tracking-tight">UKRide</span>
              </div>
              <p className="text-primary-foreground/70">
                Premium London taxi and airport transfer services. Reliable, professional, and guaranteed lowest prices.
              </p>
              <div className="flex items-center gap-3 pt-4 text-primary-foreground/90">
                <Phone className="h-5 w-5 text-accent" />
                <span>+44 7700 1409 00</span>
              </div>
              <div className="flex items-center gap-3 text-primary-foreground/90">
                <Phone className="h-5 w-5 text-accent" />
                <span>+44 2080 5090 14</span>
              </div>
            </div>

            <div>
              <h4 className="text-lg font-bold mb-6">UKride Address</h4>
              <address className="not-italic text-primary-foreground/70 mb-6 leading-loose">
                450 Bath Rd,<br />
                London UB7 0EB<br />
                United Kingdom
              </address>
              <div className="flex gap-4">
                <a href="#" className="h-10 w-10 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-accent hover:text-accent-foreground transition-colors">
                  <Facebook className="h-5 w-5" />
                </a>
                <a href="#" className="h-10 w-10 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-accent hover:text-accent-foreground transition-colors">
                  <Instagram className="h-5 w-5" />
                </a>
              </div>
            </div>

            <div>
              <h4 className="text-lg font-bold mb-6">London Airports</h4>
              <ul className="space-y-3 text-primary-foreground/70">
                <li><a href="#" className="hover:text-accent transition-colors">Heathrow Airport</a></li>
                <li><a href="#" className="hover:text-accent transition-colors">Gatwick Airport</a></li>
                <li><a href="#" className="hover:text-accent transition-colors">Luton Airport</a></li>
                <li><a href="#" className="hover:text-accent transition-colors">London City Airport</a></li>
                <li><a href="#" className="hover:text-accent transition-colors">Stansted Airport</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-bold mb-6">Useful Links</h4>
              <ul className="space-y-3 text-primary-foreground/70">
                <li><a href="#" className="hover:text-accent transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-accent transition-colors">Our Fleet</a></li>
                <li><a href="#" className="hover:text-accent transition-colors">Terms & Conditions</a></li>
                <li><a href="#" className="hover:text-accent transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-accent transition-colors">Contact Support</a></li>
              </ul>
            </div>

          </div>

          <div className="border-t border-primary-foreground/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-primary-foreground/50">
            <p>Copyright © 2025 UkRide. All rights reserved.</p>
            <p>Designed for professional transport.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
