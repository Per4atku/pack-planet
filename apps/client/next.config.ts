import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "wonderful-gift-75e184e34f.media.strapiapp.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
