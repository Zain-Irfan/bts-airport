import { PrismaClient } from "@/generated/prisma/client";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";

function createPrismaClient() {
  const url = process.env.DATABASE_URL || "mysql://root:@localhost:3306/BTS";
  const parsed = new URL(url.replace("mysql://", "http://"));

  const adapter = new PrismaMariaDb({
    host: parsed.hostname,
    port: parseInt(parsed.port || "3306"),
    user: parsed.username || "root",
    password: parsed.password || undefined,
    database: parsed.pathname.slice(1),
    connectionLimit: 5,
  });

  return new PrismaClient({ adapter });
}

const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

/** After `prisma generate`, a dev singleton may still be an older client without new delegates. */
function clientHasVehicleCategory(client: PrismaClient | undefined): client is PrismaClient {
  return (
    client !== undefined &&
    typeof (client as unknown as { vehicleCategory?: { findMany?: unknown } }).vehicleCategory
      ?.findMany === "function"
  );
}

function getPrisma(): PrismaClient {
  if (clientHasVehicleCategory(globalForPrisma.prisma)) {
    return globalForPrisma.prisma;
  }
  const created = createPrismaClient();
  if (process.env.NODE_ENV !== "production") {
    globalForPrisma.prisma = created;
  }
  return created;
}

export const prisma = getPrisma();
