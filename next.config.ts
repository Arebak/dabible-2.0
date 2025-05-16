import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'files.stripe.com',
      },
      {
        protocol: 'https',
        hostname: 'files.cdn.printful.com',
      },
      {
        protocol: 'https',
        hostname: 'developers.dabible.com',
      },
      {
        protocol: 'https',
        hostname: 'i.pravatar.cc'
      }
    ],
  },
  async redirects() {
    return [
      {
        source: '/donate',
        destination: 'https://donate.dabible.com',
        permanent: true,
      },
      {
        source: '/donate/:path*',
        destination: 'https://donate.dabible.com/:path*',
        permanent: true,
      },
      {
        source: '/products',
        destination: 'https://dabible.com/#products',
        permanent: true,
      },
      {
        source: ' /product/solar-audio-bible-device/',
        destination: ' /products/solar-audio-bible-device/',
        permanent: true,
      },
      {
        source: '/donor-dashboard/',
        destination: 'https://donate.dabible.com/donor-dashboard',
        permanent: true,
        
      }
    ];
  },
};

export default nextConfig;
