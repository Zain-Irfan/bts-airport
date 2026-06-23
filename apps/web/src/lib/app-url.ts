/** Hosts Revolut rejects for redirect_url (localhost, IPs). */
export function isInvalidRevolutRedirectHost(urlOrHost: string): boolean {
  try {
    const url = urlOrHost.includes("://") ? urlOrHost : `http://${urlOrHost}`;
    const host = new URL(url).hostname.toLowerCase();
    if (host === "localhost" || host === "127.0.0.1" || host.endsWith(".localhost")) {
      return true;
    }
    if (/^\d{1,3}(\.\d{1,3}){3}$/.test(host)) {
      return true;
    }
  } catch {
    return true;
  }
  return false;
}

/** Public site origin for Revolut redirects (not the browser URL — can differ on localhost dev). */
export function getAppBaseUrl(request?: Request): string {
  const redirectOverride = process.env.REVOLUT_REDIRECT_BASE_URL?.trim();
  if (redirectOverride && !isInvalidRevolutRedirectHost(redirectOverride)) {
    return redirectOverride.replace(/\/$/, "");
  }

  const fromEnv = process.env.NEXT_PUBLIC_APP_URL?.trim();
  if (fromEnv && !isInvalidRevolutRedirectHost(fromEnv)) {
    return fromEnv.replace(/\/$/, "");
  }

  if (request) {
    const host =
      request.headers.get("x-forwarded-host")?.split(",")[0]?.trim() ||
      request.headers.get("host")?.trim();
    const proto =
      request.headers.get("x-forwarded-proto")?.split(",")[0]?.trim() ||
      (host?.includes("localhost") ? "http" : "https");

    if (host && !isInvalidRevolutRedirectHost(host)) {
      return `${proto}://${host}`.replace(/\/$/, "");
    }
  }

  const vercel = process.env.VERCEL_URL?.trim();
  if (vercel && !isInvalidRevolutRedirectHost(vercel)) {
    return `https://${vercel.replace(/\/$/, "")}`;
  }

  return "";
}

export function requireAppBaseUrl(request?: Request): string {
  const base = getAppBaseUrl(request);
  if (base) return base;

  throw new Error(
    "Set NEXT_PUBLIC_APP_URL in .env.local to your site URL (e.g. http://BTS.test). Revolut cannot use localhost or IP addresses for payment redirects.",
  );
}
