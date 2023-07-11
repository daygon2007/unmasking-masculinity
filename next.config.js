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
}

module.exports = nextConfig
