"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { format, startOfDay } from "date-fns";
import { ArrowLeftRight, Briefcase, CalendarIcon, MapPin, Users, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { GooglePlacesInput } from "@/components/forms/GooglePlacesInput";
import { BookingTimeField } from "@/components/forms/BookingTimeField";
import { isLikelyAirportPickup } from "@/lib/airport-pickup";
import { MEET_AND_GREET_FEE_GBP } from "@/lib/booking-pricing";
import {
  earliestPickup,
  getOutboundDatetimeError,
  getReturnDatetimeError,
  startOfToday,
} from "@/lib/booking-datetime";

type ViaStop = { id: string; value: string };

function newViaStop(): ViaStop {
  return { id: `via-${crypto.randomUUID()}`, value: "" };
}

export function HomeBookingForm() {
  const router = useRouter();
  const [date, setDate] = useState<Date>(() => {
    const d = new Date();
    d.setHours(12, 0, 0, 0);
    return d;
  });
  const [viaLocations, setViaLocations] = useState<ViaStop[]>([]);
  const [pickup, setPickup] = useState("");
  const [dropoff, setDropoff] = useState("");
  const [passengers, setPassengers] = useState("1");
  const [handcarry, setHandcarry] = useState("0");
  const [suitcase, setSuitcase] = useState("0");
  const [meetAndGreet, setMeetAndGreet] = useState(true);
  const MEET_FEE = MEET_AND_GREET_FEE_GBP;
  const [flightNumber, setFlightNumber] = useState("");
  const [returnEnabled, setReturnEnabled] = useState(false);
  const [returnDate, setReturnDate] = useState<Date>(() => {
    const d = new Date();
    d.setDate(d.getDate() + 2);
    d.setHours(12, 0, 0, 0);
    return d;
  });
  const [time, setTime] = useState("12:00");
  const [returnTime, setReturnTime] = useState("12:00");
  // The server can't know the visitor's clock/time zone, so the earliest valid pickup is
  // applied after mount; until then the lead-time error and disabled state are held back.
  const [defaultsReady, setDefaultsReady] = useState(false);

  useEffect(() => {
    const earliest = earliestPickup();
    setDate(earliest.date);
    setTime(earliest.time);
    setDefaultsReady(true);
  }, []);

  const outboundDateTimeError = useMemo(
    () => (defaultsReady ? getOutboundDatetimeError(date, time) : null),
    [defaultsReady, date, time],
  );
  const returnDateTimeError = useMemo(
    () =>
      returnEnabled
        ? getReturnDatetimeError(date, time, returnDate, returnTime)
        : null,
    [returnEnabled, date, time, returnDate, returnTime],
  );

  const showAirportFields = isLikelyAirportPickup(pickup);
  const todayStart = useMemo(() => startOfToday(), []);

  const toggleReturnJourney = () => {
    setReturnEnabled((on) => {
      if (!on) {
        const d = new Date(date);
        d.setDate(d.getDate() + 2);
        d.setHours(12, 0, 0, 0);
        setReturnDate(d);
      }
      return !on;
    });
  };

  const addViaLocation = () => {
    if (viaLocations.length < 5) {
      setViaLocations((current) => [...current, newViaStop()]);
    }
  };

  const updateViaLocation = (id: string, value: string) => {
    setViaLocations((current) => current.map((item) => (item.id === id ? { ...item, value } : item)));
  };

  const removeViaLocation = (id: string) => {
    setViaLocations((current) => current.filter((item) => item.id !== id));
  };

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!pickup.trim() || !dropoff.trim()) {
      return;
    }
    if (outboundDateTimeError || returnDateTimeError) {
      return;
    }

    const params = new URLSearchParams({
      pickup: pickup.trim(),
      dropoff: dropoff.trim(),
      date: format(date, "yyyy-MM-dd"),
      time,
      passengers,
      handcarry,
      suitcase,
      meet: meetAndGreet ? "yes" : "no",
      meetFee: meetAndGreet ? String(MEET_FEE) : "0",
      flight: flightNumber.trim(),
    });
    viaLocations
      .map((v) => v.value.trim())
      .filter(Boolean)
      .forEach((v) => params.append("via", v));
    if (returnEnabled) {
      params.set("return", "1");
      params.set("returnDate", format(returnDate, "yyyy-MM-dd"));
      params.set("returnTime", returnTime);
    }
    router.push(`/quotes?${params.toString()}`);
  }

  return (
    <Card className="theme-light text-foreground shadow-2xl">
      <CardContent className="space-y-5 p-4 sm:space-y-6 sm:p-6 md:p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div className="border-b border-border pb-4">
              <h3 className="text-lg font-bold text-foreground sm:text-xl">Get an instant fixed quote</h3>
              <p className="mt-1 text-sm text-muted-foreground">Fixed price, taxes and tolls included — no hidden fees</p>
            </div>

            <div className="space-y-3">
              <div className="relative">
                <MapPin className="pointer-events-none absolute left-3 top-3.5 z-10 h-5 w-5 text-muted-foreground" />
                <GooglePlacesInput
                  name="pickup"
                  placeholder="Pickup Address or Airport"
                  className="booking-field flex h-12 w-full px-3 py-1 pl-10 text-base md:text-sm"
                  value={pickup}
                  onChange={setPickup}
                />
              </div>
              <div className="relative z-10 -mt-1 mb-2 flex justify-end pr-2">
                <button
                  type="button"
                  onClick={addViaLocation}
                  disabled={viaLocations.length >= 5}
                  className="cursor-pointer rounded-md px-2 py-1 text-xs font-semibold text-gold-ink transition-colors duration-200 hover:bg-gold/10 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  + Add Via
                </button>
              </div>
              {viaLocations.map((via, index) => (
                <div key={via.id} className="relative z-20 space-y-1">
                  <label className="text-xs font-medium text-muted-foreground">Via Location</label>
                  <div className="relative">
                    <MapPin className="pointer-events-none absolute left-3 top-3.5 z-10 h-5 w-5 text-muted-foreground" />
                    <GooglePlacesInput
                      name={`via-${index + 1}`}
                      placeholder={`Via Address ${index + 1}`}
                      className="booking-field flex h-12 w-full px-3 py-1 pl-10 pr-10 text-base md:text-sm"
                      value={via.value}
                      onChange={(value) => updateViaLocation(via.id, value)}
                    />
                    <button
                      type="button"
                      onClick={() => removeViaLocation(via.id)}
                      className="absolute right-3 top-1/2 z-10 -translate-y-1/2 cursor-pointer text-lg font-bold leading-none text-rose-500 transition-colors hover:text-rose-600"
                      aria-label={`Remove via ${index + 1}`}
                    >
                      ×
                    </button>
                  </div>
                </div>
              ))}
              <div className="relative">
                <MapPin className="pointer-events-none absolute left-3 top-3.5 z-10 h-5 w-5 text-muted-foreground" />
                <GooglePlacesInput
                  name="dropoff"
                  placeholder="Dropoff Address or Airport"
                  className="booking-field flex h-12 w-full px-3 py-1 pl-10 text-base md:text-sm"
                  value={dropoff}
                  onChange={setDropoff}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-muted-foreground">Persons</label>
                <Select value={passengers} onValueChange={setPassengers}>
                  <SelectTrigger className="booking-field h-10 w-full shadow-none data-[placeholder]:text-muted-foreground">
                    <Users className="mr-2 h-4 w-4 text-muted-foreground" />
                    <span className="flex-1 truncate text-left text-foreground"><SelectValue placeholder="1" /></span>
                  </SelectTrigger>
                  <SelectContent>
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
                      <SelectItem key={n} value={n.toString()}>
                        {n}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-muted-foreground">Handcarry</label>
                <Select value={handcarry} onValueChange={setHandcarry}>
                  <SelectTrigger className="booking-field h-10 w-full shadow-none">
                    <Briefcase className="mr-2 h-4 w-4 shrink-0 text-muted-foreground" />
                    <span className="flex-1 truncate text-left text-foreground">{handcarry}</span>
                    <SelectValue className="sr-only" aria-label={`Handcarry: ${handcarry}`} />
                  </SelectTrigger>
                  <SelectContent>
                    {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
                      <SelectItem key={`handcarry-${n}`} value={String(n)} textValue={String(n)}>
                        {n}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-muted-foreground">Suitcase</label>
                <Select value={suitcase} onValueChange={setSuitcase}>
                  <SelectTrigger className="booking-field h-10 w-full shadow-none">
                    <Briefcase className="mr-2 h-4 w-4 shrink-0 text-muted-foreground" />
                    <span className="flex-1 truncate text-left text-foreground">{suitcase}</span>
                    <SelectValue className="sr-only" aria-label={`Suitcase: ${suitcase}`} />
                  </SelectTrigger>
                  <SelectContent>
                    {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
                      <SelectItem key={`suitcase-${n}`} value={String(n)} textValue={String(n)}>
                        {n}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-muted-foreground">
                  {returnEnabled ? "Outbound date" : "Date"}
                </label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      type="button"
                      variant="outline"
                      className="booking-field h-10 w-full cursor-pointer justify-start px-3 text-left font-normal text-foreground shadow-none hover:bg-muted/60"
                    >
                      <CalendarIcon className="mr-2 h-4 w-4 text-muted-foreground" />
                      {date ? format(date, "dd/MM/yyyy") : <span>Select</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent align="start" className="z-[80] w-auto max-w-[calc(100vw-1.5rem)] min-w-[20rem] p-1 sm:min-w-[22.5rem] sm:p-2">
                    <Calendar
                      mode="single"
                      required
                      selected={date}
                      onSelect={(d) => d && setDate(startOfDay(d))}
                      disabled={{ before: todayStart }}
                      initialFocus
                      size="booking"
                    />
                  </PopoverContent>
                </Popover>
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-muted-foreground">
                  {returnEnabled ? "Outbound time" : "Time"}
                </label>
                <BookingTimeField
                  name="time"
                  className={cn(
                    "booking-field h-10",
                    outboundDateTimeError && "border-rose-500/70 focus-visible:ring-rose-500/40",
                  )}
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  aria-invalid={Boolean(outboundDateTimeError)}
                />
                {outboundDateTimeError ? (
                  <p className="text-xs text-rose-500" role="alert">
                    {outboundDateTimeError}
                  </p>
                ) : null}
              </div>
            </div>

            {/* ── Return Journey Toggle Row ── */}
            <div className="rounded-xl border border-border bg-muted/50 overflow-hidden">
              {/* Toggle row */}
              <button
                type="button"
                onClick={toggleReturnJourney}
                className="flex w-full cursor-pointer items-center justify-between px-4 py-3 transition-colors duration-200 hover:bg-muted"
              >
                <span className="flex items-center gap-2.5 text-sm font-semibold text-foreground/90">
                  <ArrowLeftRight className="h-4 w-4 text-muted-foreground" />
                  Return Journey
                </span>
                {/* Toggle switch */}
                <span
                  className={cn(
                    "relative inline-flex h-6 w-11 shrink-0 items-center rounded-full border-2 transition-colors duration-300",
                    returnEnabled
                      ? "border-transparent bg-gold"
                      : "border-transparent bg-border-strong",
                  )}
                  aria-checked={returnEnabled}
                  role="switch"
                >
                  <span
                    className={cn(
                      "inline-block h-4 w-4 rounded-full bg-white shadow-md transition-transform duration-300",
                      returnEnabled ? "translate-x-5" : "translate-x-0.5",
                    )}
                  />
                </span>
              </button>

              {/* Return Journey Details — shown when enabled */}
              {returnEnabled && (
                <div className="border-t border-border bg-card px-4 pb-4 pt-3">
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1.5">
                      <label className="text-xs font-medium text-muted-foreground">Return Date</label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            type="button"
                            variant="outline"
                            className="booking-field h-10 w-full cursor-pointer justify-start px-3 text-left font-normal text-foreground shadow-none hover:bg-muted/60"
                          >
                            <CalendarIcon className="mr-2 h-4 w-4 text-muted-foreground" />
                            {returnDate ? format(returnDate, "dd/MM/yyyy") : <span>Select</span>}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent align="start" className="z-[80] w-auto max-w-[calc(100vw-1.5rem)] min-w-[20rem] p-1 sm:min-w-[22.5rem] sm:p-2">
                          <Calendar
                            mode="single"
                            required
                            selected={returnDate}
                            onSelect={(d) => d && setReturnDate(startOfDay(d))}
                            disabled={{ before: startOfDay(date) }}
                            initialFocus
                            size="booking"
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-medium text-muted-foreground">Return Time</label>
                      <BookingTimeField
                        name="returnTime"
                        className={cn(
                          "booking-field h-10",
                          returnDateTimeError && "border-rose-500/70 focus-visible:ring-rose-500/40",
                        )}
                        value={returnTime}
                        onChange={(e) => setReturnTime(e.target.value)}
                        aria-invalid={Boolean(returnDateTimeError)}
                      />
                      {returnDateTimeError ? (
                        <p className="text-xs text-rose-500" role="alert">
                          {returnDateTimeError}
                        </p>
                      ) : null}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {showAirportFields && (
              <div className="space-y-3">
                {/* Meet & Greet toggle */}
                <div className="rounded-xl border border-border bg-muted/60 px-4 py-3">
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2.5">
                      <ShieldCheck className="h-5 w-5 shrink-0 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-semibold text-foreground">Meet &amp; Greet Service</p>
                        <p className="text-xs text-muted-foreground">Driver meets you at arrivals with a name board</p>
                      </div>
                    </div>
                    {/* Toggle switch */}
                    <button
                      type="button"
                      role="switch"
                      aria-checked={meetAndGreet}
                      onClick={() => setMeetAndGreet((v) => !v)}
                      className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors duration-200 focus:outline-none ${meetAndGreet ? "bg-gold" : "bg-border-strong"}`}
                    >
                      <span className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform duration-200 ${meetAndGreet ? "translate-x-5" : "translate-x-0.5"}`} />
                    </button>
                  </div>
                  {meetAndGreet && (
                    <p className="mt-2.5 rounded-lg border border-gold/30 bg-gold/10 px-3 py-2 text-xs font-semibold text-foreground">
                      Meet &amp; Greet charge: £{MEET_FEE.toFixed(2)}
                    </p>
                  )}
                </div>

                {/* Flight number */}
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-muted-foreground">Flight number</label>
                  <Input
                    name="flightNumber"
                    value={flightNumber}
                    onChange={(e) => setFlightNumber(e.target.value)}
                    placeholder="e.g. BA 0326"
                    className="booking-field h-10"
                    autoComplete="off"
                  />
                </div>
              </div>
            )}

            <Button
              type="submit"
              size="lg"
              disabled={Boolean(outboundDateTimeError || returnDateTimeError)}
              className="h-14 w-full cursor-pointer text-base font-bold disabled:cursor-not-allowed disabled:opacity-60"
            >
              Get Quote & Book Now
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
