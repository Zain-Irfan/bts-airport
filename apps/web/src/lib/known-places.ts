// Server-only: London airports/terminals and main stations, pinned to the top of address suggestions.
// Geoapify ranks these badly (e.g. "heathrow" → businesses named Heathrow) and can geocode them to the
// wrong spot, so pricing also uses these exact coordinates when the pickup/dropoff is one of these labels.
// Airport labels must contain "Airport" — that is what triggers the meet & greet fee (airport-pickup.ts).
import type { LatLng, PlaceSuggestion } from "@/lib/geoapify";

type KnownPlace = {
  main: string;
  secondary: string;
  postcode: string;
  lat: number;
  lng: number;
  kind: "airport" | "station";
  /** Extra search words (codes, nicknames). */
  terms?: string;
};

const PLACES: KnownPlace[] = [
  { main: "Heathrow Airport Terminal 2", secondary: "Hounslow", postcode: "TW6 1EW", lat: 51.4694, lng: -0.4503, kind: "airport", terms: "lhr t2 london heathrow" },
  { main: "Heathrow Airport Terminal 3", secondary: "Hounslow", postcode: "TW6 1QG", lat: 51.4713, lng: -0.4569, kind: "airport", terms: "lhr t3 london heathrow" },
  { main: "Heathrow Airport Terminal 4", secondary: "Hounslow", postcode: "TW6 3XA", lat: 51.459, lng: -0.4466, kind: "airport", terms: "lhr t4 london heathrow" },
  { main: "Heathrow Airport Terminal 5", secondary: "Hounslow", postcode: "TW6 2GA", lat: 51.4723, lng: -0.4877, kind: "airport", terms: "lhr t5 london heathrow" },
  { main: "Gatwick Airport North Terminal", secondary: "Crawley", postcode: "RH6 0PJ", lat: 51.161, lng: -0.1773, kind: "airport", terms: "lgw london gatwick" },
  { main: "Gatwick Airport South Terminal", secondary: "Crawley", postcode: "RH6 0NP", lat: 51.1564, lng: -0.161, kind: "airport", terms: "lgw london gatwick" },
  { main: "Stansted Airport", secondary: "Stansted", postcode: "CM24 1QW", lat: 51.889, lng: 0.262, kind: "airport", terms: "stn london stansted" },
  { main: "Luton Airport", secondary: "Luton", postcode: "LU2 9LY", lat: 51.8789, lng: -0.3762, kind: "airport", terms: "ltn london luton" },
  { main: "London City Airport", secondary: "London", postcode: "E16 2PX", lat: 51.5049, lng: 0.0495, kind: "airport", terms: "lcy" },
  { main: "London Southend Airport", secondary: "Southend-on-Sea", postcode: "SS2 6YF", lat: 51.5704, lng: 0.6933, kind: "airport", terms: "sen" },
  { main: "King's Cross Station", secondary: "London", postcode: "N1 9AL", lat: 51.532, lng: -0.1233, kind: "station", terms: "kings x" },
  { main: "St Pancras International", secondary: "London", postcode: "N1C 4QP", lat: 51.5316, lng: -0.1263, kind: "station", terms: "saint eurostar station" },
  { main: "Euston Station", secondary: "London", postcode: "NW1 2RT", lat: 51.5282, lng: -0.1337, kind: "station" },
  { main: "Paddington Station", secondary: "London", postcode: "W2 1HQ", lat: 51.5154, lng: -0.1755, kind: "station" },
  { main: "Victoria Station", secondary: "London", postcode: "SW1V 1JU", lat: 51.4952, lng: -0.1441, kind: "station", terms: "london victoria coach" },
  { main: "Waterloo Station", secondary: "London", postcode: "SE1 8SW", lat: 51.5032, lng: -0.1123, kind: "station", terms: "london waterloo" },
  { main: "London Bridge Station", secondary: "London", postcode: "SE1 9SP", lat: 51.505, lng: -0.0865, kind: "station" },
  { main: "Liverpool Street Station", secondary: "London", postcode: "EC2M 7QH", lat: 51.5178, lng: -0.0817, kind: "station", terms: "london liverpool st" },
  { main: "Marylebone Station", secondary: "London", postcode: "NW1 6JJ", lat: 51.5225, lng: -0.1631, kind: "station", terms: "london marylebone" },
  { main: "Charing Cross Station", secondary: "London", postcode: "WC2N 5HF", lat: 51.508, lng: -0.1247, kind: "station", terms: "london charing x" },
];

const normalize = (s: string) =>
  s.toLowerCase().replace(/['’]/g, "").replace(/[^a-z0-9]+/g, " ").trim();

const labelOf = (p: KnownPlace) => `${p.main}, ${p.secondary} ${p.postcode}`;

const INDEX = PLACES.map((p) => ({
  place: p,
  label: labelOf(p),
  words: normalize(`${p.main} ${p.secondary} ${p.postcode} ${p.terms ?? ""}`).split(" "),
}));

const BY_LABEL = new Map(INDEX.map((e) => [normalize(e.label), e.place]));

/** Places whose words start with every word typed, e.g. "heath t5", "gatw", "kings cross". */
export function matchKnownPlaces(query: string, limit = 4): PlaceSuggestion[] {
  // "london" alone says nothing (most places here are in London); "london bridge" still matches on "bridge".
  const tokens = normalize(query).split(" ").filter((t) => t && t !== "london");
  if (!tokens.length || tokens.join("").length < 2) return [];

  return INDEX.filter(({ words }) => tokens.every((t) => words.some((w) => w.startsWith(t))))
    .slice(0, limit)
    .map(({ place: p, label }) => ({
      id: `known-${normalize(p.main).replace(/ /g, "-")}`,
      label,
      main: p.main,
      secondary: p.secondary,
      postcode: p.postcode,
      lat: p.lat,
      lng: p.lng,
      kind: p.kind,
    }));
}

/** Exact coordinates for a label picked from the list (so pricing never depends on geocoding it). */
export function knownPlaceCoords(address: string): LatLng | null {
  const p = BY_LABEL.get(normalize(address));
  return p ? [p.lat, p.lng] : null;
}
