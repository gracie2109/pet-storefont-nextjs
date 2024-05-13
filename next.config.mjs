/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    typescript: {
        ignoreBuildErrors: true,
    },
    images: {
        remotePatterns: [{
            protocol: 'https', hostname: 'solutions-image-fallback.vercel.app', port: '', pathname: '/*/**',
        }]
    },

}
export default nextConfig;
