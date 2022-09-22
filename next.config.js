/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  env: {
    API_KEY: process.env.API_KEY,
    BASE_URL: process.env.BASE_URL,
    BASE_URL_CATEGORY: process.env.BASE_URL_CATEGORY,
    IMAGE_URL: process.env.IMAGE_URL,
    VIDEO_URL: process.env.VIDEO_URL,
  }
};
