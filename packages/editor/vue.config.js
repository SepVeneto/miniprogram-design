// eslint-disable-next-line @typescript-eslint/no-var-requires
const { defineConfig } = require('@vue/cli-service');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const webpack = require('webpack');
// const htmlWebpackPlugin = require('html-webpack-plugin')
// const path = require('path')

const isProduction = process.env.NODE_ENV === 'production';

module.exports = defineConfig({
  assetsDir: 'deign-static',
  publicPath: '',
  outputDir: `dist/${isProduction ? 'prod' : 'dev'}`,
  productionSourceMap: false,
  devServer: {
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
  configureWebpack: {
    plugins: [
      new webpack.container.ModuleFederationPlugin({
        name: 'editor_side',
        shared: {
          'vue-router': {
            singleton: true,
          },
          vue: {
            singleton: true,
          },
          '@vueuse/core': { singleton: true },
          // '@sepveneto/free-dom': { singleton: true },
        },
      }),
    ],
  },
  transpileDependencies: true,
});
