import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    root: __dirname,
  },
  images: {
    remotePatterns: [{ protocol: "https", hostname: "o75qeyw8bv.ufs.sh", pathname: "/f/**" }],
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
