/** Public site origin used for Stripe success / cancel redirects. Stripe accepts localhost in test mode. */
export function getAppBaseUrl(request?: Request): string {
  const fromEnv = process.env.NEXT_PUBLIC_APP_URL?.trim();
  if (fromEnv) {
    return fromEnv.replace(/\/$/, "");
  }

  if (request) {
    const host =
      request.headers.get("x-forwarded-host")?.split(",")[0]?.trim() ||
      request.headers.get("host")?.trim();
    const proto =
      request.headers.get("x-forwarded-proto")?.split(",")[0]?.trim() ||
      (host?.startsWith("localhost") || host?.startsWith("127.0.0.1") ? "http" : "https");

    if (host) {
      return `${proto}://${host}`.replace(/\/$/, "");
    }
  }

  const vercel = process.env.VERCEL_URL?.trim();
  if (vercel) {
    return `https://${vercel.replace(/\/$/, "")}`;
  }

  return "";
}

export function requireAppBaseUrl(request?: Request): string {
  const base = getAppBaseUrl(request);
  if (base) return base;
  throw new Error("Set NEXT_PUBLIC_APP_URL to your site URL so payment redirects work.");
}
