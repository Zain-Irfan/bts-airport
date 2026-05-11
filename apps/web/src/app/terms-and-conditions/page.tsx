import { FullFooterSection } from "@/components/FullFooterSection";
import { SiteTopHeader } from "@/components/layout/SiteTopHeader";

export default function TermsAndConditionsPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteTopHeader />

      <main className="bg-[#f5f5f7] py-16 md:py-20">
        <div className="container mx-auto max-w-6xl px-4">
          <h1 className="text-center text-4xl font-bold text-foreground">Terms and Conditions</h1>

          <div className="mt-14 rounded-sm bg-[#f5f5f7] px-6 py-2 md:px-14">
            <section className="space-y-10 text-[15px] leading-8 text-foreground/85">
              <div>
                <h2 className="mb-3 text-3xl font-semibold text-foreground">Cancellation Policy:</h2>
                <p>
                  Cancellation made 3 hours or earlier before the scheduled pick-up time is free of
                  charge. If pick up is within London area it&apos;s 7 hours before the pick-up time.
                  Cancellation made less than 3 hours before the scheduled pick-up time (if pick up
                  is within London area) and 7 hours (if pick up is outside of London area) will
                  incur a 100% charge of the booking cost.
                </p>
              </div>

              <div>
                <h2 className="mb-3 text-3xl font-semibold text-foreground">Waiting Time Policy:</h2>
                <p>
                  App will notify the customer when free waiting time expires and customer will be
                  able to pay for an extra waiting time online.
                </p>
                <p className="mt-3">
                  *Pick-up from any address excluding Airport pick-up: Free waiting time from the
                  booked pick-up time is 10 minutes. After the initial 10 minutes from the pick-up
                  time, there is an additional charge for the driver waiting time + parking cost for
                  every 15 minutes. Payment link will be provided by our customer service
                  representative team, if not paid straight away, the driver will be allowed to
                  leave after the free waiting time has expired.
                </p>
                <p className="mt-3">
                  *Pick-up from the Airports: Heathrow Airport: 45 minutes of free waiting from the
                  pick-up time. Gatwick Airport, Luton Airport, London City Airport, and Stansted
                  Airport: 30 minutes of free waiting time from the pick-up time. After the free
                  waiting time, upon the driver&apos;s availability, an extra charge of for the driver
                  waiting time + parking cost for every 15 minutes. Payment link will be provided by
                  our customer service representative team, if not paid straight away, the driver
                  will be allowed to leave after the free waiting time has expired.
                </p>
              </div>

              <div>
                <h2 className="mb-3 text-3xl font-semibold text-foreground">Additional Amendment:</h2>
                <p>
                  Please note that any amendments to the original booking can incur extra charges.
                  In case of amendments, link for an extra pay will be provided to the customer.
                </p>
              </div>

              <div>
                <h2 className="mb-3 text-3xl font-semibold text-foreground">Customer No Show:</h2>
                <p>
                  In the case of a passenger No Show, after the free waiting time has expired, the
                  driver will be allowed to leave if there is no communication from the passenger and
                  no agreed extra waiting time paid.
                </p>
              </div>

              <p>
                The driver will be assigned to the customer booking few hours before your journey
                and customer will be notified. In case no information received about the driver, at
                the pick up time please kindly call our customer service representative team line or
                message us by whatsapp or email. All the information you can find on our website.
              </p>

              <p>
                Should you have any queries or require further assistance, please feel free to
                contact us using the contact details and whatsapp and chat messages on our website.
              </p>
            </section>
          </div>
        </div>
      </main>

      <FullFooterSection />
    </div>
  );
}

