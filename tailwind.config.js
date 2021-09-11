const colors = require('tailwindcss/colors')
const plugin = require('tailwindcss/plugin')

const highContrastVariant = plugin(
  function({ addVariant, e }) {
    addVariant('high-contrast', ({ modifySelectors, separator }) => {
      modifySelectors(({ className }) => `.high-contrast .${e(`high-contrast${separator}${className}`)}`)
    })
  }
)

const placeholderVariant = plugin(
  function({ addVariant, e }) {
    addVariant('placeholder', ({ modifySelectors, separator }) => {
      modifySelectors(({ className }) => `.${e(`placeholder${separator}${className}`)}::placeholder`)
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
      textColor: ["high-contrast", "placeholder"],
      stroke: ["high-contrast"],
      borderColor: ["high-contrast"],
      ringColor: ["high-contrast"],
      divideColor: ["high-contrast"],
      opacity: ["high-contrast", "placeholder"],
      textOpacity: ["high-contrast", "placeholder"]
    }
  },
  plugins: [
    highContrastVariant,
    placeholderVariant
  ],
}
