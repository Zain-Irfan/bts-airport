/**
 * Heuristic: pickup looks like a UK / common airport address (typed or from Places).
 */
export function isLikelyAirportPickup(value: string): boolean {
  const t = value.trim().toLowerCase();
  if (!t) return false;

  if (/\bairport\b/i.test(value)) return true;

  if (
    /\bterminal\b/i.test(value) &&
    /(heathrow|gatwick|stansted|luton|southend|city|birmingham|manchester|east midlands)/i.test(
      value,
    )
  ) {
    return true;
  }

  const names = [
    "heathrow",
    "gatwick",
    "stansted",
    "luton airport",
    "luton",
    "southend",
    "london city",
    "city airport",
    "biggin hill",
    "farnborough",
    "birmingham airport",
    "manchester airport",
    "east midlands",
    "liverpool airport",
    "bristol airport",
    "newcastle airport",
    "edinburgh airport",
    "glasgow airport",
    "belfast",
    "leeds bradford",
  ];

  if (names.some((n) => t.includes(n))) return true;

  if (/\b(lhr|lgw|stn|ltn|lcy|sen|bhx|man|edi|gla|bfs|ncl|brs|lpl)\b/i.test(value)) {
    return true;
  }

  return false;
}
