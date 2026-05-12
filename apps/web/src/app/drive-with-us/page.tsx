import { BadgeCheck, Headphones, MapPinned, ShieldCheck } from "lucide-react";
import { FullFooterSection } from "@/components/FullFooterSection";
import { SiteTopHeader } from "@/components/layout/SiteTopHeader";

const perks = [
  {
    title: "Premium fares",
    desc: "Transparent rates and weekly payouts on every confirmed booking.",
    icon: BadgeCheck,
  },
  {
    title: "London-wide demand",
    desc: "Airport, station, and corporate jobs routed straight to your app.",
    icon: MapPinned,
  },
  {
    title: "Driver protection",
    desc: "Comprehensive screening, monitored journeys, and 24/7 support.",
    icon: ShieldCheck,
  },
  {
    title: "Real human support",
    desc: "Dedicated UK driver care team you can reach by phone or WhatsApp.",
    icon: Headphones,
  },
];

export default function DriveWithUsPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteTopHeader />

      {/* Hero */}
      <section className="ukride-hero-ambient ukride-luxury-section-3 ukride-grid-bg relative overflow-hidden py-20 md:py-28">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="grid items-start gap-12 lg:grid-cols-[1.1fr_1fr]">
            <div className="space-y-6">
              <span className="ukride-pill">Drive with UKride</span>
              <h1 className="text-4xl font-bold tracking-tight text-[#F8F8F8] md:text-5xl">
                Come Drive With UKride
              </h1>
              <p className="max-w-xl text-[15px] leading-relaxed text-[#CFCFCF]">
                Apply today to join London&apos;s premium pre-booked transfer
                network. Steady demand. Professional brand. Fair pay.
              </p>
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#C0C0C0]">
                Currently accepting drivers based in London
              </p>

              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                {perks.map((perk) => {
                  const Icon = perk.icon;
                  return (
                    <div
                      key={perk.title}
                      className="rounded-2xl border border-[rgba(192,192,192,0.12)] bg-[linear-gradient(180deg,rgba(26,26,29,0.55)_0%,rgba(13,13,15,0.72)_100%)] p-5 backdrop-blur-md"
                    >
                      <div className="ukride-icon-halo mb-3 h-10 w-10">
                        <Icon className="h-5 w-5" />
                      </div>
                      <h3 className="text-[15px] font-semibold text-[#F8F8F8]">
                        {perk.title}
                      </h3>
                      <p className="mt-1.5 text-xs leading-relaxed text-[#A5A7AA]">
                        {perk.desc}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Form card */}
            <div className="ukride-card p-6 md:p-8">
              <div className="mb-6">
                <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#A5A7AA]">
                  Driver application
                </span>
                <h2 className="mt-2 text-2xl font-semibold tracking-tight text-[#F8F8F8]">
                  Start your application
                </h2>
                <p className="mt-2 text-sm text-[#CFCFCF]">
                  Tell us about you — our driver team will reach out within 48
                  hours.
                </p>
              </div>

              <form className="space-y-4">
                <Field id="full-name" label="Full name" placeholder="Enter your full name" />
                <Field id="email" type="email" label="Email" placeholder="you@example.com" />

                <div className="grid gap-4 md:grid-cols-2">
                  <Field id="phone" type="tel" label="Phone" placeholder="+44…" />
                  <Field id="dob" type="date" label="Date of birth" />
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="driven-before"
                    className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#A5A7AA]"
                  >
                    Have you driven for UKride before?
                  </label>
                  <select
                    id="driven-before"
                    defaultValue=""
                    className="form-field-light h-11 w-full rounded-lg px-3 text-sm outline-none transition"
                  >
                    <option value="" disabled>
                      Select
                    </option>
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                  </select>
                </div>

                <Field
                  id="vehicle"
                  label="Vehicle owned (if applicable)"
                  placeholder="e.g. Mercedes E-Class, 2022"
                />

                <Field
                  id="pco"
                  label="PCO licence number"
                  placeholder="Enter your PCO licence number"
                />

                <label className="mt-2 flex items-start gap-3 text-xs leading-relaxed text-[#A5A7AA]">
                  <input
                    type="checkbox"
                    name="agree"
                    className="mt-0.5 h-4 w-4 rounded border border-[rgba(192,192,192,0.22)] bg-[rgba(13,13,15,0.6)] accent-[#9B51E0]"
                  />
                  <span>
                    I agree that UKride may contact me using the details
                    provided above for the purpose of processing this
                    application.
                  </span>
                </label>

                <button
                  type="submit"
                  className="mt-2 inline-flex h-12 w-full items-center justify-center rounded-xl border border-[rgba(192,192,192,0.22)] bg-[linear-gradient(135deg,#5B0F9C_0%,#4B0082_55%,#3B0A57_100%)] text-sm font-semibold tracking-wide text-[#F8F8F8] shadow-[inset_0_1px_0_rgba(192,192,192,0.18),inset_0_0_0_1px_rgba(75,0,130,0.4),0_10px_32px_-10px_rgba(75,0,130,0.55)] transition-all duration-500 hover:-translate-y-[1px] hover:border-[rgba(192,192,192,0.4)] hover:shadow-[inset_0_1px_0_rgba(192,192,192,0.22),inset_0_0_0_1px_rgba(155,81,224,0.5),0_18px_48px_-10px_rgba(75,0,130,0.7),0_0_0_4px_rgba(75,0,130,0.18)]"
                >
                  Submit application
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <FullFooterSection />
    </div>
  );
}

function Field({
  id,
  label,
  type = "text",
  placeholder,
}: {
  id: string;
  label: string;
  type?: string;
  placeholder?: string;
}) {
  return (
    <div className="space-y-2">
      <label
        htmlFor={id}
        className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#A5A7AA]"
      >
        {label}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        placeholder={placeholder}
        className="form-field-light h-11 w-full rounded-lg px-3 text-sm outline-none transition"
      />
    </div>
  );
}
