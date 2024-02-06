/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: '*.edgestore.dev',
        protocol: 'https',
      },
      {
        hostname: 'loremflickr.com',
        protocol: 'https',
      },
    ],
  },
};

module.exports = nextConfig;
