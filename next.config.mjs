/** @type {import('next').NextConfig} */
const nextConfig = {
    typescript: {
        ignoreBuildErrors: true,
    },
    reactStrictMode: false,
    eslint: {
        ignoreDuringBuilds: true,
    },
    images:{
        remotePatterns:[
            {
                protocol: 'https',
                hostname: 'solutions-image-fallback.vercel.app',
                port: '',
                pathname: '/*/**',
            },

        ]
    }
};

export default nextConfig;
