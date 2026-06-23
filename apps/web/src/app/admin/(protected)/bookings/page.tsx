import { prisma } from "@/lib/prisma";
import { AdminTopbar } from "@/components/admin/AdminTopbar";
import { AdminPageContent } from "@/components/admin/AdminPageContent";
import { BookingsClient } from "@/components/admin/BookingsClient";

export default async function BookingsPage() {
  const [bookings, drivers] = await Promise.all([
    prisma.booking.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        assignedDriver: { select: { id: true, fullName: true, email: true, phone: true, vehicleType: true, vehiclePlate: true } },
      },
    }),
    prisma.driver.findMany({
      where: { status: "APPROVED" },
      select: { id: true, fullName: true, email: true, phone: true, vehicleType: true, vehiclePlate: true },
      orderBy: { fullName: "asc" },
    }),
  ]);

  return (
    <>
      <AdminTopbar title="Bookings" />
      <AdminPageContent>
        <BookingsClient bookings={JSON.parse(JSON.stringify(bookings))} drivers={drivers} />
      </AdminPageContent>
    </>
  );
}
