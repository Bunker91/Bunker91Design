/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        bunker: {
          red: '#8B0000',
          dark: '#0a0a0a'
        }
      }
    }
  },
  plugins: []
}