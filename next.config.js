/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'sc-backend-server.onrender.com',
        // port: '8000',
        pathname: '/image/**',
      },
    ],
  },
}

module.exports = nextConfig
