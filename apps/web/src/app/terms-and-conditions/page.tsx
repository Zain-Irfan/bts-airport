import { FullFooterSection } from "@/components/FullFooterSection";
import { SiteTopHeader } from "@/components/layout/SiteTopHeader";

const sections = [
  {
    title: "Cancellation Policy",
    paragraphs: [
      "Cancellation made 3 hours or earlier before the scheduled pick-up time is free of charge. If pick up is within London area it's 7 hours before the pick-up time.",
      "Cancellation made less than 3 hours before the scheduled pick-up time (if pick up is within London area) and 7 hours (if pick up is outside of London area) will incur a 100% charge of the booking cost.",
    ],
  },
  {
    title: "Waiting Time Policy",
    paragraphs: [
      "App will notify the customer when free waiting time expires and customer will be able to pay for an extra waiting time online.",
      "Pick-up from any address excluding Airport pick-up: Free waiting time from the booked pick-up time is 10 minutes. After the initial 10 minutes from the pick-up time, there is an additional charge for the driver waiting time + parking cost for every 15 minutes. Payment link will be provided by our customer service team — if not paid, the driver will be allowed to leave after the free waiting time has expired.",
      "Pick-up from the Airports: Heathrow Airport offers 45 minutes of free waiting time. Gatwick, Luton, London City and Stansted offer 30 minutes of free waiting time. After the free window, an extra charge applies for driver waiting time + parking for every 15 minutes.",
    ],
  },
  {
    title: "Additional Amendment",
    paragraphs: [
      "Please note that any amendments to the original booking can incur extra charges. In case of amendments, a link for the extra pay will be provided to the customer.",
    ],
  },
  {
    title: "Customer No-Show",
    paragraphs: [
      "In the case of a passenger No Show, after the free waiting time has expired, the driver will be allowed to leave if there is no communication from the passenger and no agreed extra waiting time paid.",
    ],
  },
  {
    title: "Driver Assignment",
    paragraphs: [
      "The driver will be assigned to the customer booking a few hours before your journey and the customer will be notified. In case no information is received about the driver at the pick-up time, please contact our customer service team via phone, WhatsApp, or email — all details are available on our website.",
      "Should you have any queries or require further assistance, please feel free to contact us using the contact details, WhatsApp, and chat on our website.",
    ],
  },
];

export default function TermsAndConditionsPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteTopHeader />

      {/* Hero */}
      <section className="ukride-hero-ambient ukride-section-onyx ukride-grid-bg relative overflow-hidden pb-12 pt-20 md:pb-16 md:pt-28">
        <div className="container mx-auto max-w-4xl px-4 text-center">
          <span className="ukride-pill">Legal</span>
          <h1 className="mt-6 text-3xl font-bold tracking-tight text-[#F8F8F8] md:text-5xl">
            Terms &amp; Conditions
          </h1>
          <div className="ukride-divider mx-auto mt-6 w-24" />
          <p className="mx-auto mt-6 max-w-2xl text-[15px] leading-relaxed text-[#CFCFCF]">
            The agreements and policies that govern every UKride booking,
            cancellation, and customer interaction.
          </p>
        </div>
      </section>

      {/* Content */}
      <main className="ukride-section-charcoal relative py-16 md:py-24">
        <div className="container mx-auto max-w-4xl px-4">
          <div className="ukride-card p-8 md:p-12">
            <div className="space-y-12 text-[15px] leading-[1.95] text-[#CFCFCF]">
              {sections.map((section, index) => (
                <section key={section.title}>
                  <h2 className="text-2xl font-semibold tracking-tight text-[#F8F8F8] md:text-3xl">
                    {section.title}
                  </h2>
                  <div className="ukride-divider-silver mt-4 mb-6 w-16" />
                  <div className="space-y-4">
                    {section.paragraphs.map((p, i) => (
                      <p key={i}>{p}</p>
                    ))}
                  </div>
                  {index < sections.length - 1 ? (
                    <hr className="ukride-divider-silver mt-10 opacity-60" />
                  ) : null}
                </section>
              ))}
            </div>
          </div>
        </div>
      </main>

      <FullFooterSection />
    </div>
  );
}
