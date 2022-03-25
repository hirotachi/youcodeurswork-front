/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (config, options) => {
    Object.assign(config.resolve.alias, {
      abstracts: "styles/abstracts",
    });
    return config;
  },
}

module.exports = nextConfig
