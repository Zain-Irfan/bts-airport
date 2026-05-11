import Link from "next/link";
import { FullFooterSection } from "@/components/FullFooterSection";
import { SiteTopHeader } from "@/components/layout/SiteTopHeader";

export default function HelpAndSupportPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteTopHeader />

      <main className="py-16">
        <div className="mx-auto w-full max-w-3xl px-4">
          <div className="text-center">
            <h1 className="text-5xl font-medium text-foreground">Feel free to contact UKRide</h1>
            <p className="mt-3 text-sm text-muted-foreground">
              we are 24/7 available. We will answer your query as soon as possible.
            </p>
          </div>

          <form className="mt-10 space-y-4">
            <div className="space-y-1">
              <label className="text-sm font-medium text-foreground">Name:</label>
              <input
                type="text"
                placeholder="Name"
                className="form-field-light h-11 w-full rounded-lg px-3 text-sm outline-none transition"
              />
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-1">
                <label className="text-sm font-medium text-foreground">Email:</label>
                <input
                  type="email"
                  placeholder="Email"
                  className="form-field-light h-11 w-full rounded-lg px-3 text-sm outline-none transition"
                />
              </div>
              <div className="space-y-1">
                <label className="text-sm font-medium text-foreground">Phone:</label>
                <input
                  type="tel"
                  placeholder="Phone Number"
                  className="form-field-light h-11 w-full rounded-lg px-3 text-sm outline-none transition"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-sm font-medium text-foreground">Message:</label>
              <textarea
                rows={5}
                placeholder="Type Your Message here"
                className="form-field-light min-h-[120px] w-full rounded-lg px-3 py-2 text-sm outline-none transition"
              />
            </div>

            <button
              type="button"
              className="inline-flex h-10 w-full items-center justify-center bg-accent px-6 text-sm font-bold text-accent-foreground hover:bg-accent/90"
            >
              Submit
            </button>
          </form>
        </div>
      </main>

      <FullFooterSection />
    </div>
  );
}

