import { AirportCityPageTemplate } from "@/components/airports/AirportCityPageTemplate";

export default function StanstedAirportTransfersPage() {
  return (
    <AirportCityPageTemplate
      content={{
        airportName: "Stansted",
        pillLabel: "Stansted transfers",
        headline: (
          <>
            Book your Stansted
            <br />
            <span className="bg-[linear-gradient(135deg,#C0C0C0_0%,#F8F8F8_50%,#A5A7AA_100%)] bg-clip-text text-transparent">
              airport transfer
            </span>
          </>
        ),
        subtitle:
          "Trusted Stansted airport rides with fixed fares, professional drivers, and 24/7 support.",
        heroImage: "/images/airport-fleet-aerial.jpg",
        storyImages: {
          intro: "/images/mpv-airport-boarding.jpg",
          reliable: "/images/executive-passenger.jpg",
          inter: "/images/heathrow-mpv-family.jpg",
          gateway: "/images/luxury-car-interior.jpg",
        },
        intro: [
          "Our Stansted transfer service makes airport travel easy with punctual pickups, reliable routing, and fixed fares.",
          "Whether you are travelling for work or vacation, our professional drivers ensure smooth door-to-door comfort.",
          "Book your journey in advance and avoid airport transport stress.",
        ],
        reliable: [
          "We provide dependable Stansted taxis with clean vehicles and experienced drivers for hassle-free transfers.",
          "Each journey is planned for punctual arrivals, safe travel, and stress-free terminal access.",
          "Reserve now for an efficient Stansted transfer experience.",
        ],
        interAirport: [
          "Use our inter-airport transfer service to connect Stansted with Heathrow, Gatwick, Luton, or London City.",
          "Our drivers keep your journey efficient with route planning and timing support.",
          "Book early to keep your transfer schedule fully under control.",
        ],
        gateway: [
          "Plan your Stansted ride in advance and travel with confidence from terminal to destination.",
          "Our service includes flight tracking, professional support, and smooth pickups.",
          "Choose BTS for a reliable and comfortable Stansted airport transfer.",
        ],
        faqs: [
          {
            q: "How early should I book a Stansted airport transfer?",
            a: "Book at least 6–12 hours in advance for better vehicle availability.",
          },
          {
            q: "Do you monitor Stansted flight arrivals?",
            a: "Yes — we monitor flight timing and adjust pickups when schedules change.",
          },
          {
            q: "Can I transfer from Stansted to Heathrow?",
            a: "Yes — we provide direct inter-airport transfers between Stansted and Heathrow.",
          },
        ],
      }}
    />
  );
}
