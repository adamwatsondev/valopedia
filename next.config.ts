import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["media.valorant-api.com"], // Add this line to allow images from the specified domain
  },
};

export default nextConfig;
