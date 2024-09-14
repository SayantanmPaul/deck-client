/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: ["api.dicebear.com"],
    dangerouslyAllowSVG: true,
  },
};

export default nextConfig;
