/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
       unoptimized: true,
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
   async headers() {
    return [
      {
        source: "/api/(.*)",
        headers: [
          { key: "Access-Control-Allow-Credentials", value: "true" },
          {  key: 'Access-Control-Allow-Origin', value: "www.atalaykarahan.com" },
          { key: "Access-Control-Allow-Methods", value: "GET,POST" },
          { key: "Access-Control-Allow-Headers", value: headers.join(", ") }
          ]
      }
    ];
  }
};

module.exports = nextConfig;
