import { AirportCityPageTemplate } from "@/components/airports/AirportCityPageTemplate";

export default function GatwickAirportTransfersPage() {
  return (
    <AirportCityPageTemplate
      content={{
        airportName: "Gatwick",
        pillLabel: "Gatwick transfers",
        headline: (
          <>
            Book your Gatwick
            <br />
            <span className="bg-[linear-gradient(135deg,#C0C0C0_0%,#F8F8F8_50%,#A5A7AA_100%)] bg-clip-text text-transparent">
              airport transfer
            </span>
          </>
        ),
        subtitle:
          "Smooth Gatwick airport pickups and drop-offs with fixed fares and trusted local drivers.",
        heroImage: "/airport_2.jpg",
        intro: [
          "With UKride, book Gatwick transfers in minutes and travel with complete peace of mind. We coordinate pickups around your flight details and terminal timing.",
          "Whether you are heading into Central London or any nearby city, our professional drivers make your journey comfortable and punctual.",
          "Enjoy fixed pricing and reliable support from booking to drop-off.",
        ],
        reliable: [
          "Our Gatwick airport taxi service focuses on punctual pickups, clean vehicles, and experienced drivers who understand airport travel demands.",
          "From business rides to family travel, we deliver dependable transfers with clear communication and route efficiency.",
          "Book early and enjoy seamless airport-to-door transport with no last-minute stress.",
        ],
        interAirport: [
          "Switching airports in London is easier with our inter-airport transfer service. We help you stay on schedule between flights.",
          "From Gatwick to Heathrow, Luton, Stansted, or London City, our drivers know the fastest and most reliable routes.",
          "Plan ahead and travel between terminals without uncertainty.",
        ],
        gateway: [
          "Travel with confidence to and from Gatwick using our pre-booked transfer service designed for speed, comfort, and reliability.",
          "Our drivers assist with luggage, track flight updates, and ensure timely drop-offs across London and surrounding areas.",
          "Book your Gatwick ride in advance and enjoy a stress-free journey from terminal to destination.",
        ],
        terminals: ["North Terminal", "South Terminal"],
        faqs: [
          {
            q: "How early should I book my Gatwick airport transfer?",
            a: "We recommend booking 6–12 hours in advance to secure your preferred vehicle and schedule.",
          },
          {
            q: "Do you cover both Gatwick terminals?",
            a: "Yes — we provide pickup and drop-off for both North and South terminals.",
          },
          {
            q: "Can I book a Gatwick to Heathrow transfer?",
            a: "Yes — our inter-airport transfer service covers Gatwick to Heathrow and every other London airport.",
          },
        ],
      }}
    />
  );
}
