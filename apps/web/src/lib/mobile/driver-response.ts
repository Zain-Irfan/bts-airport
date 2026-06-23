import type { Driver } from "@/generated/prisma/client";

/** Safe driver payload for mobile clients (never includes password). */
export function toDriverProfile(driver: Driver) {
  return {
    id: driver.id,
    fullName: driver.fullName,
    email: driver.email,
    phone: driver.phone,
    licenseNumber: driver.licenseNumber,
    licenseImageUrl: driver.licenseImageUrl,
    vehicleType: driver.vehicleType,
    vehicleModel: driver.vehicleModel,
    vehiclePlate: driver.vehiclePlate,
    experience: driver.experience,
    address: driver.address,
    status: driver.status,
    reviewNotes: driver.reviewNotes,
    reviewedAt: driver.reviewedAt?.toISOString() ?? null,
    createdAt: driver.createdAt.toISOString(),
    updatedAt: driver.updatedAt.toISOString(),
  };
}

export type DriverProfile = ReturnType<typeof toDriverProfile>;
