/** @type {import('next').NextConfig} */
const nextConfig = {
  // suporte a múltiplos idiomas (i18n)
  i18n: {
    locales: ['pt', 'en', 'fr'],
    defaultLocale: 'pt',
  },

  // ativar compressão automática para melhorar performance
  compress: true,

  // configuração para imagens (se usar o next/image)
  images: {
    domains: ['your-image-domain.com', 'supabase.co'], // adicione os domínios de onde as imagens virão
  },

  // outras configurações padrão
  reactStrictMode: true,
  swcMinify: true,
};

module.exports = nextConfig;
