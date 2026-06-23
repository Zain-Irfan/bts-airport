import { prisma } from "@/lib/prisma";
import { vehicleCategoryToDTO } from "@/lib/vehicle-category";
import { vehicleTypeToDTO } from "@/lib/vehicle-types";
import { AdminTopbar } from "@/components/admin/AdminTopbar";
import { AdminPageContent } from "@/components/admin/AdminPageContent";
import { VehicleTypesAdminClient } from "@/components/admin/VehicleTypesAdminClient";

export default async function AdminVehicleTypesPage() {
  const [rows, categories] = await Promise.all([
    prisma.vehicleType.findMany({
      orderBy: { name: "asc" },
    }),
    prisma.vehicleCategory.findMany({
      orderBy: { label: "asc" },
    }),
  ]);

  return (
    <>
      <AdminTopbar title="Vehicle types" />
      <AdminPageContent>
        <VehicleTypesAdminClient
          initial={rows.map(vehicleTypeToDTO)}
          categories={categories.map(vehicleCategoryToDTO)}
        />
      </AdminPageContent>
    </>
  );
}
