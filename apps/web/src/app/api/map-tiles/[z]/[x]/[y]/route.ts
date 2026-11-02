import type { NextRequest } from "next/server";
import { tileUrl } from "@/lib/geoapify";

/** Map tiles for the route map (proxied so the Geoapify key stays server-side). `y` may end in "@2x" for retina. */
export async function GET(_req: NextRequest, { params }: { params: Promise<{ z: string; x: string; y: string }> }) {
  const { z: zs, x: xs, y: ys } = await params;
  const retina = ys.endsWith("@2x");
  const [z, x, y] = [zs, xs, ys.replace(/@2x$/, "").replace(/\.png$/, "")].map((v) => Number.parseInt(v, 10));

  const max = 2 ** z;
  if (![z, x, y].every(Number.isInteger) || z < 0 || z > 20 || x < 0 || y < 0 || x >= max || y >= max) {
    return new Response("Bad tile", { status: 400 });
  }

  const url = tileUrl(z, x, y, retina);
  if (!url) return new Response("Map tiles not configured", { status: 503 });

  try {
    const res = await fetch(url, { signal: AbortSignal.timeout(8000) });
    if (!res.ok) return new Response("Tile unavailable", { status: 502 });
    return new Response(res.body, {
      headers: {
        "Content-Type": res.headers.get("Content-Type") ?? "image/png",
        // s-maxage lets a CDN (e.g. Vercel's) serve repeat tiles without re-running this route.
        "Cache-Control": "public, max-age=604800, s-maxage=604800, immutable",
      },
    });
  } catch {
    return new Response("Tile unavailable", { status: 502 });
  }
}
