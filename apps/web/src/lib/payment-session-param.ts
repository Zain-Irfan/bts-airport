/** Read London Airport Taxi Services payment session id from success URL (query or path). */
export function paymentSessionIdFromUrl(
  searchParams: URLSearchParams | Record<string, string | undefined>,
  pathSessionId?: string | null,
): string {
  const fromPath = pathSessionId?.trim();
  if (fromPath) return fromPath;

  const get = (key: string): string | undefined => {
    if (searchParams instanceof URLSearchParams) {
      return searchParams.get(key) ?? undefined;
    }
    const v = searchParams[key];
    return typeof v === "string" ? v : undefined;
  };

  return get("sessionId")?.trim() || get("session_id")?.trim() || "";
}

export function paymentSuccessPath(sessionId: string): string {
  return `/payment/success/${encodeURIComponent(sessionId)}`;
}
