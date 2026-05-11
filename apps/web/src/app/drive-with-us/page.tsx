import { FullFooterSection } from "@/components/FullFooterSection";
import { SiteTopHeader } from "@/components/layout/SiteTopHeader";

export default function DriveWithUsPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteTopHeader />

      <section className="bg-muted py-16 md:py-20">
        <div className="container mx-auto max-w-4xl px-4">
          <div className="mx-auto max-w-3xl">
            <div className="mb-8 text-center">
              <h1 className="text-4xl font-bold uppercase tracking-wide text-foreground md:text-5xl">
                Come Drive With UKride
              </h1>
              <p className="mt-3 text-sm text-muted-foreground">
                Apply today to start your new career.
              </p>
              <p className="mt-2 text-sm font-semibold uppercase tracking-wide text-foreground">
                Only for drivers living in London
              </p>
            </div>

            <form className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="full-name" className="text-sm font-medium text-foreground">
                  Full Name
                </label>
                <input
                  id="full-name"
                  name="fullName"
                  type="text"
                  placeholder="Enter Your Full Name"
                  className="form-field-light h-11 w-full rounded-lg px-3 text-sm outline-none transition"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium text-foreground">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Email"
                  className="form-field-light h-11 w-full rounded-lg px-3 text-sm outline-none transition"
                />
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <label htmlFor="phone" className="text-sm font-medium text-foreground">
                    Phone
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    placeholder="Phone Number"
                    className="form-field-light h-11 w-full rounded-lg px-3 text-sm outline-none transition"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="dob" className="text-sm font-medium text-foreground">
                    Date of birth
                  </label>
                  <input
                    id="dob"
                    name="dateOfBirth"
                    type="date"
                    className="form-field-light h-11 w-full rounded-lg px-3 text-sm outline-none transition"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="driven-before" className="text-sm font-medium uppercase text-foreground">
                  Have you driven for UK Ride before? *
                </label>
                <select
                  id="driven-before"
                  name="drivenBefore"
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

              <div className="space-y-2">
                <label htmlFor="vehicle" className="text-sm font-medium uppercase text-foreground">
                  If you own a vehicle, what kind of vehicle do you own?
                </label>
                <input
                  id="vehicle"
                  name="vehicle"
                  type="text"
                  className="form-field-light h-11 w-full rounded-lg px-3 text-sm outline-none transition"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="pco" className="text-sm font-medium uppercase text-foreground">
                  What is your PCO licence number? *
                </label>
                <input
                  id="pco"
                  name="pcoNumber"
                  type="text"
                  className="form-field-light h-11 w-full rounded-lg px-3 text-sm outline-none transition"
                />
              </div>

              <div className="space-y-3 pt-2">
                <label className="inline-flex items-center gap-2 text-sm text-foreground">
                  <input type="checkbox" name="agree" className="h-4 w-4 accent-highlight" />
                  I AGREE
                </label>
                <p className="text-sm leading-7 text-muted-foreground">
                  Should you agree, we will contact you upon completion of this form with the
                  contact details you provided above for the purpose of processing your enquiry. We
                  will not use it for any other purpose. We store a backup of the information
                  provided in a secure location on our website. This field is required.
                </p>
              </div>

              <button
                type="submit"
                className="mt-2 h-11 w-full bg-accent text-sm font-semibold text-accent-foreground transition hover:bg-accent/90"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </section>

      <FullFooterSection />
    </div>
  );
}
