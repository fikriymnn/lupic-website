import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ['localhost', 'example.com','lupic-backend.vercel.app','api.lupic.org','img.youtube.com','images.unsplash.com'], // Tambahkan 'localhost' di sini
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'api.lupic.org',
        pathname: '**',
      },
    ],
},
 experimental: {
    scrollRestoration: true,
  },
};

export default nextConfig;
