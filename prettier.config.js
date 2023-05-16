module.exports = {
  semi: false,
  singleAttributePerLine: true,
  overrides: [
    {
      files: '*.js',
      options: {
        singleQuote: true
      }
    }
  ],
  plugins: [require('@shopify/prettier-plugin-liquid'), require('prettier-plugin-tailwindcss')],
  pluginSearchDirs: false,
  tailwindConfig: './dev/tailwind.config.js'
};