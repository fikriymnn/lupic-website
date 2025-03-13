import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ['localhost', 'example.com','lupic-backend.vercel.app','api.lupic.org'], // Tambahkan 'localhost' di sini
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'api.lupic.org',
        pathname: '**',
      },
    ],
},
};

export default nextConfig;
