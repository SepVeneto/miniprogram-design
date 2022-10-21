module.exports = {
  presets: [
    '@vue/babel-preset-app',
    ['@babel/preset-typescript', {
      isTSX: true,
      allExtensions: true,
    }],
  ],
  plugins: [
    '@vue/babel-plugin-jsx'
  ]
}
