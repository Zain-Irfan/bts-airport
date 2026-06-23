import path from "node:path";
import type { NextConfig } from "next";

/** Hosts (with port) allowed to load /_next/* in `next dev` — required for Laragon vhosts. */
function getAllowedDevOrigins(): string[] {
  const origins = new Set<string>([
    "localhost:3000",
    "127.0.0.1:3000",
    "ukride.test:3000",
    "ukride.test",
  ]);

  const appUrl = process.env.NEXT_PUBLIC_APP_URL?.trim();
  if (appUrl) {
    try {
      const parsed = new URL(appUrl);
      origins.add(parsed.host);
      origins.add(parsed.hostname);
    } catch {
      // ignore invalid NEXT_PUBLIC_APP_URL
    }
  }

  return [...origins];
}

const nextConfig: NextConfig = {
  // Monorepo: correct serverless file tracing when app lives in `apps/web`.
  // Do not set `turbopack.root` to the repo root — it makes Turbopack scan all of `replit-ui/` etc. and can fail on Vercel.
  outputFileTracingRoot: path.join(process.cwd(), "../.."),
  devIndicators: false,
  reactStrictMode: true,
  allowedDevOrigins: getAllowedDevOrigins(),
  // Keep DB drivers and Prisma out of the browser bundle
  serverExternalPackages: ["@prisma/client", "prisma"],
  async redirects() {
    return [
      { source: "/blog", destination: "/", permanent: true },
      { source: "/blog/:path*", destination: "/", permanent: true },
    ];
  },
};

export default nextConfig;
