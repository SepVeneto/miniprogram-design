const { defineConfig } = require('@vue/cli-service')
const webpack = require('webpack')

module.exports = defineConfig({
  publicPath: '/miniprogram-design',
  devServer: {
    port: 8082,
    headers: {
      'Access-Control-Allow-Origin': '*',
    }
  },
  configureWebpack: {
    target: 'es2020',
    experiments: {
      outputModule: true
    },
    plugins: [
      new webpack.container.ModuleFederationPlugin({
        name: 'miniprogram-design',
        filename: 'remoteEntry.js',
        library: {type: 'module'},
        remotes: {
          'widgetsSide': 'http://localhost:4173/assets/remoteEntry.js',
          'vite-side': 'vite-side@http://localhost:5000/assets/remoteEntry.js'
        },
        shared: {
          vue: {
            singleton: true,
          },
        },
      })
    ]
  },
  transpileDependencies: true
})
