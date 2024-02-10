// @ts-nocheck

await import("./src/env.js");
const { withSentryConfig } = require("@sentry/nextjs");
const { Config } = require("next-recompose-plugins");
const withSerwist = require("@serwist/next").default({
  swSrc: "src/app/sw.ts",
  swDest: "public/sw.js",
});

/** @type {import("next").NextConfig} */
const defaultConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "*.edgestore.dev",
        protocol: "https",
      },
      {
        hostname: "lh3.googleusercontent.com",
        protocol: "https",
      },
      {
        hostname: "loremflickr.com",
        protocol: "https",
      },
    ],
  },
};

const config = new Config(async () => {
  return defaultConfig;
})
  .applyPlugin((config) => {
    return withSentryConfig(
      config,
      {
        silent: true,
        org: "aththariq",
        project: "tw-student",
      },
      {
        widenClientFileUpload: true,
        transpileClientSDK: true,
        tunnelRoute: "/monitoring",
        hideSourceMaps: true,
        disableLogger: true,
        automaticVercelMonitors: true,
      },
    );
  }, "@sentry/nextjs")
  .applyPlugin((config) => withSerwist(config), "@serwist/next")
  .build();

module.exports = config;
