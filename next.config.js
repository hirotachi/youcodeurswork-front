/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
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
