import { autocomplete } from "@/lib/geoapify";
import { matchKnownPlaces } from "@/lib/known-places";

const MAX_RESULTS = 8;

/** Address suggestions for the booking forms (proxied so the Geoapify key stays server-side). */
export async function GET(req: Request) {
  const q = new URL(req.url).searchParams.get("q")?.trim() ?? "";
  if (q.length < 2 || q.length > 200) return Response.json({ results: [] });

  // Airports/terminals/stations first — Geoapify alone ranks them below businesses that share the name.
  const known = matchKnownPlaces(q);
  const results = [...known, ...(await autocomplete(q))].slice(0, MAX_RESULTS);

  return Response.json({ results }, { headers: { "Cache-Control": "private, max-age=300" } });
}
