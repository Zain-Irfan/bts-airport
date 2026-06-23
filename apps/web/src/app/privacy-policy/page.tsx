import { FullFooterSection } from "@/components/FullFooterSection";
import { SiteTopHeader } from "@/components/layout/SiteTopHeader";

const policySections = [
  {
    title: "1. What does this notice cover?",
    paragraphs: [
      "This Privacy Notice explains how BTS collects, uses, stores, and protects your personal information when you use our website, mobile services, and booking platforms.",
      "It applies to all users, including passengers, account holders, and visitors who interact with BTS through digital channels or customer support.",
    ],
  },
  {
    title: "2. What information do we collect?",
    paragraphs: [
      "We collect information you provide directly, such as your name, phone number, email address, pickup/dropoff details, and payment-related information needed to process bookings.",
      "We may also collect technical and usage data, including IP address, browser type, device identifiers, and interaction data to improve our service quality and platform security.",
    ],
  },
  {
    title: "3. How do we obtain your information?",
    paragraphs: [
      "Your information is mainly collected when you create an account, request a quote, make a booking, contact support, subscribe to updates, or use interactive features on our website.",
      "Some data may be collected automatically through cookies and analytics tools while you browse our services.",
    ],
  },
  {
    title: "4. How do we use your information?",
    paragraphs: [
      "We use your personal data to confirm bookings, assign drivers, provide customer support, communicate trip updates, and process payments.",
      "Your information also helps us monitor performance, detect misuse, prevent fraud, and improve products, safety standards, and customer experience.",
    ],
  },
  {
    title: "5. How long do we keep your data?",
    paragraphs: [
      "We keep personal data only for as long as necessary to provide services, meet legal obligations, resolve disputes, and enforce our terms.",
      "Retention periods vary based on data category, legal requirements, and legitimate business needs.",
    ],
  },
  {
    title: "6. Do we share information with third parties?",
    paragraphs: [
      "We may share necessary data with payment processors, service providers, customer communication partners, and regulatory bodies when legally required.",
      "We do not sell your personal data. All third-party processing is managed with appropriate security and confidentiality controls.",
    ],
  },
  {
    title: "7. How do we keep your data safe?",
    paragraphs: [
      "BTS applies technical and organisational safeguards to protect your information, including secure data transmission, restricted access controls, and monitored systems.",
      "While no platform is completely risk-free, we continuously improve our protections to reduce the chance of unauthorized access or misuse.",
    ],
  },
  {
    title: "8. Do we collect information from minors?",
    paragraphs: [
      "Our services are not intended for children under 16. We do not knowingly collect personal data from minors without appropriate parental or guardian involvement.",
      "If such data is identified, we take steps to remove it in accordance with applicable legal obligations.",
    ],
  },
  {
    title: "9. What are your privacy rights?",
    paragraphs: [
      "Depending on your location, you may request access to your personal data, correction of inaccurate data, deletion of eligible data, objection to processing, or data portability.",
      "You may also request restriction of processing and withdraw consent where consent is the legal basis for processing.",
    ],
  },
  {
    title: "10. Controls for Do-Not-Track features",
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

      <section className="BTS-hero-ambient BTS-section-onyx BTS-grid-bg relative overflow-hidden pb-12 pt-20 md:pb-16 md:pt-28">
        <div className="container mx-auto max-w-4xl px-4 text-center">
          <span className="BTS-pill">Privacy</span>
          <h1 className="mt-6 text-3xl font-bold tracking-tight text-[#F8F8F8] md:text-5xl">
            Privacy Policy
          </h1>
          <div className="BTS-divider mx-auto mt-6 w-24" />
          <p className="mx-auto mt-6 max-w-2xl text-[15px] leading-relaxed text-[#CFCFCF]">
            How BTS collects, uses, and protects the data you share when
            booking, browsing, or contacting us.
          </p>
        </div>
      </section>

      <main className="BTS-section-charcoal relative py-16 md:py-24">
        <div className="container mx-auto max-w-4xl px-4">
          <div className="BTS-card p-8 md:p-12">
            <div className="space-y-12 text-[15px] leading-[1.95] text-[#CFCFCF]">
              {policySections.map((section, index) => (
                <section key={section.title}>
                  <h2 className="text-xl font-semibold uppercase tracking-[0.08em] text-[#F8F8F8] md:text-[1.4rem]">
                    {section.title}
                  </h2>
                  <div className="BTS-divider-silver mt-4 mb-6 w-16" />
                  <div className="space-y-4">
                    {section.paragraphs.map((p, i) => (
                      <p key={i}>{p}</p>
                    ))}
                  </div>
                  {index < policySections.length - 1 ? (
                    <hr className="BTS-divider-silver mt-10 opacity-60" />
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
