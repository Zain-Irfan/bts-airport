import Link from "next/link";
import { CalendarDays } from "lucide-react";
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

const posts = blogTitles.map((title, index) => ({
  title,
  href: "/blog",
  image: blogImages[index % blogImages.length],
  date: `2026-0${(index % 9) + 1}-${String((index % 27) + 1).padStart(2, "0")}`,
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

      <section className="bg-card py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="mb-8 flex items-end justify-between gap-3">
            <h1 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">Blog</h1>
            <p className="text-sm text-muted-foreground">Latest stories, travel tips, and updates</p>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {posts.map((post, index) => (
              <article
                key={`${post.title}-${index}`}
                className="group overflow-hidden rounded-md border border-border bg-background shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
              >
                <Link href={post.href} className="block">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="h-36 w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </Link>
                <div className="space-y-3 p-3">
                  <h2 className="line-clamp-2 text-sm font-semibold leading-5 text-foreground">{post.title}</h2>
                  <p className="line-clamp-2 text-xs leading-5 text-muted-foreground">{post.excerpt}</p>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <CalendarDays className="h-3.5 w-3.5" />
                    {post.date}
                  </div>
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
