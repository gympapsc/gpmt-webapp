const colors = require('tailwindcss/colors')
const plugin = require('tailwindcss/plugin')

const highContrastVariant = plugin(
  function({ addVariant, e }) {
    addVariant('high-contrast', ({ modifySelectors, separator }) => {
      console.log("sep", separator)
      modifySelectors(({ className }) => `.high-contrast .${e(`high-contrast${separator}${className}`)}`)
    })
  }
)

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
  },
  variants: {
    extend: {
      backgroundColor: ["high-contrast"],
      textColor: ["high-contrast"],
      stroke: ["high-contrast"],
      borderColor: ["high-contrast"],
      ringColor: ["high-contrast"],
      divideColor: ["high-contrast"]
    }
  },
  plugins: [
    highContrastVariant
  ],
}
