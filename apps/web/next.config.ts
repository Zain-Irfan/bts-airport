import path from "node:path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Monorepo: correct serverless file tracing when app lives in `apps/web`.
  // Do not set `turbopack.root` to the repo root — it makes Turbopack scan all of `replit-ui/` etc. and can fail on Vercel.
  outputFileTracingRoot: path.join(process.cwd(), "../.."),
};

export default nextConfig;
