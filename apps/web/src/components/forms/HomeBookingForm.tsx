"use client";

import { useState } from "react";
import { format } from "date-fns";
import { Briefcase, CalendarIcon, ChevronDown, Clock, MapPin, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { GooglePlacesInput } from "@/components/forms/GooglePlacesInput";

export function HomeBookingForm() {
  const [date, setDate] = useState<Date>();
  const [viaLocations, setViaLocations] = useState<string[]>([]);

  const addViaLocation = () => {
    if (viaLocations.length < 5) {
      setViaLocations((current) => [...current, ""]);
    }
  };

  const updateViaLocation = (index: number, value: string) => {
    setViaLocations((current) => current.map((item, i) => (i === index ? value : item)));
  };

  const removeViaLocation = (index: number) => {
    setViaLocations((current) => current.filter((_, i) => i !== index));
  };

  return (
    <Card className="text-foreground">
      <CardContent className="space-y-6 p-6 sm:p-8">
        <div className="space-y-4">
          <div className="flex items-center justify-between border-b border-[rgba(192,192,192,0.12)] pb-4">
            <h3 className="text-xl font-bold text-foreground">Book Your Transfer</h3>
            <div className="flex cursor-pointer items-center gap-1 text-sm font-medium text-muted-foreground transition-colors duration-300 hover:text-highlight">
              Return Journey <ChevronDown className="h-4 w-4" />
            </div>
          </div>

          <div className="space-y-3">
            <div className="relative">
              <MapPin className="pointer-events-none absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
              <GooglePlacesInput
                name="pickup"
                debugId="pickup"
                placeholder="Pickup Address or Airport"
                className="booking-field flex h-12 w-full px-3 py-1 pl-10 text-base md:text-sm"
              />
            </div>
            <div className="relative z-10 -mt-1 mb-2 flex justify-end pr-2">
              <button
                type="button"
                onClick={addViaLocation}
                disabled={viaLocations.length >= 5}
                className="cursor-pointer rounded-md border border-highlight/50 bg-highlight px-2 py-1 text-xs font-medium text-highlight-foreground transition-all duration-300 hover:bg-highlight/90 disabled:cursor-not-allowed disabled:opacity-50"
              >
                + Add Via
              </button>
            </div>
            {viaLocations.map((via, index) => (
              <div key={index} className="space-y-1">
                <label className="text-xs font-medium text-muted-foreground">Via Location</label>
                <div className="relative">
                  <Input
                    placeholder={`Via Address ${index + 1}`}
                    value={via}
                    onChange={(e) => updateViaLocation(index, e.target.value)}
                    className="booking-field h-12 pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => removeViaLocation(index)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-lg font-bold leading-none text-rose-400 transition-colors hover:text-rose-300"
                    aria-label={`Remove via ${index + 1}`}
                  >
                    ×
                  </button>
                </div>
              </div>
            ))}
            <div className="relative">
              <MapPin className="pointer-events-none absolute left-3 top-3 h-5 w-5 text-highlight" />
              <GooglePlacesInput
                name="dropoff"
                debugId="dropoff"
                placeholder="Dropoff Address or Airport"
                className="booking-field flex h-12 w-full px-3 py-1 pl-10 text-base md:text-sm"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-muted-foreground">Persons</label>
              <Select>
                <SelectTrigger className="booking-field h-10 w-full shadow-none data-[placeholder]:text-muted-foreground">
                  <Users className="mr-2 h-4 w-4 text-muted-foreground" />
                  <SelectValue placeholder="1" />
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
              <Select>
                <SelectTrigger className="booking-field h-10 w-full shadow-none data-[placeholder]:text-muted-foreground">
                  <Briefcase className="mr-2 h-4 w-4 text-muted-foreground" />
                  <SelectValue placeholder="0" />
                </SelectTrigger>
                <SelectContent>
                  {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
                    <SelectItem key={n} value={n.toString()}>
                      {n}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-muted-foreground">Suitcase</label>
              <Select>
                <SelectTrigger className="booking-field h-10 w-full shadow-none data-[placeholder]:text-muted-foreground">
                  <Briefcase className="mr-2 h-4 w-4 text-muted-foreground" />
                  <SelectValue placeholder="0" />
                </SelectTrigger>
                <SelectContent>
                  {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
                    <SelectItem key={n} value={n.toString()}>
                      {n}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-muted-foreground">Date</label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="booking-field h-10 w-full justify-start px-3 text-left font-normal text-foreground shadow-none hover:bg-muted/60"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4 text-muted-foreground" />
                    {date ? format(date, "dd/MM/yyyy") : <span>Select</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent align="start" className="z-[80] w-auto p-0">
                  <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
                </PopoverContent>
              </Popover>
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-muted-foreground">Time</label>
              <div className="relative">
                <Clock className="pointer-events-none absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input type="time" step={60} defaultValue="12:00" className="booking-field h-10 pl-9" />
              </div>
            </div>
          </div>

          <Button
            size="lg"
            className="h-14 w-full border border-highlight/45 text-lg font-bold shadow-[0_8px_32px_-8px_hsl(var(--highlight)/0.35)] bg-accent text-accent-foreground transition-all duration-300 hover:bg-accent/90"
          >
            Get Quote & Book Now
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
