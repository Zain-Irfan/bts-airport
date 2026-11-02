"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import { Building2, Bus, Loader2, Plane, TrainFront } from "lucide-react";
import { cn } from "@/lib/utils";
import type { PlaceSuggestion } from "@/lib/geoapify";

// --- Types ---

export type PlaceResult = {
  display_name: string;
  name: string;
  lat: number;
  lng: number;
  postcode?: string;
};

type AddressInputProps = {
  name?: string;
  placeholder?: string;
  className?: string;
  defaultValue?: string;
  value?: string;
  onChange?: (value: string) => void;
  onPlaceSelected?: (place: PlaceResult) => void;
};

/** Suggestions come from our own API (Geoapify behind it, key kept server-side). */
async function fetchSuggestions(query: string, signal: AbortSignal): Promise<PlaceSuggestion[]> {
  const res = await fetch(`/api/places/autocomplete?${new URLSearchParams({ q: query })}`, { signal });
  if (!res.ok) return [];
  const data = (await res.json()) as { results?: PlaceSuggestion[] };
  return data.results ?? [];
}

// --- Icon ---

function PlaceIcon({ kind }: { kind: PlaceSuggestion["kind"] }) {
  if (kind === "airport") return <Plane className="h-4 w-4" />;
  if (kind === "station") return <TrainFront className="h-4 w-4" />;
  if (kind === "bus") return <Bus className="h-4 w-4" />;
  return <Building2 className="h-4 w-4" />;
}

// --- Component ---

export function AddressInput({
  name,
  placeholder,
  className,
  defaultValue,
  value,
  onChange,
  onPlaceSelected,
}: AddressInputProps) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const rootRef = useRef<HTMLDivElement | null>(null);
  const onChangeRef = useRef(onChange);
  const onPlaceSelectedRef = useRef(onPlaceSelected);
  onChangeRef.current = onChange;
  onPlaceSelectedRef.current = onPlaceSelected;

  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const abortRef = useRef<AbortController | null>(null);

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [rows, setRows] = useState<PlaceSuggestion[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);

  const isControlled = typeof value === "string";
  // useId is stable between server and client render (Math.random caused a hydration mismatch)
  const listboxId = `ukride-places-${useId().replace(/:/g, "")}`;

  useEffect(() => { setActiveIndex(0); }, [rows]);

  const select = useCallback((row: PlaceSuggestion) => {
    onChangeRef.current?.(row.label);
    onPlaceSelectedRef.current?.({
      display_name: row.label,
      name: row.main,
      lat: row.lat,
      lng: row.lng,
      postcode: row.postcode ?? undefined,
    });
    if (inputRef.current) inputRef.current.value = row.label;
    setOpen(false);
    setRows([]);
  }, []);

  const fetchResults = useCallback(async (input: string) => {
    if (input.trim().length < 2) {
      setRows([]);
      setOpen(false);
      return;
    }

    abortRef.current?.abort();
    abortRef.current = new AbortController();
    const signal = abortRef.current.signal;

    setLoading(true);
    try {
      const results = await fetchSuggestions(input.trim(), signal);
      setRows(results);
      setOpen(results.length > 0);
    } catch {
      // aborted or network error
    } finally {
      setLoading(false);
    }
  }, []);

  const scheduleFetch = useCallback((raw: string) => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => void fetchResults(raw), 300);
  }, [fetchResults]);

  useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!open || rows.length === 0) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((i) => Math.min(i + 1, rows.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      const row = rows[activeIndex];
      if (row) select(row);
    } else if (e.key === "Escape") {
      setOpen(false);
    }
  };

  return (
    <div ref={rootRef} className="relative w-full">
      <div className="relative">
        <input
          ref={inputRef}
          name={name}
          placeholder={placeholder}
          className={cn(className, loading && "pr-9")}
          defaultValue={defaultValue}
          value={isControlled ? value : undefined}
          onChange={(e) => {
            const v = e.target.value;
            onChangeRef.current?.(v);
            scheduleFetch(v);
          }}
          onFocus={() => {
            const v = inputRef.current?.value ?? "";
            if (v.trim().length >= 2) void fetchResults(v);
          }}
          onKeyDown={onKeyDown}
          autoComplete="off"
          inputMode="text"
          role="combobox"
          aria-expanded={open}
          aria-controls={listboxId}
          aria-autocomplete="list"
        />

        {loading && (
          <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
            <Loader2 className="h-4 w-4 animate-spin" />
          </div>
        )}
      </div>

      {open && rows.length > 0 && (
        <div
          id={listboxId}
          role="listbox"
          className="absolute left-0 right-0 top-full z-[100] mt-1 max-h-[min(22rem,calc(100vh-12rem))] overflow-y-auto rounded-lg border border-border bg-popover text-popover-foreground shadow-lg"
        >
          {rows.map((row, i) => (
            <button
              key={row.id}
              type="button"
              role="option"
              aria-selected={i === activeIndex}
              className={cn(
                "flex w-full items-start gap-2 border-b border-border/60 px-3 py-2.5 text-left text-sm last:border-b-0",
                i === activeIndex ? "bg-muted/80" : "hover:bg-muted/50",
              )}
              onMouseEnter={() => setActiveIndex(i)}
              onMouseDown={(ev) => ev.preventDefault()}
              onClick={() => select(row)}
            >
              <span className="mt-0.5 shrink-0 text-muted-foreground">
                <PlaceIcon kind={row.kind} />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block font-medium leading-snug text-foreground">{row.main}</span>
                {row.secondary ? (
                  <span className="mt-0.5 block text-xs leading-snug text-muted-foreground">{row.secondary}</span>
                ) : null}
              </span>
              {row.postcode ? (
                <span className="shrink-0 rounded-md border border-border bg-muted/50 px-2 py-0.5 text-[10px] font-medium tracking-wide text-muted-foreground">
                  {row.postcode}
                </span>
              ) : null}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
