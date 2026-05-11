import path from "node:path";
import type { NextConfig } from "next";

// Monorepo root (parent of `apps/`) — must match for tracing + Turbopack.
const monorepoRoot = path.join(process.cwd(), "../..");

const nextConfig: NextConfig = {
  outputFileTracingRoot: monorepoRoot,
  turbopack: {
    root: monorepoRoot,
  },
};

export default nextConfig;
