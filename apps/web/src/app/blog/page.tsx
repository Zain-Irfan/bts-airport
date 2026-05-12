import Link from "next/link";
import { CalendarDays, ArrowUpRight } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { FullFooterSection } from "@/components/FullFooterSection";
import { SiteTopHeader } from "@/components/layout/SiteTopHeader";

const blogImages = [
  "/airport_1.jpg",
  "/airport_2.jpg",
  "/airport_3.jpg",
  "/airport_4.jpg",
  "/airport_5.jpg",
  "/airport_6.jpg",
  "/perfect-taxi.jpg",
  "/fleet.jpg",
  "/hero-bg.jpg",
  "/app-mockup.jpg",
  "/saloon.jpg",
  "/mpv.jpg",
  "/executive.jpg",
];

const blogTitles = [
  "How to Save Money on Airport Transfers in London",
  "Heathrow Pickups: What to Book Before You Fly",
  "Best Times to Travel Across Central London",
  "Family Travel Tips for Stress-Free Taxi Journeys",
  "Business Taxi Booking Checklist for Teams",
  "Why Fixed Fare Transfers Are Better Than Metered Rides",
  "Meet and Greet vs Standard Pickup: Which Should You Choose?",
  "How to Choose the Right Vehicle for Luggage Capacity",
  "Station Transfers Made Easy for New Visitors",
  "Weekend Taxi Planning for Events in London",
  "Safe Night Travel in London: What to Look For",
  "How Early Should You Book an Airport Taxi?",
  "Taxi Transfer Tips for International Students",
  "5 Mistakes to Avoid While Booking a Taxi Online",
  "Benefits of Pre-Booking Your Transfer in Advance",
  "From Hotels to Airports: Reliable Transfer Planning",
  "Corporate Accounts for Frequent Taxi Bookings",
  "Travel Comfort Guide: Saloon, Executive, or MPV?",
  "London Transfer Routes with the Fastest Travel Times",
  "How to Get Better Value on Long-Distance Taxi Trips",
  "Airport Transfer Advice for Families With Children",
  "What Drivers Need to Know About London Pickup Zones",
  "How Live Flight Tracking Improves Airport Pickups",
  "Traveling During Peak Hours: Better Booking Strategies",
  "When to Use Executive Cars for Business Meetings",
  "Door-to-Door Transfer Benefits for Elderly Passengers",
  "Common Airport Transfer Questions Answered",
  "How Taxi Apps Help You Manage Multiple Bookings",
  "Best Practices for Early Morning Airport Journeys",
  "How to Compare Taxi Quotes Correctly",
  "Simpler Group Transfers: 8-Seater Booking Tips",
  "Holiday Transfer Planning for Busy Travel Dates",
  "How to Avoid Last-Minute Taxi Booking Stress",
  "Guide to Reliable Station Taxi Connections",
  "How to Prepare for a Smooth Pickup Experience",
  "Understanding Transfer Pricing: Taxes, Tolls, and Fees",
  "Airport Taxi Etiquette for Quick and Easy Boarding",
  "How to Plan Return Journey Transfers in One Booking",
  "What to Share With Drivers Before Your Ride",
  "Airport Transfers for Solo Travelers: Safety First",
];

const categories = ["Airport", "City", "Executive", "Family", "Business", "Tips"];

const posts = blogTitles.map((title, index) => ({
  title,
  href: "/blog",
  image: blogImages[index % blogImages.length],
  date: `2026-0${(index % 9) + 1}-${String((index % 27) + 1).padStart(2, "0")}`,
  category: categories[index % categories.length],
  excerpt:
    "Practical UKride travel guidance for smoother, safer, and more cost-effective journeys across London.",
}));

export default function BlogPage() {
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
      <section className="ukride-hero-ambient ukride-luxury-section-2 ukride-grid-bg relative overflow-hidden py-20 md:py-28">
        <div className="container mx-auto px-4 text-center">
          <span className="ukride-pill">UKride journal</span>
          <h1 className="mx-auto mt-6 max-w-3xl text-4xl font-bold tracking-tight text-[#F8F8F8] md:text-5xl">
            Travel notes, transfer tips &amp; London journeys
          </h1>
          <div className="ukride-divider mx-auto mt-6 w-24" />
          <p className="mx-auto mt-6 max-w-2xl text-[15px] leading-relaxed text-[#CFCFCF]">
            Practical guides and editorial briefings on everything from
            airport transfers to executive travel, written by the UKride team.
          </p>
        </div>
      </section>

      {/* Blog grid */}
      <section className="ukride-section-charcoal relative py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="mb-10 flex flex-col items-start justify-between gap-3 md:flex-row md:items-end">
            <div>
              <h2 className="text-2xl font-semibold tracking-tight text-[#F8F8F8] md:text-3xl">
                Latest stories
              </h2>
              <p className="mt-2 text-sm text-[#A5A7AA]">
                Curated reads from the UKride editorial desk.
              </p>
            </div>
            <span className="text-xs uppercase tracking-[0.18em] text-[#A5A7AA]">
              {posts.length} articles
            </span>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {posts.map((post, index) => (
              <article
                key={`${post.title}-${index}`}
                className="ukride-vehicle-card group"
              >
                <Link href={post.href} className="block">
                  <div className="ukride-vehicle-media relative h-40">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="h-full w-full object-cover"
                    />
                    <span className="absolute left-3 top-3 z-10 rounded-full border border-[rgba(192,192,192,0.22)] bg-[rgba(13,13,15,0.65)] px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#C0C0C0] backdrop-blur">
                      {post.category}
                    </span>
                  </div>
                </Link>
                <div className="space-y-3 p-5">
                  <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] text-[#A5A7AA]">
                    <CalendarDays className="h-3.5 w-3.5" />
                    {post.date}
                  </div>
                  <h3 className="line-clamp-2 text-[15px] font-semibold leading-snug tracking-tight text-[#F8F8F8] transition-colors group-hover:text-[#E5E7EB]">
                    {post.title}
                  </h3>
                  <p className="line-clamp-2 text-xs leading-5 text-[#A5A7AA]">
                    {post.excerpt}
                  </p>
                  <Link
                    href={post.href}
                    className="inline-flex items-center gap-1.5 pt-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#C0C0C0] transition-colors hover:text-[#F8F8F8]"
                  >
                    Read article
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <FullFooterSection />
    </div>
  );
}
