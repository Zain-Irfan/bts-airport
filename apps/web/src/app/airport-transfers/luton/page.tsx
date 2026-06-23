import { AirportCityPageTemplate } from "@/components/airports/AirportCityPageTemplate";

export default function LutonAirportTransfersPage() {
  return (
    <AirportCityPageTemplate
      content={{
        airportName: "Luton",
        pillLabel: "Luton transfers",
        headline: (
          <>
            Book your Luton
            <br />
            <span className="bg-[linear-gradient(135deg,#C0C0C0_0%,#F8F8F8_50%,#A5A7AA_100%)] bg-clip-text text-transparent">
              airport transfer
            </span>
          </>
        ),
        subtitle:
          "Affordable and reliable Luton airport taxis with transparent fares and professional drivers.",
        heroImage: "/images/airport-fleet-aerial.jpg",
        storyImages: {
          intro: "/images/mpv-airport-boarding.jpg",
          reliable: "/images/luxury-car-interior.jpg",
          inter: "/images/heathrow-mpv-family.jpg",
          gateway: "/images/executive-passenger.jpg",
        },
        intro: [
          "Our Luton transfer service is designed for convenience, punctual arrivals, and comfortable travel across London.",
          "Share your trip details and our professional drivers will manage timing, luggage support, and route planning.",
          "Travel confidently with fixed pricing and reliable 24/7 assistance.",
        ],
        reliable: [
          "We provide trusted Luton airport taxis with courteous drivers and efficient airport pickup management.",
          "From business to family trips, every transfer is handled with professionalism and punctuality.",
          "Reserve early for a smooth, fixed-fare journey to or from Luton.",
        ],
        interAirport: [
          "We provide fast inter-airport transfers from Luton to Heathrow, Gatwick, Stansted, and London City.",
          "Our drivers optimize routes so you can switch airports with less stress and better timing.",
          "Book ahead to travel between airports confidently.",
        ],
        gateway: [
          "Avoid last-minute travel issues with a pre-booked Luton taxi service tailored to your schedule.",
          "Our team coordinates terminal pickups and smooth drop-offs across London and nearby cities.",
          "Experience reliable airport transfers with comfort, timing, and support.",
        ],
        faqs: [
          {
            q: "How early should I book a Luton airport transfer?",
            a: "Book 6–12 hours in advance for better availability and smoother scheduling.",
          },
          {
            q: "Do you provide late-night Luton pickups?",
            a: "Yes — our service runs 24/7, including early-morning and late-night arrivals.",
          },
          {
            q: "Can I book a Luton-to-Heathrow transfer?",
            a: "Yes — we handle inter-airport rides between Luton and all major London airports.",
          },
        ],
      }}
    />
  );
}
