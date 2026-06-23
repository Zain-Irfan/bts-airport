"use client";

export type BookingCardValues = {
  pickup: string;
  dropoff: string;
  via?: string;
  date: string;
  time: string;
  passengers: number;
  handcarry: number;
  suitcase: number;
  meetAndGreet: "yes" | "no";
  flightNumber?: string;
  returnJourney: boolean;
};

type Props = {
  title?: string;
};

export function BookingCard({ title = "Get an instant quote" }: Props) {
  return (
    <section
      id="quote"
      className="rounded-2xl border border-white/[0.08] bg-card p-5 text-card-foreground shadow-[0_24px_64px_-16px_rgba(0,0,0,0.65)] md:p-6"
    >
      <div className="flex flex-col gap-2">
        <h2 className="text-base font-bold tracking-tight text-foreground">
          {title}
        </h2>
        <p className="text-xs text-muted-foreground">
          Enter your transfer details and get an instant estimate.
        </p>
      </div>

      <form
        method="get"
        action="/quotes"
        className="mt-5 grid gap-3 md:grid-cols-2"
      >
        <Field label="Pickup address">
          <input
            name="pickup"
            placeholder="Pickup Address or Airport"
            className={inputClass}
            required
          />
        </Field>

        <Field label="Dropoff address">
          <input
            name="dropoff"
            placeholder="Dropoff Address or Airport"
            className={inputClass}
            required
          />
        </Field>

        <Field label="Via (optional)">
          <input
            name="via"
            placeholder="+ Add Via"
            className={inputClass}
          />
        </Field>

        <div className="grid grid-cols-2 gap-4">
          <Field label="Date">
            <input name="date" type="date" className={inputClass} required />
          </Field>
          <Field label="Time">
            <input name="time" type="time" className={inputClass} required />
          </Field>
        </div>

        <div className="grid grid-cols-3 gap-4 md:col-span-2">
          <Field label="Passengers">
            <select name="passengers" className={inputClass} defaultValue="1">
              {Array.from({ length: 10 }, (_, i) => i + 1).map((n) => (
                <option key={n} value={n}>
                  {n}
                </option>
              ))}
            </select>
          </Field>
          <Field label="Handcarry">
            <select name="handcarry" className={inputClass} defaultValue="0">
              {Array.from({ length: 11 }, (_, i) => i).map((n) => (
                <option key={n} value={n}>
                  {n}
                </option>
              ))}
            </select>
          </Field>
          <Field label="Suitcase">
            <select name="suitcase" className={inputClass} defaultValue="0">
              {Array.from({ length: 11 }, (_, i) => i).map((n) => (
                <option key={n} value={n}>
                  {n}
                </option>
              ))}
            </select>
          </Field>
        </div>

        <div className="grid gap-4 md:grid-cols-3 md:col-span-2">
          <Field label="Meet & greet">
            <select name="meet" className={inputClass} defaultValue="yes">
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </Field>
          <Field label="Flight number (optional)">
            <input
              name="flight"
              placeholder="e.g. BA 0326"
              className={inputClass}
            />
          </Field>
          <Field label="Return journey">
            <label className="flex h-10 items-center gap-2 rounded-lg border border-white/10 bg-secondary px-3 text-sm text-foreground">
              <input
                name="returnJourney"
                type="checkbox"
                className="h-4 w-4 accent-highlight"
              />
              Add return trip
            </label>
          </Field>
        </div>

        <div className="md:col-span-2">
          <button
            type="submit"
            className="inline-flex h-12 w-full cursor-pointer items-center justify-center rounded-lg border border-highlight/30 bg-accent px-4 text-sm font-extrabold text-accent-foreground shadow-[0_4px_24px_-6px_rgba(192,192,192,0.35)] transition-all duration-300 hover:brightness-[1.04]"
          >
            Get quote & book now
          </button>
        </div>
      </form>
    </section>
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
    <div className="flex flex-col gap-2">
      <div className="text-[11px] font-semibold text-muted-foreground">{label}</div>
      {children}
    </div>
  );
}

const inputClass =
  "form-field-light h-10 w-full rounded-lg px-3 text-sm outline-none transition";

