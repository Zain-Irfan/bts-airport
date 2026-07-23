export const dynamic = "force-dynamic";

import { prisma } from "@/lib/prisma";
import { vehicleCategoryToDTO } from "@/lib/vehicle-category";
import { AdminTopbar } from "@/components/admin/AdminTopbar";
import { AdminPageContent } from "@/components/admin/AdminPageContent";
import { VehicleCategoriesAdminClient } from "@/components/admin/VehicleCategoriesAdminClient";

export default async function AdminVehicleCategoriesPage() {
  const rows = await prisma.vehicleCategory.findMany({
    orderBy: { label: "asc" },
  });

  return (
    <>
      <AdminTopbar title="Vehicle categories" />
      <AdminPageContent>
        <VehicleCategoriesAdminClient initial={rows.map(vehicleCategoryToDTO)} />
      </AdminPageContent>
    </>
  );
}
