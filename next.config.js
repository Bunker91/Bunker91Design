/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        background: '#0D0C1D',       // fundo geral escuro
        topbar: '#1A1B2E',           // barra superior (azul escuro arroxeado)
        midbar: '#2E2F45',           // para hovers ou elementos de destaque
        highlight: '#FF2E63',        // vermelho rosado neon
        light: '#F5F5F5',            // textos claros
        glass: 'rgba(255, 255, 255, 0.05)', // fundo transparente leve
      },
      backgroundImage: {
        'bunker-fundo': "url('/fundo-bunker91.jpg')", // coloque a imagem em /public/
      },
      backdropBlur: {
        sm: '4px',
        md: '8px',
      },
      boxShadow: {
        'bunker-glow': '0 4px 20px rgba(255, 46, 99, 0.4)',
      },
      fontFamily: {
        sans: ['"Inter"', 'sans-serif'],
      },
      borderRadius: {
        xl: '1rem',
      },
    },
  },
  plugins: [],
}
