import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ['lucide-react'],
  // Ensure we can access the filesystem in server components
  serverExternalPackages: ['gray-matter'],
  // Enable long‑term caching for static assets (images, CSS, JS)
  async headers() {
    return [
      {
        source: '/:all*(svg|png|jpg|jpeg|webp|ico|css|js)',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
    ];
  },
  // Enable modern image formats for better compression
  images: {
    formats: ['image/avif', 'image/webp'],
    // Add any remote domains if you use external images (currently none)
    remotePatterns: [],
  },
};

export default nextConfig;
