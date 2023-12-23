/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                hostname: 'avatars.githubusercontent.com',
                protocol: 'https',
            },
            {
                hostname: 'picsum.photos',
                protocol: 'https',
            }
        ]
    }
}

module.exports = nextConfig
