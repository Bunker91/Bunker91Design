/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    appDir: true
  },
  images: {
    domains: ['cdn.supabase.com', 'besntryyclwztpuhmxcy.supabase.co']
  },
  i18n: {
    locales: ['pt', 'en', 'fr'],
    defaultLocale: 'pt'
  }
}

module.exports = nextConfig
