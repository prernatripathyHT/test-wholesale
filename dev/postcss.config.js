module.exports = {
  plugins: {
    'postcss-import': {},
    'postcss-nested': {},
    tailwindcss: {},
    'postcss-functions': { functions: {
        em: (size, baseFont = 16) => {
            return `calc(${ size }em / ${ baseFont })`;
        },
        rem: (size, baseFont = 16) => {
            return `calc(${ size }rem / ${ baseFont })`;
        }
    }},
    'postcss-focus-visible': {},
    autoprefixer: {},
  }
}
