/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
await import("./src/env.mjs");


/** @type {import("next").NextConfig} */
const config = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "zowjeqhvecoeptlofhuo.supabase.co",
        pathname: "/**",
      },
    ],
  },
  pageExtensions: ['ts', 'tsx'],

  // webpack: (config, { webpack }) => {
  //   config.experiments = {
  //     ...config.experiments,
  //     topLevelAwait: true,
  //   };
  //   config.externals.push({
  //     sharp: "commonjs sharp",
  //     canvas: "commonjs canvas",
  //   });
  //   config.plugins.push(
  //     new webpack.ProvidePlugin({
  //       Buffer: ["buffer", "Buffer"],
  //       process: "process/browser",
  //     }),
  //   );
  //   return config;
  // },

  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  }
};

export default config;
