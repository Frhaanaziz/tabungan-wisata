const { env } = require('./env-config');

/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: env.BASE_URL,
  generateRobotsTxt: true,
};
