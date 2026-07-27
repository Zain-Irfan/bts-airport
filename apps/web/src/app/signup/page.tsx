import { Sparkles } from "lucide-react";
import { FullFooterSection } from "@/components/FullFooterSection";
import { SiteTopHeader } from "@/components/layout/SiteTopHeader";
import { CustomerSignupForm } from "@/components/auth/CustomerSignupForm";

export default function SignupPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteTopHeader />

      <main className="BTS-hero-ambient BTS-auth-main relative py-16 md:py-24">
        <div className="mx-auto w-full max-w-md px-4" data-no-reveal-scope>
          <div className="mb-6 text-center">
            <p className="BTS-pill mx-auto">
              <Sparkles className="h-3.5 w-3.5" />
              Create account
            </p>
            <h1 className="mt-6 text-3xl font-bold tracking-tight text-[#F8F8F8] md:text-4xl">
              Join London Airport Taxi Services
            </h1>
            <p className="mt-3 text-sm leading-6 text-[#D1D5DB]">
              Register to book faster and see all your journeys in one place.
            </p>
          </div>

          <div className="BTS-card overflow-visible p-7">
            <CustomerSignupForm />
          </div>
        </div>
      </main>

      <FullFooterSection />
    </div>
  );
}
