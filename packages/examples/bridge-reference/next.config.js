/** @type {import('next').NextConfig} */
module.exports = {
  webpack: (config) => {
    config.resolve.fallback = { fs: false };
    config.module.rules.push({
      test: /\.(png|jpg|gif)$/i,
      use: [
        {
          loader: "file-loader",
        },
      ],
    });
    return config;
  },
};
