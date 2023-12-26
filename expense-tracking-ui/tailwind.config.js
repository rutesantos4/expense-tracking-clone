/** @type {import('tailwindcss').Config} */
const plugin = require('tailwindcss/plugin');

module.exports = {
  content: ['*.html'],
  theme: {
    extend: {
      extend: {
        backgroundColor: ['label-checked'],
      },
    },
  },
  plugins: [
    plugin(({ addVariant, e }) => {
      addVariant('label-checked', ({ modifySelectors, separator }) => {
        modifySelectors(
          ({ className }) => {
            const eClassName = e(`label-checked${separator}${className}`);
            const yourSelector = 'input[type="radio"]';
            return `${yourSelector}:checked ~ .${eClassName}`;
          }
        )
      })
    }),
  ],
}

