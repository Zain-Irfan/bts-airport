import { getRouteDistance } from "@/lib/route-distance";

/** Driving distance used for quote prices — same source the payment API charges from. */
export async function GET(req: Request) {
  const sp = new URL(req.url).searchParams;
  const origin = sp.get("origin")?.trim() ?? "";
  const destination = sp.get("destination")?.trim() ?? "";
  const vias = sp.getAll("via").map((v) => v.trim()).filter(Boolean);

  if (!origin || !destination || origin.length > 300 || destination.length > 300 || vias.length > 5) {
    return Response.json({ error: "Invalid route" }, { status: 400 });
  }

  return Response.json(await getRouteDistance(origin, destination, vias));
}
