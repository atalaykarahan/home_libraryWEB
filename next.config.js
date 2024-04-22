/** @type {import('next').NextConfig} */
const nextConfig = {
  module.exports = {
  images: {
    unoptimized: true,
  },
}
  images: {
    domains: [
      "tailwindui.com",
      "images.unsplash.com",
      "img.kitapyurdu.com",
      "krhnatalay-home-library.s3.eu-central-1.amazonaws.com",
      "img.freepik.com",
    ],
  },
  env: {
    BASE_URL: process.env.BASE_URL,
    DEFAULT_IMAGE: process.env.DEFAULT_IMAGE,
  },
};

module.exports = nextConfig;
