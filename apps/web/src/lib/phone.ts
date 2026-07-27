/** Client-safe phone helpers — no server/Prisma imports, safe in any component. */

/** Convert a display phone (e.g. "+44 2080 5090 14") into a tel: href value. */
export function telHref(phone: string): string {
  return `tel:${phone.replace(/[^\d+]/g, "")}`;
}
