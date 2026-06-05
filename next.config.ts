import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Ensure Prisma's Linux query engine is bundled into the
  // serverless functions on Vercel. Without this, Next.js's
  // file tracing misses the .so.node engine binary.
  outputFileTracingIncludes: {
    "/**": ["./app/generated/prisma/**"],
  },
};

export default nextConfig;
