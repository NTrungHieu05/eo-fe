/** @type {import('next').NextConfig} */

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

const withPlugins = require('next-compose-plugins');
const withAntdLess = require('next-plugin-antd-less');
const withTM = require('next-transpile-modules')(['@babel/preset-react']); // or whatever library giving trouble

const nextConfig = {
  modern: true,
  experimental: { esmExternals: false },
  webpack5: true,
  webpack: (config, { isServer, webpack }) => {
    const fileLoaderRule = config.module.rules.find((rule) => rule.test && rule.test.test('.svg'));
    fileLoaderRule.exclude = /\.svg$/;
    config.module.rules.push({
      test: /\.svg$/,
      loader: require.resolve('@svgr/webpack'),
      options: {
        svgoConfig: {
          plugins: [
            {
              name: 'removeViewBox',
              active: false,
            },
          ],
        },
      },
    });
    return config;
  },
};

module.exports = withPlugins(
  [
    [withBundleAnalyzer],
    [withAntdLess],
    [
      withTM,
      {
        reactStrictMode: true,
      },
    ],
  ],
  nextConfig
);
