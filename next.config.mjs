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
    formats: ['image/webp', 'image/avif'],
    minimumCacheTTL: 60 * 60 * 24 * 30, // 30 days for optimized images
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  experimental: {
    optimizeCss: true,
  },
  
  // Compress static assets
  compress: true,
  
  // Optimize caching headers for static assets - PRODUCTION ONLY
  async headers() {
    // Only apply caching headers in production
    if (process.env.NODE_ENV !== 'production') {
      return [];
    }
    
    const oneYearCache = 'public, max-age=31536000, immutable';
    const oneMonthCache = 'public, max-age=2592000, immutable';
    
    return [
      {
        // Cache Next.js static chunks and generated files (1 year)
        source: '/_next/static/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: oneYearCache,
          },
        ],
      },
      {
        // Cache Next.js image optimization files (1 year)
        source: '/_next/image/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: oneYearCache,
          },
        ],
      },
      {
        // Cache CSS files (1 year)
        source: '/_next/static/(.*)\\.css',
        headers: [
          {
            key: 'Cache-Control',
            value: oneYearCache,
          },
        ],
      },
      {
        // Cache JS chunks with content hash (1 year)
        source: '/_next/static/chunks/(.*)-[0-9a-f]{16}\\.js',
        headers: [
          {
            key: 'Cache-Control',
            value: oneYearCache,
          },
        ],
      },
      {
        // Cache public folder images (1 year)
        source: '/(.*)\\.(jpg|jpeg|png|gif|ico|webp|avif|svg)',
        headers: [
          {
            key: 'Cache-Control',
            value: oneYearCache,
          },
        ],
      },
      {
        // Cache font files (1 year)
        source: '/(.*)\\.(woff|woff2|ttf|eot|otf)',
        headers: [
          {
            key: 'Cache-Control',
            value: oneYearCache,
          },
        ],
      },
      {
        // Cache CSS files from public folder (1 year)
        source: '/(.*)\\.css',
        headers: [
          {
            key: 'Cache-Control',
            value: oneYearCache,
          },
        ],
      },
      {
        // Cache JS files from public folder with content hash (1 year)
        source: '/(.*)\\.([0-9a-f]{8,})\\.js',
        headers: [
          {
            key: 'Cache-Control',
            value: oneYearCache,
          },
        ],
      },
      {
        // Cache specific public subdirectories based on your folder structure
        source: '/(awards|banner|booking|flagicons|icons|logo|media-logos|next-steps|partners|special-offers|Support|vehicleicons|whyCauseway)/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: oneYearCache,
          },
        ],
      },
      {
        // Cache HTML pages with shorter cache (5 minutes)
        source: '/:path*.html',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=300, must-revalidate',
          },
        ],
      },
      {
        // Cache API responses briefly (1 minute)
        source: '/api/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=60, stale-while-revalidate=300',
          },
        ],
      },
    ];
  },
  
  // Enable SWC minification for better performance
  swcMinify: true,
  
  // Optimize production builds
  poweredByHeader: false,
};

// Export the configuration
export default withBundleAnalyzer(nextConfig);