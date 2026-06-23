import { prisma } from "@/lib/prisma";

export type SiteSettings = {
  whatsapp: string;  // digits only, e.g. "447700140900"
  email: string;
};

const DEFAULTS: SiteSettings = {
  whatsapp: "447700140900",
  email: "support@BTS.uk",
};

export async function getSiteSettings(): Promise<SiteSettings> {
  try {
    const rows = await prisma.setting.findMany({
      where: { key: { in: ["whatsapp_number", "contact_email"] } },
    });
    const map: Record<string, string> = {};
    for (const row of rows) map[row.key] = row.value;

    return {
      whatsapp: map["whatsapp_number"]?.trim() || DEFAULTS.whatsapp,
      email:    map["contact_email"]?.trim()    || DEFAULTS.email,
    };
  } catch {
    return DEFAULTS;
  }
}
