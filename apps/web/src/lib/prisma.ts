import { PrismaMariaDb } from "@prisma/adapter-mariadb";
import { PrismaClient } from "@/generated/prisma/client";

function parseDatabaseUrl(url: string) {
  try {
    const u = new URL(url);
    return {
      host: u.hostname,
      port: u.port ? Number(u.port) : 3306,
      user: u.username || "root",
      password: u.password || undefined,
      database: u.pathname.replace(/^\//, "") || undefined,
    };
  } catch {
    return { host: "localhost", port: 3306, user: "root", password: undefined, database: "ukride" };
  }
}

const dbConfig = parseDatabaseUrl(
  process.env.DATABASE_URL ?? "mysql://root:@localhost:3306/ukride"
);

const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({ adapter: new PrismaMariaDb(dbConfig) });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
