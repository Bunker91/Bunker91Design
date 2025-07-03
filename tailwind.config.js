/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class', // ativa dark mode por classe (você controla via js)
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        bunkerBlack: '#0a0a0a',
        bunkerRed: {
          50: '#2c0000',
          100: '#520000',
          200: '#730000',
          300: '#930000',
          400: '#b00000',
          500: '#cc0000',
          600: '#d92727',
          700: '#e54949',
          800: '#f26e6e',
          900: '#fa9a9a',
        },
        transparentBlack: 'rgba(10, 10, 10, 0.7)',
      },
      backgroundImage: {
        'bunker-gradient': 'linear-gradient(135deg, #cc0000 0%, #0a0a0a 100%)',
      },
      boxShadow: {
        'bunker-soft': '0 4px 12px rgba(204, 0, 0, 0.4)',
      },
      fontFamily: {
        sans: ['"Inter"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
