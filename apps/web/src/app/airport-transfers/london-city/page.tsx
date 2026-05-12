import { AirportCityPageTemplate } from "@/components/airports/AirportCityPageTemplate";

export default function LondonCityAirportTransfersPage() {
  return (
    <AirportCityPageTemplate
      content={{
        airportName: "London City",
        pillLabel: "London City transfers",
        headline: (
          <>
            Book your London City
            <br />
            <span className="bg-[linear-gradient(135deg,#C0C0C0_0%,#F8F8F8_50%,#A5A7AA_100%)] bg-clip-text text-transparent">
              airport transfer
            </span>
          </>
        ),
        subtitle:
          "Fast, premium transfers designed for London City Airport business and executive travel.",
        heroImage: "/airport_3.jpg",
        intro: [
          "Our London City Airport transfer service is ideal for business schedules, fast arrivals, and efficient city connections.",
          "From terminal pickup to office, hotel, or home drop-off, we deliver a reliable and premium transfer experience.",
          "Travel with fixed pricing and experienced drivers who value punctuality.",
        ],
        reliable: [
          "Our London City taxi service combines speed, comfort, and professionalism for smooth airport travel.",
          "We focus on timely pickups and high-standard vehicle quality for executive and family trips.",
          "Pre-book your ride for a dependable transfer every time.",
        ],
        interAirport: [
          "We offer fast inter-airport transfers from London City to Heathrow, Gatwick, Stansted, and Luton.",
          "Our drivers optimize your route and timing for smooth airport switching.",
          "Book in advance and keep your travel plans fully under control.",
        ],
        gateway: [
          "Navigate London City Airport transfers with confidence through our pre-booked, professional taxi service.",
          "We simplify pickups, luggage support, and timely drop-offs across London locations.",
          "Choose UKride for a smooth, premium, and dependable transfer experience.",
        ],
        faqs: [
          {
            q: "How early should I book a London City airport transfer?",
            a: "Book 6–12 hours earlier to secure your preferred time and vehicle type.",
          },
          {
            q: "Is London City transfer suitable for business travellers?",
            a: "Yes — this route is ideal for business travel with quick airport-to-city connections.",
          },
          {
            q: "Can I transfer from London City to Heathrow?",
            a: "Yes — we provide direct inter-airport transfers from London City to Heathrow and beyond.",
          },
        ],
      }}
    />
  );
}
