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
  async rewrites() {
    const publicApi = (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/').replace(/\/$/, '');
    const backend = (process.env.BACKEND_URL || (publicApi.startsWith('http') ? publicApi : 'http://localhost:8080')).replace(/\/$/, '');
    return [
      {
        source: '/api/:path*',
        destination: `${backend}/:path*`,
      },
      {
        source: '/data/:path*',
        destination: `${backend}/data/:path*`,
      },
    ];
  },
  webpack5: true,
  webpack: (config, { isServer, webpack }) => {
    config.resolveLoader = config.resolveLoader || {};
    config.resolveLoader.alias = {
      ...(config.resolveLoader.alias || {}),
      'less-loader': require.resolve('less-loader'),
      less: require.resolve('less'),
    };
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
