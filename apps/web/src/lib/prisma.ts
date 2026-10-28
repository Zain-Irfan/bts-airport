import { PrismaMariaDb } from "@prisma/adapter-mariadb";
import { PrismaClient } from "@/generated/prisma/client";

/**
 * TLS for hosted MySQL (Aiven, etc.). Off unless DATABASE_SSL=true; DATABASE_SSL_CA holds the
 * provider's CA certificate (PEM, "\n" escapes allowed) so the server certificate is still verified.
 */
function sslConfig() {
  if (process.env.DATABASE_SSL !== "true") return undefined;
  const ca = process.env.DATABASE_SSL_CA?.replace(/\\n/g, "\n");
  return ca ? { ca, rejectUnauthorized: true } : { rejectUnauthorized: true };
}

function parseDatabaseUrl(url: string) {
  try {
    const u = new URL(url);
    return {
      host: u.hostname,
      port: u.port ? Number(u.port) : 3306,
      user: decodeURIComponent(u.username) || "root",
      password: u.password ? decodeURIComponent(u.password) : undefined,
      database: u.pathname.replace(/^\//, "") || undefined,
      ssl: sslConfig(),
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
