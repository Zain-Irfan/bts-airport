import { autocomplete } from "@/lib/geoapify";

/** Address suggestions for the booking forms (proxied so the Geoapify key stays server-side). */
export async function GET(req: Request) {
  const q = new URL(req.url).searchParams.get("q")?.trim() ?? "";
  if (q.length < 2 || q.length > 200) return Response.json({ results: [] });

  return Response.json(
    { results: await autocomplete(q) },
    { headers: { "Cache-Control": "private, max-age=300" } },
  );
}
