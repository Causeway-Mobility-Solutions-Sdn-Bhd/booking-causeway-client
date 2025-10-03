// next.config.mjs
import bundleAnalyzer from "@next/bundle-analyzer";

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "files-asia.caagcrm.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "causeway-malaysia.causeway.my",
        port: "",
        pathname: "/**",
      },
    ],
  },
  experimental: {
    optimizeCss: true, // built-in CSS optimization
  },
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: `${process.env.NEXT_PUBLIC_API_URL}/:path*`,
      },
    ];
  },
};

export default withBundleAnalyzer(nextConfig);
