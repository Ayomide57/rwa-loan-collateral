/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "demos.creative-tim.com",
        port: "",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "another-example.com",
        port: "",
        pathname: "**",
      },
    ],
  },
};

export default nextConfig;
