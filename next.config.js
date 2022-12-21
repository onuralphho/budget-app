/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: "@svgr/webpack",
    });
    return config;
  },

  
  images: {
    
    domains: [
      "lh3.googleusercontent.com",
      "cdn.dribbble.com",
      "img.freepik.com",
      "res.cloudinary.com",
      "cdn.pixabay.com",
    ],
  },

};

module.exports = nextConfig;
