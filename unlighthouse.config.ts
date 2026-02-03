export default {
  site: 'https://veh-shop.vercel.app',
  scanner: {
    device: 'mobile',
    skipRobotsTxt: false,
    sitemap: false,
  },
  urls: ['/', '/catalogue', '/login'],
  puppeteer: {
    waitUntil: 'networkidle0',
  },
};
