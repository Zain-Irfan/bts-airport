import { AirportCityPageTemplate } from "@/components/airports/AirportCityPageTemplate";

export default function SouthendAirportTransfersPage() {
  return (
    <AirportCityPageTemplate
      content={{
        airportName: "Southend",
        pillLabel: "Southend transfers",
        headline: (
          <>
            Book your Southend
            <br />
            <span className="bg-[linear-gradient(135deg,#C0C0C0_0%,#F8F8F8_50%,#A5A7AA_100%)] bg-clip-text text-transparent">
              airport transfer
            </span>
          </>
        ),
        subtitle:
          "Reliable Southend airport transfers with easy pre-booking and clear trip details.",
        heroImage: "/airport_6.jpg",
        intro: [
          "Travel between Southend Airport and London with confidence. Our pre-booked transfer service handles every step — from pickup timing to luggage support.",
          "Whether you're commuting for work or starting a holiday, our drivers ensure a smooth, comfortable ride at a fixed fare.",
          "Pre-book today and enjoy stress-free Southend transfers, day or night.",
        ],
        reliable: [
          "Our Southend transfer service is built on consistent quality — clean vehicles, punctual drivers, and clear communication.",
          "We optimize every route so your journey to or from the airport stays efficient and predictable.",
          "Reserve your ride early for a calm, dependable transfer experience.",
        ],
        interAirport: [
          "Connect Southend with Heathrow, Gatwick, Luton, Stansted, or London City through our inter-airport transfer service.",
          "We track flight schedules and traffic to keep your airport-switching plan on time.",
          "Book ahead to stay fully in control of every transfer leg.",
        ],
        gateway: [
          "UKride makes Southend transfers simple — one pre-booked ride from terminal to your destination.",
          "Our team coordinates timing and logistics so you can focus on travelling, not on transport.",
          "Choose UKride for a reliable, comfortable, and well-priced Southend airport transfer.",
        ],
        faqs: [
          {
            q: "How early should I book a Southend airport transfer?",
            a: "Book 6–12 hours in advance to lock in the best vehicle and route.",
          },
          {
            q: "Do you cover Southend-to-Central-London routes?",
            a: "Yes — Southend to any London zone is available at a fixed fare.",
          },
          {
            q: "Is Southend included in your inter-airport service?",
            a: "Yes — we connect Southend with every major London airport.",
          },
        ],
      }}
    />
  );
}
