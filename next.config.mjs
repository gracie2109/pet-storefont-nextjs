/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        port: "",
        pathname: "/*/**",
      },
    ],
  },
  eslint: { ignoreDuringBuilds: true },
  httpAgentOptions: {
    keepAlive: false,
  },
  experimental: {
    staleTimes: {
      dynamic: 30,
      static: 180,
    },
  },
};
export default nextConfig;
