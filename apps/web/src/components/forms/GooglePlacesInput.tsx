"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Building2, Bus, Loader2, MapPin, Plane, TrainFront } from "lucide-react";
import { cn } from "@/lib/utils";

// --- Types ---

type NominatimResult = {
  place_id: number;
  display_name: string;
  name: string;
  type: string;
  class: string;
  lat: string;
  lon: string;
  address: Record<string, string>;
};

type HereItem = {
  id: string;
  title: string;
  resultType: string;
  position?: { lat: number; lng: number };
  access?: { lat: number; lng: number }[];
  categories?: { id: string; name?: string }[];
  address: {
    label: string;
    postalCode?: string;
    city?: string;
    county?: string;
    street?: string;
  };
};

type PlaceRow = {
  id: string;
  main: string;
  secondary: string;
  postcode: string | null;
  isTransport: boolean;
  transportType: string;
  onSelect: () => void;
};

export type PlaceResult = {
  display_name: string;
  name: string;
  lat: number;
  lng: number;
  postcode?: string;
};

type GooglePlacesInputProps = {
  name?: string;
  placeholder?: string;
  className?: string;
  defaultValue?: string;
  value?: string;
  onChange?: (value: string) => void;
  onPlaceSelected?: (place: PlaceResult) => void;
};

// --- Constants ---

const UK_POSTCODE_RE = /\b([A-Z]{1,2}\d[A-Z\d]?\s*\d[A-Z]{2})\b/i;

const NOMINATIM_TRANSPORT_CLASSES = new Set(["aeroway", "railway", "public_transport"]);
const NOMINATIM_TRANSPORT_TYPES = new Set([
  "aerodrome", "terminal", "airport",
  "station", "halt", "tram_stop", "subway_entrance",
  "bus_station", "ferry_terminal",
]);

// --- Nominatim ---

function isNominatimTransport(r: NominatimResult): boolean {
  return NOMINATIM_TRANSPORT_CLASSES.has(r.class) || NOMINATIM_TRANSPORT_TYPES.has(r.type);
}

function nominatimPostcode(r: NominatimResult): string | null {
  if (r.address?.postcode) return r.address.postcode.toUpperCase().trim();
  const m = r.display_name.match(UK_POSTCODE_RE);
  return m?.[1]?.toUpperCase().trim() ?? null;
}

function nominatimSecondary(r: NominatimResult): string {
  const parts = r.display_name.split(",").map((s) => s.trim());
  return parts
    .slice(1)
    .filter((p) => !UK_POSTCODE_RE.test(p) && p !== "United Kingdom" && p !== "UK")
    .slice(0, 3)
    .join(", ");
}

async function fetchNominatim(query: string, signal: AbortSignal): Promise<NominatimResult[]> {
  const url = new URL("https://nominatim.openstreetmap.org/search");
  url.searchParams.set("format", "json");
  url.searchParams.set("q", query);
  url.searchParams.set("countrycodes", "gb");
  url.searchParams.set("limit", "10");
  url.searchParams.set("addressdetails", "1");

  const res = await fetch(url.toString(), {
    signal,
    headers: { "Accept-Language": "en-GB,en" },
  });
  if (!res.ok) return [];
  return res.json();
}

// --- HERE Autosuggest ---

async function fetchHere(query: string, apiKey: string, signal: AbortSignal): Promise<HereItem[]> {
  const url = new URL("https://autosuggest.search.hereapi.com/v1/autosuggest");
  url.searchParams.set("q", query);
  url.searchParams.set("in", "countryCode:GBR");
  url.searchParams.set("at", "51.5074,-0.1278"); // London centre bias
  url.searchParams.set("limit", "10");
  url.searchParams.set("apiKey", apiKey);
  url.searchParams.set("lang", "en-GB");

  const res = await fetch(url.toString(), { signal });
  if (!res.ok) return [];
  const data = await res.json();
  return data.items ?? [];
}

function herePostcode(item: HereItem): string | null {
  if (item.address?.postalCode) return item.address.postalCode.toUpperCase().trim();
  const m = item.title.match(UK_POSTCODE_RE);
  return m?.[1]?.toUpperCase().trim() ?? null;
}

function hereSecondary(item: HereItem): string {
  const parts = item.title.split(",").map((s) => s.trim());
  return parts
    .slice(1)
    .filter((p) => !UK_POSTCODE_RE.test(p) && p !== "United Kingdom" && p !== "UK" && p !== "England" && p !== "Scotland" && p !== "Wales")
    .slice(0, 3)
    .join(", ");
}

// --- Icon ---

function TransportIcon({ type }: { type: string }) {
  if (type === "airport" || type === "aerodrome" || type === "terminal") return <Plane className="h-4 w-4" />;
  if (type === "station" || type === "halt" || type === "tram_stop" || type === "railway") return <TrainFront className="h-4 w-4" />;
  if (type === "bus_station") return <Bus className="h-4 w-4" />;
  return <MapPin className="h-4 w-4" />;
}

// --- Component ---

export function GooglePlacesInput({
  name,
  placeholder,
  className,
  defaultValue,
  value,
  onChange,
  onPlaceSelected,
}: GooglePlacesInputProps) {
  const hereApiKey = process.env.NEXT_PUBLIC_HERE_API_KEY ?? "";

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
  const [rows, setRows] = useState<PlaceRow[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);

  const isControlled = typeof value === "string";
  const listboxId = useMemo(() => `ukride-places-${Math.random().toString(36).slice(2, 9)}`, []);

  useEffect(() => { setActiveIndex(0); }, [rows]);

  const select = useCallback((label: string, result: PlaceResult) => {
    onChangeRef.current?.(label);
    onPlaceSelectedRef.current?.(result);
    if (inputRef.current) inputRef.current.value = label;
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
      const [nominatimData, hereData] = await Promise.all([
        fetchNominatim(input.trim(), signal),
        hereApiKey ? fetchHere(input.trim(), hereApiKey, signal) : Promise.resolve([]),
      ]);

      const seen = new Set<string>();
      const built: PlaceRow[] = [];

      // HERE results first — London-biased, returns terminals correctly
      for (const item of hereData) {
        const key = `here-${item.id}`;
        if (seen.has(key)) continue;
        seen.add(key);

        const pos = item.position ?? item.access?.[0];
        if (!pos) continue;

        const main = item.title.split(",")[0] ?? item.title;
        const secondary = hereSecondary(item);
        const postcode = herePostcode(item);
        const categoryIds = item.categories?.map((c) => c.id) ?? [];
        const isAirport = item.resultType === "airport" || categoryIds.some((c) => c.startsWith("transport-airport") || c.startsWith("airport"));
        const isStation = item.resultType === "trainStation" || categoryIds.some((c) => c.startsWith("transport-train") || c.startsWith("transport-metro") || c.startsWith("transport-public"));
        const isBus = item.resultType === "busStation" || categoryIds.some((c) => c.startsWith("transport-bus"));
        const isTransport = isAirport || isStation || isBus;

        built.push({
          id: key,
          main,
          secondary,
          postcode,
          isTransport,
          transportType: isAirport ? "airport" : isStation ? "station" : isBus ? "bus_station" : "",
          onSelect: () => select(item.title, {
            display_name: item.title,
            name: main,
            lat: pos.lat,
            lng: pos.lng,
            postcode: postcode ?? undefined,
          }),
        });
      }

      // Nominatim results after — fallback when HERE has no key or fewer results
      for (const r of nominatimData) {
        const key = `nom-${r.place_id}`;
        if (seen.has(key)) continue;
        seen.add(key);

        const transport = isNominatimTransport(r);
        const main = r.name || (r.display_name.split(",")[0] ?? r.display_name);
        const secondary = nominatimSecondary(r);
        const postcode = nominatimPostcode(r);

        built.push({
          id: key,
          main,
          secondary,
          postcode,
          isTransport: transport,
          transportType: transport ? (r.class === "aeroway" ? "airport" : r.type) : "",
          onSelect: () => select(r.display_name, {
            display_name: r.display_name,
            name: r.name,
            lat: parseFloat(r.lat),
            lng: parseFloat(r.lon),
            postcode: postcode ?? undefined,
          }),
        });
      }

      setRows(built);
      setOpen(built.length > 0);
    } catch {
      // aborted or network error
    } finally {
      setLoading(false);
    }
  }, [hereApiKey, select]);

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
      rows[activeIndex]?.onSelect();
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
              onClick={row.onSelect}
            >
              <span className="mt-0.5 shrink-0 text-muted-foreground">
                {row.isTransport ? (
                  <TransportIcon type={row.transportType} />
                ) : (
                  <Building2 className="h-4 w-4" />
                )}
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
