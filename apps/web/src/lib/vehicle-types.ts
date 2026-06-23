import type { VehicleType } from "@/generated/prisma/client";

export type VehicleTypeDTO = {
  id: string;
  slug: string;
  name: string;
  subtitle: string | null;
  imageUrl: string | null;
  maxPassengers: number;
  maxHandLuggage: number;
  maxSuitcases: number;
  baseFareGbp: string;
  perMileGbp: string;
  minimumFareGbp: string;
  promoDiscountPercent: string;
  categoryKey: string;
  isActive: boolean;
};

export function vehicleTypeToDTO(v: VehicleType): VehicleTypeDTO {
  return {
    id: v.id,
    slug: v.slug,
    name: v.name,
    subtitle: v.subtitle,
    imageUrl: v.imageUrl,
    maxPassengers: v.maxPassengers,
    maxHandLuggage: v.maxHandLuggage,
    maxSuitcases: v.maxSuitcases,
    baseFareGbp: v.baseFareGbp.toString(),
    perMileGbp: v.perMileGbp.toString(),
    minimumFareGbp: v.minimumFareGbp.toString(),
    promoDiscountPercent: v.promoDiscountPercent.toString(),
    categoryKey: v.categoryKey,
    isActive: v.isActive,
  };
}
