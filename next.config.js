// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    qualities: [75, 100],
  },
  turbopack: {},
  devIndicators: {
    appIsrStatus: false,
    buildActivity: false,
    buildActivityPosition: 'bottom-right',
  },
  webpack: (config, { dev, isServer }) => {
    if (dev) {
      config.ignoreWarnings = [
        { message: /Hydration failed/ },
        { message: /Text content does not match/ },
        { message: /matching <circle>/ },
      ];
    }
    return config;
  },
}

module.exports = nextConfig