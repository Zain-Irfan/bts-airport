import { AirportCityPageTemplate } from "@/components/airports/AirportCityPageTemplate";

export default function HeathrowAirportTransfersPage() {
  return (
    <AirportCityPageTemplate
      content={{
        airportName: "Heathrow",
        pillLabel: "Heathrow transfers",
        headline: (
          <>
            Book your Heathrow
            <br />
            <span className="bg-[linear-gradient(135deg,#C0C0C0_0%,#F8F8F8_50%,#A5A7AA_100%)] bg-clip-text text-transparent">
              airport transfer
            </span>
          </>
        ),
        subtitle:
          "Reliable pickups, fixed pricing, professional drivers, and 24/7 support across every Heathrow terminal.",
        heroImage: "/airport_1.jpg",
        storyImages: {
          intro: "/perfect-taxi.jpg",
          reliable: "/airport_5.jpg",
          inter: "/airport_6.jpg",
          gateway: "/airport_3.jpg",
        },
        intro: [
          "With UKride, experience the convenience of professional airport pickup. Book your Heathrow airport taxi online and share your flight number for real-time tracking. From the moment you land, our driver is ready to assist with luggage and deliver a comfortable journey to your doorstep.",
          "Leave the responsibility of organising your Heathrow transfer to us. Our meticulously maintained fleet and professional drivers handle trips to and from every London airport with confidence.",
          "Complimentary waiting time and 24/7 availability guarantee a seamless travel experience that gets you to your destination on time.",
        ],
        reliable: [
          "UKride designed its taxi service to transform every journey into an experience of comfort and refinement. Get a bespoke transfer into London with our reliable Heathrow airport taxi.",
          "Our Heathrow transfer is not just point A to point B — it elevates your travel with quiet, opulent service worthy of the executive standard.",
          "Trust UKride to turn an ordinary airport transfer into an exceptional experience.",
        ],
        interAirport: [
          "We keep your inter-airport travel in total control. Whether it's Gatwick to Heathrow or Heathrow to Stansted, our service is built for speed, precision, and peace of mind.",
          "UKride drivers know every London airport route by heart and adapt instantly to delays, traffic, and terminal changes.",
          "Book your London-to-London airport transfer today and travel with confidence.",
        ],
        gateway: [
          "A clear pickup plan turns a stressful transfer into a smooth one. Don't get lost across Heathrow's vast terminals — pre-book your taxi for total peace of mind.",
          "Our driver will meet you at arrivals holding a name board. With ample buffer time built in, you'll arrive at your terminal well in advance of your flight.",
        ],
        terminals: [
          "Terminal 2 — The Queen's Terminal",
          "Terminal 3",
          "Terminal 4",
          "Terminal 5",
        ],
        faqs: [
          {
            q: "How early should I book my Heathrow transfer?",
            a: "Bookings can be made anytime, but we recommend at least 6–12 hours in advance for the best vehicle availability.",
          },
          {
            q: "What happens if my flight is delayed?",
            a: "We monitor live flight status and automatically adjust your pickup so your driver is there when you land — no extra charge for delays.",
          },
          {
            q: "Do you provide child seats?",
            a: "Yes. Infant, child, and booster seats are available on request during booking, free of charge.",
          },
          {
            q: "Which Heathrow terminal will my driver use?",
            a: "Share your flight details at booking — we'll route your driver to the correct terminal automatically.",
          },
          {
            q: "Is meet-and-greet available at Heathrow?",
            a: "Yes — opt for meet-and-greet at booking and your driver will wait in arrivals with a UKride name board.",
          },
        ],
      }}
    />
  );
}
