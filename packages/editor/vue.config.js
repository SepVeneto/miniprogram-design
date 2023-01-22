// eslint-disable-next-line @typescript-eslint/no-var-requires
const { defineConfig } = require('@vue/cli-service');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const webpack = require('webpack');
const isProduction = process.env.NODE_ENV === 'production';
// const htmlWebpackPlugin = require('html-webpack-plugin')
// const path = require('path')

module.exports = defineConfig({
  assetsDir: 'deign-static',
  publicPath: '',
  outputDir: 'dist',
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
        filename: 'remoteEntry.js',
        remotes: {
          widgets_side: `widgets_side@${isProduction ? '/miniprogram-design' : 'http://localhost:8090'}/remoteEntry.js`,
        },
        shared: {
          vue: {
            singleton: true,
          },
          '@vueuse/core': { singleton: true },
          '@sepveneto/free-dom': { singleton: true },
        },
      }),
    ],
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
  transpileDependencies: true,
});
