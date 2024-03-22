/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: [
            "tailwindui.com",
            "images.unsplash.com",
            "img.kitapyurdu.com"
        ],
    },
    env:{
        BASE_URL: process.env.BASE_URL,
    }
}

module.exports = nextConfig
