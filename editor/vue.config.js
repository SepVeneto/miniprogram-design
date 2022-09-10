const { defineConfig } = require('@vue/cli-service')
const webpack = require('webpack')
// const htmlWebpackPlugin = require('html-webpack-plugin')
// const path = require('path')

module.exports = defineConfig({
  publicPath: '/miniprogram-design',
  outputDir: 'miniprogram-design',
  devServer: {
    port: 8082,
    headers: {
      'Access-Control-Allow-Origin': '*',
    }
  },
  configureWebpack: {
    plugins: [
      new webpack.container.ModuleFederationPlugin({
        name: 'editor_side',
        filename: 'remoteEntry.js',
        remotes: {
          widgets_side: 'widgets_side@http://localhost:8090/remoteEntry.js'
        },
        shared: {
          vue: {
            singleton: true
          }
        }
      })
    ]
  },
  // configureWebpack: {
  //   target: 'es2020',
  //   experiments: {
  //     outputModule: true
  //   }, 
  //   plugins: [
  //     new webpack.container.ModuleFederationPlugin({
  //       name: 'miniprogram-design',
  //       filename: 'remoteEntry.js',
  //       library: {type: 'module'},
  //       remotes: {
  //         'widgetsSide': 'http://localhost:4173/assets/remoteEntry.js',
  //         'vite-side': 'vite-side@http://localhost:5000/assets/remoteEntry.js'
  //       },
  //       shared: {
  //         vue: {
  //           singleton: true,
  //         },
  //       },
  //     }),
  //     new htmlWebpackPlugin({
  //       template: path.resolve(__dirname, './public/index.ejs'),
  //       inject: false,
  //     })
  //   ]
  // },
  transpileDependencies: true
})