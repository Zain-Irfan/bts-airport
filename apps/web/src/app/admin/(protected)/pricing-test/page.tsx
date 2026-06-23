import { prisma } from "@/lib/prisma";
import { AdminTopbar } from "@/components/admin/AdminTopbar";
import { AdminPageContent } from "@/components/admin/AdminPageContent";
import { PricingTestClient } from "@/components/admin/PricingTestClient";

export default async function PricingTestPage() {
  const vehicleTypes = await prisma.vehicleType.findMany({
    where: { isActive: true },
    orderBy: { name: "asc" },
    select: {
      id: true, name: true, baseFareGbp: true, perMileGbp: true,
      minimumFareGbp: true, promoDiscountPercent: true, maxPassengers: true,
    },
  });

  return (
    <>
      <AdminTopbar title="Pricing Test Tool" />
      <AdminPageContent>
        <PricingTestClient vehicleTypes={vehicleTypes.map((v) => ({
          ...v,
          baseFareGbp: Number(v.baseFareGbp),
          perMileGbp: Number(v.perMileGbp),
          minimumFareGbp: Number(v.minimumFareGbp),
          promoDiscountPercent: Number(v.promoDiscountPercent),
        }))} />
      </AdminPageContent>
    </>
  );
}
