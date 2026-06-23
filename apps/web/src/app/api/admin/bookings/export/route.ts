import { authStaff } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

function escapeCSV(value: string | null | undefined): string {
  if (value == null) return "";
  const str = String(value);
  if (str.includes(",") || str.includes('"') || str.includes("\n")) {
    return `"${str.replace(/"/g, '""')}"`;
  }
  return str;
}

export async function GET() {
  const session = await authStaff();
  if (!session) {
    return new Response("Unauthorized", { status: 401 });
  }

  const bookings = await prisma.booking.findMany({
    orderBy: { createdAt: "desc" },
  });

  const headers = [
    "ID", "Customer Name", "Email", "Phone", "Pickup", "Dropoff",
    "Date", "Time", "Return Date", "Return Time", "Flight", "Passengers", "Luggage",
    "Vehicle", "Fare", "Notes", "Status", "Created At",
  ];

  const rows = bookings.map((b) => [
    b.id,
    b.customerName,
    b.customerEmail,
    b.customerPhone,
    b.pickup,
    b.dropoff,
    b.date.toISOString().split("T")[0],
    b.time,
    b.returnDate ? b.returnDate.toISOString().split("T")[0] : "",
    b.returnTime || "",
    b.flightNumber || "",
    String(b.passengers),
    String(b.luggage),
    b.vehicleType || "",
    b.fare ? String(b.fare) : "",
    b.notes || "",
    b.status,
    b.createdAt.toISOString(),
  ].map(escapeCSV).join(","));

  const csv = [headers.join(","), ...rows].join("\n");

  return new Response(csv, {
    headers: {
      "Content-Type": "text/csv",
      "Content-Disposition": `attachment; filename="bookings-${new Date().toISOString().split("T")[0]}.csv"`,
    },
  });
}
