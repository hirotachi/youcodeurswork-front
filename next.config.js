/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async headers() {
    const cacheHeaders = [
      {
        key: "Cache-Control",
        value: "public, max-age=31536000, stale-while-revalidate",
      },
    ];
    return [
      {
        source: "/fonts/(.*)",
        headers: cacheHeaders,
      },
    ];
  },
  webpack: (config) => {
    config.module.rules.push({
      test: require.resolve("jquery"),
      use: [
        {
          loader: "expose-loader",
          options: {
            exposes: ["jQuery", "$"],
          },
        },
      ],
    });

    Object.assign(config.resolve.alias, {
      abstracts: "styles/abstracts",
    });
    return config;
  },
};

module.exports = nextConfig;
