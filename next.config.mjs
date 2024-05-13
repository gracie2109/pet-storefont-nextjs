/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'solutions-image-fallback.vercel.app',
                port: '',
                pathname: '*/**',
            },
        ],
    },
    typescript: {
        ignoreBuildErrors: true,
    },
    reactStrictMode: false,
    httpAgentOptions: {
        keepAlive: false,
    },

};

export default nextConfig;
