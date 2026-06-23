/** Distance-based list price before promo; enforces minimum fare. */
export function calculateListPriceGbp(
  miles: number,
  baseFareGbp: string,
  perMileGbp: string,
  minimumFareGbp: string,
): number {
  const base = Number(baseFareGbp);
  const perMile = Number(perMileGbp);
  const minFare = Number(minimumFareGbp);
  if (!Number.isFinite(base) || !Number.isFinite(perMile) || !Number.isFinite(minFare)) {
    return 0;
  }
  if (!Number.isFinite(miles) || miles < 0) {
    return minFare;
  }
  const line = base + miles * perMile;
  return Math.max(line, minFare);
}

export function applyPromoPrice(listPrice: number, promoPercent: number): number {
  const pct = Number(promoPercent) || 0;
  if (pct <= 0) return listPrice;
  return listPrice * (1 - pct / 100);
}

export function formatGbp(amount: number): string {
  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}
