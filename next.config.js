/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { unoptimized: true },
  i18n: {
    locales: ["en", "lv", "ru"],
    defaultLocale: "en",
  },
};

module.exports = nextConfig;
