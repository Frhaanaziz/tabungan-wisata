import { env } from './env.mjs';

/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: env.NEXT_PUBLIC_BASE_URL,
  generateRobotsTxt: true,
};
