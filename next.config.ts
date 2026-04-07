import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "admin.roinmobiliaria.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
