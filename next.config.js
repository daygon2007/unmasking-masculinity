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
                hostname: 'd3t3ozftmdmh3i.cloudfront.net'
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
