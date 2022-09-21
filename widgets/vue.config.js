const { defineConfig } = require('@vue/cli-service')
const webpack = require('webpack')

module.exports = defineConfig({
  publicPath: 'auto',
  // assetsDir: 'widgets-static',
  productionSourceMap: false,
  devServer: {
    port: 8090,
    headers: {
      'Access-Control-Allow-Origin': '*'
    }
  },
  chainWebpack: (config) => {
    config.optimization.delete('splitChunks');
  },
  configureWebpack: {
    // optimization: {
    //   splitChunks:  {
    //     cacheGroups: {
    //       defaultVendors: {
    //         name: 'chunk-vendors',
    //         test: /[\\/]node_modules[\\/]/,
    //         priority: -10,
    //         chunks: 'async',
    //         reuseExistingChunk: true,
    //       },
    //       common: {
    //         name: 'chunk-common',
    //         minChunks: 2,
    //         priority: -20,
    //         chunks: 'async',
    //         reuseExistingChunk: true,
    //       },
    //     },
    //   },
    // },
    plugins: [
      new webpack.container.ModuleFederationPlugin({
        name: 'widgets_side',
        filename: 'remoteEntry.js',
        library: {
          type: 'umd',
          name: 'widgets_side'
        },
        exposes: {
          './viewRender': './src/components/viewRender.vue'
          // './card': './src/widgets/card.view.vue',
          // './mine': './src/widgets/mine.view.vue',
          // './reserve': './src/widgets/reserve.view.vue',
          // './menu': './src/widgets/menu.view.vue',
        },
        shared: {
          vue: {
            singleton: true
          },
          '@vueuse/core': { singleton: true },
        }
      })
    ]
  },
  transpileDependencies: true
})
