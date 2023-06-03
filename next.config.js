/** @type {import('next').NextConfig} */
require('dotenv').config();
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'podcast.jonathon-harrelson.com',
            },
            {
                protocol: 'https',
                hostname: 'storage.buzzsprout.com'
            }
        ],
    },
    async rewrites() {
        return [
            {
                source: '/functions/recaptcha',
                destination: '/functions/recaptcha.js',
            },
        ];
    },
}

module.exports = nextConfig
