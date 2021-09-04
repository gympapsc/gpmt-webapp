const colors = require('tailwindcss/colors')

module.exports = {
  purge: [
    './src/pages/**/*.{js,jsx}',
    './src/components/**/*.{js,jsx}'
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily: {
      'sans': ['-apple-system', 'Inter', 'sans-serif']
    },
    extend: {
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
