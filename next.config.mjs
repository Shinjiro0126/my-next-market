/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['tailwindui.com'],
    remotePatterns: [{
      hostname: "res.cloudinary.com"
    }]
  },
};

export default nextConfig;