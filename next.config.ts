import type { NextConfig } from "next";

// GitHub Actions sets this to /repo for a project site, and leaves it empty
// for a user site such as username.github.io.
const basePath = process.env.BASE_PATH || "";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
  ...(basePath ? { basePath } : {}),
  allowedDevOrigins: ["127.0.0.1", "localhost"],
};

export default nextConfig;
