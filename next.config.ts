import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'numa.uprock.pro',
      },
    ],
  },
};

export default nextConfig;
