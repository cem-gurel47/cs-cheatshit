/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (config, { isServer }) => {
    //allow .ts imports
    config.resolve.extensions.push(".ts", ".tsx");
    return config;
  },
};

module.exports = nextConfig;
