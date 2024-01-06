/** @type {import('tailwindcss').Config} */
const plugin = require('tailwindcss/plugin');

module.exports = {
  content: ['*.html'],
  theme: {
    extend: {
      extend: {
        backgroundColor: ['label-checked'],
      },
      backgroundImage: {
        'texture': "url(/static/background.svg)"
      },
      colors: {
        transparent: 'transparent',
        current: 'currentColor',
        'green': '#AECB41',
        'deep-blue': {
          DEFAULT: '#023559',
          '100': '#1b4969'
        },
        'black': '#281E2D',
        'pink': {
          DEFAULT: '#E74379',
          'light': '#F4807D'
        },
        'yellow': {
          DEFAULT: '#FFD03B',
          'dark': '#FAAC18'
        }
      },
      fontFamily: {
          'montserrat': ['Montserrat'],
      }
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

