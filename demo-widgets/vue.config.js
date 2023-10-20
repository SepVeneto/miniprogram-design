const { defineConfig } = require('@vue/cli-service')
const webpack = require('webpack')
// const { MFLiveReloadPlugin } = require('@module-federation/fmr')

module.exports = defineConfig({
  publicPath: 'auto',
  outputDir: 'miniprogram-design',
  devServer: {
    // 由于浏览器安全策略，https无法访问http资源
    // server: 'https',
    port: 9999,
    // InvalidHost/Origin header
    // 由于是通过github pages远程访问，需要给域名添加白名单来关闭主机校验
    allowedHosts: ['sepveneto.github.io'],
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
      // new MFLiveReloadPlugin({
      //   port: 9999,
      //   container: 'widgets_side',
      //   standalone: false,
      // }),
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
