"use client";

import { useEffect, useMemo, useRef, useState } from "react";

declare global {
  interface Window {
    google?: typeof google;
    __ukrideGooglePlacesLoading?: Promise<void>;
  }
}

type GooglePlacesInputProps = {
  name?: string;
  placeholder?: string;
  className?: string;
  defaultValue?: string;
  value?: string;
  onChange?: (value: string) => void;
  onPlaceSelected?: (place: google.maps.places.PlaceResult) => void;
  debugId?: string;
};

function loadGooglePlacesScript(apiKey: string): Promise<void> {
  if (typeof window === "undefined") return Promise.resolve();
  if (window.google?.maps?.places) return Promise.resolve();

  if (window.__ukrideGooglePlacesLoading) return window.__ukrideGooglePlacesLoading;

  window.__ukrideGooglePlacesLoading = new Promise<void>((resolve, reject) => {
    const existing = document.querySelector<HTMLScriptElement>('script[data-ukride-google-places="true"]');
    if (existing) {
      existing.addEventListener("load", () => resolve());
      existing.addEventListener("error", () => reject(new Error("Failed to load Google Places script")));
      return;
    }

    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${encodeURIComponent(
      apiKey
    )}&libraries=places`;
    script.async = true;
    script.defer = true;
    script.setAttribute("data-ukride-google-places", "true");
    script.addEventListener("load", () => resolve());
    script.addEventListener("error", () =>
      reject(new Error("Failed to load Google Places script (network or blocked)."))
    );
    document.head.appendChild(script);
  });

  return window.__ukrideGooglePlacesLoading;
}

export function GooglePlacesInput({
  name,
  placeholder,
  className,
  defaultValue,
  value,
  onChange,
  onPlaceSelected,
  debugId,
}: GooglePlacesInputProps) {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_PLACES_API_KEY;
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [ready, setReady] = useState(false);
  const [status, setStatus] = useState<"idle" | "no-key" | "loading" | "ready" | "failed">("idle");
  const warnedRef = useRef(false);

  const isControlled = typeof value === "string";

  const options = useMemo<google.maps.places.AutocompleteOptions>(
    () => ({
      fields: ["formatted_address", "geometry", "name", "place_id", "address_components"],
      types: ["geocode"],
    }),
    []
  );

  useEffect(() => {
    let autocomplete: google.maps.places.Autocomplete | null = null;
    let cancelled = false;

    const setup = async () => {
      if (!apiKey) {
        if (!warnedRef.current) {
          warnedRef.current = true;
          // This most commonly happens when `.env.local` was added but the app wasn't rebuilt.
          // (Public env vars are inlined into the client bundle at build time.)
          console.warn(
            "[UKride] Google Places API key missing. Set NEXT_PUBLIC_GOOGLE_PLACES_API_KEY and restart. If using `next start`, run `npm run build` again."
          );
        }
        setStatus("no-key");
        return;
      }
      if (!inputRef.current) return;

      try {
        setStatus("loading");
        await loadGooglePlacesScript(apiKey);
        if (cancelled) return;

        if (!window.google?.maps?.places) return;
        autocomplete = new window.google.maps.places.Autocomplete(inputRef.current, options);
        autocomplete.addListener("place_changed", () => {
          const place = autocomplete?.getPlace();
          if (!place) return;

          const nextValue = place.formatted_address || place.name || inputRef.current?.value || "";
          if (onChange) onChange(nextValue);
          if (onPlaceSelected) onPlaceSelected(place);
        });

        setReady(true);
        setStatus("ready");
        if (debugId) {
          // eslint-disable-next-line no-console
          console.log(`[UKride] Places ready: ${debugId}`);
        }
      } catch (err) {
        if (!warnedRef.current) {
          warnedRef.current = true;
          console.warn("[UKride] Google Places failed to initialize.", err);
        }
        setStatus("failed");
      }
    };

    setup();
    return () => {
      cancelled = true;
      autocomplete = null;
    };
  }, [apiKey, options, onChange, onPlaceSelected]);

  return (
    <div className="relative">
      <input
        ref={inputRef}
        name={name}
        placeholder={placeholder}
        className={className}
        defaultValue={defaultValue}
        value={isControlled ? value : undefined}
        onChange={(e) => onChange?.(e.target.value)}
        autoComplete={ready ? "off" : "on"}
        inputMode="text"
      />
      {debugId && (
        <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-medium text-muted-foreground">
          {status}
        </span>
      )}
    </div>
  );
}

