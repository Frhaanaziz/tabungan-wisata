await import("./src/env.js");
import { withSentryConfig } from "@sentry/nextjs";
import withSerwistInit from "@serwist/next";

const withSerwist = withSerwistInit({
  swSrc: "src/app/sw.ts",
  swDest: "public/sw.js",
  cacheOnFrontEndNav: true,
  // disable: process.env.NODE_ENV === "development",
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

export default withSentryConfig(
  withSerwist(defaultConfig),
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
