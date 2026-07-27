import { Mail, Phone, Clock, Headphones } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { ContactForm } from "@/components/forms/ContactForm";
import { FullFooterSection } from "@/components/FullFooterSection";
import { SiteTopHeader } from "@/components/layout/SiteTopHeader";
import { getSiteSettings } from "@/lib/site-settings";
import { telHref } from "@/lib/phone";

export default async function HelpAndSupportPage() {
  const { phone, whatsapp, email } = await getSiteSettings();
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteTopHeader />

      <main>
        {/* ── Hero ── */}
        <section className="BTS-hero-ambient BTS-luxury-section-1 BTS-grid-bg relative overflow-hidden py-20 md:py-28">
          <div className="container mx-auto max-w-3xl px-4 text-center">
            <p className="BTS-pill mx-auto">
              <Headphones className="h-3.5 w-3.5" />
              Help &amp; support
            </p>
            <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-[#F8F8F8] drop-shadow-[0_2px_24px_rgba(0,0,0,0.5)] md:text-5xl">
              We&apos;re here, around the clock
            </h1>
            <p className="mt-5 text-lg leading-7 text-[#D1D5DB]">
              Reach the London Airport Taxi Services team 24/7. Send us a message below and we&apos;ll
              respond as quickly as possible — usually within the hour.
            </p>
          </div>
        </section>

        {/* ── Channels + contact form ── */}
        <section className="BTS-section-charcoal relative py-20 md:py-24">
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
                  primary={phone}
                  secondary="Bookings &amp; immediate help"
                  href={telHref(phone)}
                />
                <ChannelCard
                  icon={<FaWhatsapp className="h-5 w-5" style={{ color: "#25D366" }} />}
                  label="WhatsApp"
                  primary="Chat on WhatsApp"
                  secondary="Fast replies, day &amp; night"
                  href={`https://wa.me/${whatsapp}`}
                />
                <ChannelCard
                  icon={<Mail className="h-5 w-5" />}
                  label="Email"
                  primary={email}
                  secondary="Replies within the hour"
                  href={`mailto:${email}`}
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
            <div className="BTS-card p-7 md:p-9">
              <h3 className="text-2xl font-bold tracking-tight text-[#F8F8F8]">
                Send a message
              </h3>
              <p className="mt-2 text-sm text-[#A5A7AA]">
                Tell us what you need and we&apos;ll get back to you fast.
              </p>

              <ContactForm />
            </div>
          </div>
        </section>
      </main>

      <FullFooterSection />
    </div>
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
    <div className="BTS-card group flex items-start gap-4 p-5 transition-all">
      <span className="BTS-icon-halo h-11 w-11 flex-none">{icon}</span>
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
