/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        background: '#0D0C1D',      // Fundo geral
        topbar: '#1A1B2E',          // Barra superior (azul arroxeado escuro)
        midbar: '#2E2F45',          // Botões, menus e hover
        highlight: '#FF2E63',       // Vermelho rosado neon
        light: '#F5F5F5',           // Texto claro
        glass: 'rgba(255, 255, 255, 0.05)', // Fundo transparente leve
      },
      backgroundImage: {
        'bunker-wallpaper': "url('/backgrounds/fundo-bunker91.jpg')",
      },
      boxShadow: {
        'neon': '0 0 10px #FF2E63',
      },
      borderRadius: {
        xl: '1rem',
        full: '9999px',
      },
      fontFamily: {
        sans: ['"Inter"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
