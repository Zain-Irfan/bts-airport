import { revalidatePath } from "next/cache";

/**
 * Public pages are prerendered and cached (on Vercel too), so DB-driven content — site settings in the
 * layout, the homepage fleet — would otherwise stay frozen until the next deploy. Call after admin edits.
 */
export function refreshPublicPages() {
  revalidatePath("/", "layout");
}
