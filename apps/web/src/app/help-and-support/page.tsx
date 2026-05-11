import { Mail, Phone, Clock, Headphones } from "lucide-react";
import { FullFooterSection } from "@/components/FullFooterSection";
import { SiteTopHeader } from "@/components/layout/SiteTopHeader";

export default function HelpAndSupportPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteTopHeader />

      <main>
        {/* ── Hero ── */}
        <section className="ukride-hero-ambient ukride-luxury-section-1 ukride-grid-bg relative overflow-hidden py-20 md:py-28">
          <div className="container mx-auto max-w-3xl px-4 text-center">
            <p className="ukride-pill mx-auto">
              <Headphones className="h-3.5 w-3.5" />
              Help &amp; support
            </p>
            <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-[#F8F8F8] drop-shadow-[0_2px_24px_rgba(75,0,130,0.45)] md:text-5xl">
              We&apos;re here, around the clock
            </h1>
            <p className="mt-5 text-lg leading-7 text-[#D1D5DB]">
              Reach the UKride team 24/7. Send us a message below and we&apos;ll
              respond as quickly as possible — usually within the hour.
            </p>
          </div>
        </section>

        {/* ── Channels + contact form ── */}
        <section className="ukride-section-charcoal relative py-20 md:py-24">
          <div className="container mx-auto grid gap-10 px-4 lg:grid-cols-[1fr_1.4fr]">
            {/* Contact channels */}
            <div className="space-y-4">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#C0C0C0]">
                Reach us directly
              </p>
              <h2 className="text-3xl font-bold tracking-tight text-[#F8F8F8] md:text-4xl">
                Talk to a real person
              </h2>
              <p className="text-[#A5A7AA]">
                Pick the channel that suits you. Our team is available day and
                night for bookings, changes, and any questions.
              </p>

              <div className="mt-6 space-y-3">
                <ChannelCard
                  icon={<Phone className="h-5 w-5" />}
                  label="Call us"
                  primary="+44 7700 1409 00"
                  secondary="Bookings &amp; immediate help"
                  href="tel:+447700140900"
                />
                <ChannelCard
                  icon={<Phone className="h-5 w-5" />}
                  label="Support line"
                  primary="+44 2080 5090 14"
                  secondary="Existing journey support"
                  href="tel:+442080509014"
                />
                <ChannelCard
                  icon={<Mail className="h-5 w-5" />}
                  label="Email"
                  primary="support@ukride.uk"
                  secondary="Replies within the hour"
                  href="mailto:support@ukride.uk"
                />
                <ChannelCard
                  icon={<Clock className="h-5 w-5" />}
                  label="Hours"
                  primary="Open 24/7"
                  secondary="Including weekends &amp; bank holidays"
                />
              </div>
            </div>

            {/* Form card */}
            <div className="ukride-card p-7 md:p-9">
              <h3 className="text-2xl font-bold tracking-tight text-[#F8F8F8]">
                Send a message
              </h3>
              <p className="mt-2 text-sm text-[#A5A7AA]">
                Tell us what you need and we&apos;ll get back to you fast.
              </p>

              <form className="mt-6 space-y-4">
                <Field label="Name">
                  <input
                    type="text"
                    placeholder="Your full name"
                    className={inputClass}
                  />
                </Field>
                <div className="grid gap-4 md:grid-cols-2">
                  <Field label="Email">
                    <input
                      type="email"
                      placeholder="you@example.com"
                      className={inputClass}
                    />
                  </Field>
                  <Field label="Phone">
                    <input
                      type="tel"
                      placeholder="+44 7700 000 000"
                      className={inputClass}
                    />
                  </Field>
                </div>
                <Field label="Message">
                  <textarea
                    rows={5}
                    placeholder="How can we help?"
                    className="form-field-light min-h-[140px] w-full rounded-lg px-3 py-2.5 text-sm outline-none transition"
                  />
                </Field>
                <button
                  type="button"
                  className="inline-flex h-12 w-full items-center justify-center rounded-xl border border-[rgba(192,192,192,0.25)] bg-[linear-gradient(135deg,#5B0F9C_0%,#4B0082_55%,#3B0A57_100%)] text-sm font-bold tracking-wide text-[#F8F8F8] shadow-[inset_0_1px_0_rgba(192,192,192,0.18),0_10px_32px_-10px_rgba(75,0,130,0.6)] transition-all duration-300 hover:-translate-y-px hover:border-[rgba(192,192,192,0.4)] hover:shadow-[inset_0_1px_0_rgba(192,192,192,0.22),0_18px_44px_-12px_rgba(75,0,130,0.8),0_0_0_3px_rgba(75,0,130,0.18)]"
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        </section>
      </main>

      <FullFooterSection />
    </div>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block space-y-1.5">
      <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#A5A7AA]">
        {label}
      </span>
      {children}
    </label>
  );
}

function ChannelCard({
  icon,
  label,
  primary,
  secondary,
  href,
}: {
  icon: React.ReactNode;
  label: string;
  primary: string;
  secondary: string;
  href?: string;
}) {
  const body = (
    <div className="ukride-card group flex items-start gap-4 p-5 transition-all">
      <span className="ukride-icon-halo h-11 w-11 flex-none">{icon}</span>
      <div className="min-w-0 flex-1">
        <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#A5A7AA]">
          {label}
        </p>
        <p className="mt-1 text-base font-semibold text-[#F8F8F8] transition-colors group-hover:text-[#F8F8F8]">
          {primary}
        </p>
        <p
          className="text-xs leading-5 text-[#A5A7AA]"
          dangerouslySetInnerHTML={{ __html: secondary }}
        />
      </div>
    </div>
  );
  return href ? <a href={href}>{body}</a> : body;
}

const inputClass =
  "form-field-light h-11 w-full rounded-lg px-3 text-sm outline-none transition";
