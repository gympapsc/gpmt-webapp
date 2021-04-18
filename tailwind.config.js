module.exports = {
  purge: [
    './src/pages/**/*.{js,jsx}',
    './src/components/**/*.{js,jsx}'
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [
    require("@tailwindcss/forms")
  ],
}
