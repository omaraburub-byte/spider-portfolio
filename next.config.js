// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  turbopack: {},
  devIndicators: {
    appIsrStatus: false, // This disables the static indicator in newer versions
    buildActivity: false, // This disables the build activity indicator
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