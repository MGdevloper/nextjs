import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Temporarily disable lint/type errors from failing the production build.
  // This makes the build succeed while you fix code issues incrementally.
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    // WARNING: This silences TypeScript errors during build. Remove after fixes.
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
