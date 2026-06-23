"use client";

import { useRef } from "react";
import { Clock } from "lucide-react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

type BookingTimeFieldProps = Omit<React.ComponentProps<typeof Input>, "type"> & {
  defaultValue?: string;
};

export function BookingTimeField({
  className,
  defaultValue,
  value,
  ...props
}: BookingTimeFieldProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  function openPicker() {
    const el = inputRef.current;
    if (!el) return;
    try {
      if (typeof el.showPicker === "function") {
        el.showPicker();
        return;
      }
    } catch {
      /* showPicker can throw outside a user gesture in some cases */
    }
    el.focus();
    el.click();
  }

  return (
    <div className="relative cursor-pointer" onClick={() => openPicker()}>
      <Input
        ref={inputRef}
        type="time"
        step={60}
        value={value}
        defaultValue={value === undefined ? (defaultValue ?? "12:00") : undefined}
        className={cn("BTS-booking-time cursor-pointer pl-10 tabular-nums", className)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            openPicker();
          }
        }}
        {...props}
      />
      <span
        className="pointer-events-none absolute left-3 top-1/2 flex h-5 w-5 -translate-y-1/2 items-center justify-center text-muted-foreground"
        aria-hidden
      >
        <Clock className="h-4 w-4" />
      </span>
    </div>
  );
}
