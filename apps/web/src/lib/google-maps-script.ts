declare global {
  interface Window {
    google?: typeof google;
    __BTSGooglePlacesLoading?: Promise<void>;
  }
}

/** Loads Maps JS (with Places). Safe to call multiple times. */
export function loadGooglePlacesScript(apiKey: string): Promise<void> {
  if (typeof window === "undefined") return Promise.resolve();
  if (window.google?.maps?.places) return Promise.resolve();

  if (window.__BTSGooglePlacesLoading) return window.__BTSGooglePlacesLoading;

  window.__BTSGooglePlacesLoading = new Promise<void>((resolve, reject) => {
    const existing = document.querySelector<HTMLScriptElement>('script[data-BTS-google-places="true"]');
    if (existing) {
      existing.addEventListener("load", () => resolve());
      existing.addEventListener("error", () => reject(new Error("Failed to load Google Maps script")));
      return;
    }

    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${encodeURIComponent(apiKey)}&libraries=places`;
    script.async = true;
    script.defer = true;
    script.setAttribute("data-BTS-google-places", "true");
    script.addEventListener("load", () => resolve());
    script.addEventListener("error", () => reject(new Error("Failed to load Google Maps script")));
    document.head.appendChild(script);
  });

  return window.__BTSGooglePlacesLoading;
}
