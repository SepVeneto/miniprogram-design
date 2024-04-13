import path from 'node:path'
import webpack from 'webpack'
import 'webpack-dev-server'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import { VueLoaderPlugin } from 'vue-loader'
import { getPackageInfoSync } from 'local-pkg'

import { version } from '../package.json'

const { ModuleFederationPlugin } = webpack.container

const config: webpack.Configuration = {
  mode: 'development',
  cache: true,
  target: 'web',
  entry: path.resolve(__dirname, '../src/main.ts'),
  optimization: {
    splitChunks: {
      chunks: 'async',
    },
  },
  resolve: {
    extensions: ['.vue', '.jsx', '.js', '.json', '.ts', '.tsx'],
    alias: {
      '@': path.resolve(__dirname, '../src'),
    },
  },
  output: {
    clean: true,
    publicPath: '',
    filename: 'design-static/[name]-[contenthash:6].js',
  },
  devServer: {
    compress: true,
    port: 8082,
    allowedHosts: 'all',
    hot: true,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  },
  plugins: [
    new webpack.DefinePlugin({
      __EDITOR_VERSION__: `"${version}"`,
      __VR_VERSION__: `"${getPackageInfoSync('vue-router')!.version}"`,
      __BC_VERSION__: `"${getPackageInfoSync('@sepveneto/basic-comp')!.version}"`,
      // 不能关闭，vuedraggable使用了options api
      __VUE_OPTIONS_API__: true,
      __VUE_PROD_DEVTOOLS__: false,
      __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: false,
    }),
    new ModuleFederationPlugin({
      name: 'editor-side',
      filename: 'remoteEntry.js',
      shared: {
        'vue-router': {
          singleton: true,
        },
        vue: {
          singleton: true,
          requiredVersion: '^3.4.21',
        },
      },
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../index.html'),
    }),
    new VueLoaderPlugin(),
  ],
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
      },
      {
        test: /\.[j|t]sx?$/,
        exclude: /node_modules/,
        loader: 'swc-loader',
        options: {
          sourceMap: true,
          sync: true,
          module: {
            type: 'es6',
          },
          isModule: true,
          jsc: {
            target: 'es2017',
            parser: {
              syntax: 'typescript',
              tsx: true,
            },
          },
        },
      },
      {
        test: /\.(sc|c)ss$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.(png|svg|jpe?g|gif)$/,
        type: 'asset',
        generator: {
          filename: 'design-static/images/[name]-[hash][ext]',
        },
      },
    ],
  },
}

export default config
