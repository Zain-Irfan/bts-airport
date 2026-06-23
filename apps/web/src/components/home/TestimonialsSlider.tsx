"use client";

import { useState } from "react";
import { Star } from "lucide-react";

const REVIEWS = [
  { name: "James Thornton",    location: "London, UK",       rating: 5, date: "2 weeks ago",   text: "Absolutely outstanding service. My driver was waiting at arrivals with a name board, helped with all my luggage and got me to the hotel ahead of schedule." },
  { name: "Sarah Mitchell",    location: "Manchester, UK",   rating: 5, date: "1 month ago",   text: "The fixed price quote was exactly what I paid — no surprises whatsoever. Driver was professional, car was spotless. Brilliant experience from booking to drop-off." },
  { name: "Amara Osei",        location: "London, UK",       rating: 5, date: "3 weeks ago",   text: "My flight was delayed by 2 hours and the driver was still there waiting. No extra charge either. That level of service is rare. Highly recommended." },
  { name: "David Chen",        location: "Singapore",        rating: 5, date: "1 week ago",    text: "Used BTS for a Gatwick transfer. Booking was simple, confirmation instant, and the executive car was superb. Will definitely use again on my next London trip." },
  { name: "Emma Williams",     location: "Bristol, UK",      rating: 5, date: "5 days ago",    text: "Booked a chauffeur for our wedding anniversary. The car was immaculate, driver was courteous and discreet. Made the evening truly special." },
  { name: "Michael Adeyemi",   location: "Lagos, Nigeria",   rating: 5, date: "2 months ago",  text: "Every time I visit London for business I use BTS. Punctual, reliable, professional. The corporate billing is very convenient for my company." },
  { name: "Priya Sharma",      location: "Birmingham, UK",   rating: 5, date: "3 days ago",    text: "Incredible value for money. The car was clean, modern, and the driver was very friendly. Arrived exactly on time for my early morning Heathrow flight." },
  { name: "Robert Hayes",      location: "Edinburgh, UK",    rating: 5, date: "2 weeks ago",   text: "I've used many transfer services in London but BTS is by far the best. The meet & greet service at Gatwick was seamless. 10/10 would recommend." },
  { name: "Fatima Al-Hassan",  location: "Dubai, UAE",       rating: 5, date: "1 week ago",    text: "Used BTS during my London business trip. The executive saloon was pristine and the driver was very knowledgeable about London. Will book again without hesitation." },
  { name: "Tom Bradley",       location: "Liverpool, UK",    rating: 5, date: "4 weeks ago",   text: "Booked for a group of 7 people. The minibus was on time, spacious and the driver helped with all our bags. Great experience for a very reasonable price." },
  { name: "Yuki Tanaka",       location: "Tokyo, Japan",     rating: 5, date: "6 days ago",    text: "As an international traveller, I was impressed by how easy the booking process was. The driver spoke clearly and helped me with local information. Top service." },
  { name: "Claire Dubois",     location: "Paris, France",    rating: 5, date: "10 days ago",   text: "Came to London for a conference. BTS picked me up from Stansted and dropped me right at the venue. Perfect timing, no stress at all. Excellent service." },
  { name: "Ahmed Khalil",      location: "Riyadh, Saudi",   rating: 5, date: "3 weeks ago",   text: "The chauffeur service was extraordinary. Very professional driver, amazing luxury car. I felt like a VIP the entire journey. BTS exceeded all my expectations." },
  { name: "Lucy Patterson",    location: "Leeds, UK",        rating: 5, date: "1 month ago",   text: "Reliable, safe and affordable. Used BTS three times now and every single experience has been perfect. My go-to taxi service whenever I'm in London." },
  { name: "Carlos Mendez",     location: "Madrid, Spain",    rating: 5, date: "2 weeks ago",   text: "Very impressed with the punctuality and professionalism. My driver tracked my delayed flight and was ready right when I needed him. Will use again." },
  { name: "Nadia Kowalski",    location: "Warsaw, Poland",   rating: 5, date: "5 weeks ago",   text: "Friendly driver, clean vehicle, fair price. The baby seat I requested was already fitted when I got in. Very thoughtful and professional service." },
  { name: "Ben Foster",        location: "London, UK",       rating: 5, date: "1 week ago",    text: "Used the electric vehicle option — a fantastic Tesla. Super quiet, smooth ride and very eco-friendly. Great initiative by BTS. Loved every second." },
  { name: "Olivia Chang",      location: "Hong Kong",        rating: 5, date: "3 weeks ago",   text: "Booked from Hong Kong before my trip. The entire process was smooth online. Driver was there at Heathrow exactly as promised. Absolutely brilliant service." },
  { name: "Marcus Johnson",    location: "Birmingham, UK",   rating: 5, date: "2 days ago",    text: "Best taxi service I've ever used in London. Driver arrived 5 minutes early and the car was immaculate. The whole experience was first class." },
  { name: "Sophie Laurent",    location: "Lyon, France",     rating: 5, date: "1 month ago",   text: "I travel to London frequently for work and BTS is my only choice. Always on time, always professional. The fixed pricing means absolutely no bill shock." },
  { name: "Daniel Okonkwo",    location: "Abuja, Nigeria",   rating: 5, date: "4 days ago",    text: "Outstanding from start to finish. The booking confirmation came within minutes, the driver sent his location in advance. Pure professionalism at every step." },
  { name: "Hannah Clarke",     location: "Oxford, UK",       rating: 5, date: "2 weeks ago",   text: "Perfect for early morning airport runs. Driver was cheerful at 4am, helped load the bags and the car was warm and comfortable. Highly recommend BTS." },
];

const ROW1 = REVIEWS;

function ReviewCard({ review }: { review: typeof REVIEWS[0] }) {
  const initials = review.name.split(" ").map(n => n[0]).join("").slice(0, 2);
  const colors = [
    { bg: "rgba(75,0,130,0.35)",   text: "#C084FC" },
    { bg: "rgba(0,100,100,0.35)",  text: "#5EEAD4" },
    { bg: "rgba(120,50,0,0.35)",   text: "#FDBA74" },
    { bg: "rgba(0,60,120,0.35)",   text: "#93C5FD" },
    { bg: "rgba(100,0,60,0.35)",   text: "#F9A8D4" },
  ];
  const color = colors[review.name.charCodeAt(0) % colors.length];

  return (
    <div className="mx-4 flex w-[480px] shrink-0 flex-col gap-5 rounded-2xl border border-[rgba(192,192,192,0.1)] bg-[rgba(30,30,36,0.85)] p-7 shadow-[0_8px_32px_-8px_rgba(0,0,0,0.4)] backdrop-blur-md">
      {/* Top row: stars + Google icon */}
      <div className="flex items-center justify-between">
        <div className="flex gap-0.5">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} className="h-4 w-4 fill-[#FBBF24] text-[#FBBF24]" />
          ))}
        </div>
        {/* Google-style G */}
        <div className="flex h-7 w-7 items-center justify-center rounded-full bg-white text-xs font-bold" style={{ color: "#4285F4" }}>G</div>
      </div>

      {/* Review text */}
      <p className="text-[15px] leading-relaxed text-[#CFCFCF]">"{review.text}"</p>

      {/* Author */}
      <div className="flex items-center gap-3 border-t border-[rgba(192,192,192,0.2)] pt-3">
        <div
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xs font-bold"
          style={{ background: color.bg, color: color.text }}
        >
          {initials}
        </div>
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold text-[#F8F8F8]">{review.name}</p>
          <p className="text-xs text-[#6B7280]">{review.location} · {review.date}</p>
        </div>
      </div>
    </div>
  );
}

export function TestimonialsSlider() {
  const [paused, setPaused] = useState(false);
  const doubled = [...ROW1, ...ROW1];

  return (
    <div className="relative overflow-hidden">
      {/* Left fade */}
      <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-32 bg-[linear-gradient(to_right,#0D0D12,transparent)]" />
      {/* Right fade */}
      <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-32 bg-[linear-gradient(to_left,#0D0D12,transparent)]" />

      <div className="flex overflow-hidden">
        <div
          className="flex"
          style={{
            animation: `marquee ${ROW1.length * 6}s linear infinite`,
            animationPlayState: paused ? "paused" : "running",
            width: "max-content",
          }}
        >
          {doubled.map((r, i) => (
            <div
              key={i}
              onMouseEnter={() => setPaused(true)}
              onMouseLeave={() => setPaused(false)}
            >
              <ReviewCard review={r} />
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes marquee {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}
