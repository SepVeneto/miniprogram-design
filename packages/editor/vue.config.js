// eslint-disable-next-line @typescript-eslint/no-var-requires
const { defineConfig } = require('@vue/cli-service')
// eslint-disable-next-line @typescript-eslint/no-var-requires
const webpack = require('webpack')
// const htmlWebpackPlugin = require('html-webpack-plugin')
// const path = require('path')

const isProduction = process.env.NODE_ENV === 'production'

module.exports = defineConfig({
  lintOnSave: false,
  assetsDir: 'deign-static',
  publicPath: '',
  outputDir: `dist/${isProduction ? 'prod' : 'dev'}`,
  productionSourceMap: false,
  devServer: {
    client: {
      overlay: {
        errors: false,
        warnings: false,
      },
    },
    port: 8082,
    proxy: {
      '/static': {
        target: 'http://localhost:8000',
      },
    },
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  },
  chainWebpack: config => {
    config.plugins.delete('fork-ts-checker')
  },
  configureWebpack: {
    plugins: [
      new webpack.DefinePlugin({
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        __VERSION__: `"${require('./package.json').version}"`,
      }),
      new webpack.container.ModuleFederationPlugin({
        name: 'editor_side',
        filename: 'remoteEntry.js',
        exposes: {
          './store': './src/store/index.ts',
        },
        shared: {
          'vue-router': {
            singleton: true,
          },
          vue: {
            singleton: true,
          },
          'element-plus': {
            singleton: true,
          },
          '@element-plus/icons-vue': { singleton: true },
          '@sepveneto/basic-comp': {
            singleton: true,
          },
        },
      }),
    ],
  },
  transpileDependencies: true,
})
