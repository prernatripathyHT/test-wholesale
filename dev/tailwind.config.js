const withAnimations = require('animated-tailwindcss');
const defaultTheme = require('tailwindcss/defaultTheme');
const plugin = require('tailwindcss/plugin');

module.exports = withAnimations({
  content: [
    '../layout/*.liquid',
    '../sections/*.liquid',
    '../snippets/*.liquid',
    '../templates/*.liquid',
    '../templates/*.json',
    '../assets/*.js'
  ],
  theme: {
    fontFamily: {
      'couch': ['couch', 'serif'],
      'caveat': ['caveat', 'sans-serif'],
      'gopher': ['gopher', 'sans-serif'],
      'tenso': ['tenso', 'sans-serif'],
      'freight-sans': ['freight-sans-pro', 'sans-serif']
    },
    screens: {
        'xs': '576px',
        ...defaultTheme.screens,
        '3xl': '1800px'
    },
    extend: {
      colors: {
        transparent: 'transparent',
        current: 'currentColor',
        beige: '#EFEBE1',
        blue: '#000F8F',
        yellow: '#EAE86E',
        honduras: '#6DC3B5',
        ethiopia: '#F58C6F',
        bluebell: '#8D93D9',
        camel: '#A99167',
        offwhite: '#E5E5E5',
      },
      minHeight: {
        '160': '40rem'
      },
      spacing: {
        '18': '4.5rem'
      }
    }
  },
  variants: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/typography'),

    // Extend Tailwind's 'group' utilities
    require('./tailwind-plugins')({
      groupVariants: [
          ['activated', '.activated']
      ]
  }),

    plugin(function({ addVariant }) {
        addVariant('cart-page', '.cart--page &');
        addVariant('activated', '&.activated');
    })
  ]
})
