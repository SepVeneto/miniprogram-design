const { defineConfig } = require('@vue/cli-service')
const webpack = require('webpack')

module.exports = defineConfig({
  publicPath: 'auto',
  outputDir: 'miniprogram-design',
  devServer: {
    http2: true,
    port: 9999,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  },
  chainWebpack: (config) => {
    config.optimization.delete('splitChunks')
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
          name: 'widgets_side',
        },
        exposes: {
          './viewRender': './src/components/viewRender.vue',
          './configRender': './src/components/configRender.vue',
        },
        shared: {
          'vue-router': {
            import: false,
            requiredVersion: '^4.1.6',
            strictVersion: true,
          },
          'element-plus': {
            singleton: true,
          },
          vue: {
            singleton: true,
          },
          '@sepveneto/basic-comp': {
            singleton: true,
          },
          vuedraggable: {
            singleton: true,
          },
        },
      }),
    ],
  },
  transpileDependencies: true,
})
