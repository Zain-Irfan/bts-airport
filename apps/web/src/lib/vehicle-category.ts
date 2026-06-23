import type { VehicleCategory } from "@/generated/prisma/client";

export type VehicleCategoryDTO = {
  id: string;
  slug: string;
  label: string;
  isActive: boolean;
};

export function vehicleCategoryToDTO(c: VehicleCategory): VehicleCategoryDTO {
  return {
    id: c.id,
    slug: c.slug,
    label: c.label,
    isActive: c.isActive,
  };
}

/** Machine key: lowercase, snake_case, max 32 chars for DB. */
export function normalizeCategorySlug(raw: string): string {
  return raw
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "_")
    .replace(/-+/g, "_")
    .replace(/[^a-z0-9_]/g, "")
    .slice(0, 32);
}
