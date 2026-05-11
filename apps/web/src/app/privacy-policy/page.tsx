import { FullFooterSection } from "@/components/FullFooterSection";
import { SiteTopHeader } from "@/components/layout/SiteTopHeader";

const policySections = [
  {
    title: "1. WHAT DOES THIS NOTICE COVER?",
    paragraphs: [
      "This Privacy Notice explains how UKride collects, uses, stores, and protects your personal information when you use our website, mobile services, and booking platforms.",
      "It applies to all users, including passengers, account holders, and visitors who interact with UKride through digital channels or customer support.",
    ],
  },
  {
    title: "2. WHAT INFORMATION DO WE COLLECT?",
    paragraphs: [
      "We collect information you provide directly, such as your name, phone number, email address, pickup/dropoff details, and payment-related information needed to process bookings.",
      "We may also collect technical and usage data, including IP address, browser type, device identifiers, and interaction data to improve our service quality and platform security.",
    ],
  },
  {
    title: "3. HOW DO WE OBTAIN YOUR INFORMATION?",
    paragraphs: [
      "Your information is mainly collected when you create an account, request a quote, make a booking, contact support, subscribe to updates, or use interactive features on our website.",
      "Some data may be collected automatically through cookies and analytics tools while you browse our services.",
    ],
  },
  {
    title: "4. HOW DO WE USE YOUR INFORMATION?",
    paragraphs: [
      "We use your personal data to confirm bookings, assign drivers, provide customer support, communicate trip updates, and process payments.",
      "Your information also helps us monitor performance, detect misuse, prevent fraud, and improve products, safety standards, and customer experience.",
    ],
  },
  {
    title: "5. HOW LONG DO WE KEEP YOUR DATA?",
    paragraphs: [
      "We keep personal data only for as long as necessary to provide services, meet legal obligations, resolve disputes, and enforce our terms.",
      "Retention periods vary based on data category, legal requirements, and legitimate business needs.",
    ],
  },
  {
    title: "6. DO WE SHARE INFORMATION WITH THIRD PARTIES?",
    paragraphs: [
      "We may share necessary data with payment processors, service providers, customer communication partners, and regulatory bodies when legally required.",
      "We do not sell your personal data. All third-party processing is managed with appropriate security and confidentiality controls.",
    ],
  },
  {
    title: "7. HOW DO WE KEEP YOUR DATA SAFE?",
    paragraphs: [
      "UKride applies technical and organizational safeguards to protect your information, including secure data transmission, restricted access controls, and monitored systems.",
      "While no platform is completely risk-free, we continuously improve our protections to reduce the chance of unauthorized access or misuse.",
    ],
  },
  {
    title: "8. DO WE COLLECT INFORMATION FROM MINORS?",
    paragraphs: [
      "Our services are not intended for children under 16. We do not knowingly collect personal data from minors without appropriate parental or guardian involvement.",
      "If such data is identified, we take steps to remove it in accordance with applicable legal obligations.",
    ],
  },
  {
    title: "9. WHAT ARE YOUR PRIVACY RIGHTS?",
    paragraphs: [
      "Depending on your location, you may request access to your personal data, correction of inaccurate data, deletion of eligible data, objection to processing, or data portability.",
      "You may also request restriction of processing and withdraw consent where consent is the legal basis for processing.",
    ],
  },
  {
    title: "10. CONTROLS FOR DO-NOT-TRACK FEATURES",
    paragraphs: [
      "Some browsers support Do-Not-Track settings. As there is no uniform standard yet for recognizing DNT signals, our website may not respond to all DNT requests.",
      "If an industry standard is adopted in future, we will update this notice accordingly.",
    ],
  },
];

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteTopHeader />

      <main className="bg-[#f5f5f7] py-16 md:py-20">
        <div className="container mx-auto max-w-6xl px-4">
          <h1 className="text-center text-4xl font-bold text-foreground">Privacy Policy</h1>

          <div className="mt-14 rounded-sm bg-[#f5f5f7] px-6 py-2 md:px-14">
            <section className="space-y-10 text-[15px] leading-8 text-foreground/85">
            {policySections.map((section) => (
              <section key={section.title}>
                <h2 className="mb-3 text-3xl font-semibold text-foreground">
                  {section.title}
                </h2>
                <div className="space-y-4">
                  {section.paragraphs.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
              </section>
            ))}
            </section>
          </div>
        </div>
      </main>

      <FullFooterSection />
    </div>
  );
}

