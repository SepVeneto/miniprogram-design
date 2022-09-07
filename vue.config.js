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
    plugins: [
      new webpack.container.ModuleFederationPlugin({
        name: 'miniprogram-design',
        filename: 'remoteEntry.js',
        remotes: {
          canteenWidgets: 'canteenWidgets@http://localhost:8085/remoteEntry.js',
        }
      })
    ]
  },
  transpileDependencies: true
})
