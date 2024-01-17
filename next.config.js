/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'padelnuestro.com/',
        port: '',
        pathname: '*',
      },
    ],
  },
};

module.exports = nextConfig;
