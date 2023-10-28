import path from 'node:path'
import webpack from 'webpack'
import 'webpack-dev-server'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import { VueLoaderPlugin } from 'vue-loader'

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
    hot: true,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  },
  plugins: [
    new webpack.DefinePlugin({
      __VERSION__: `"${version}"`,
      __VUE_OPTIONS_API__: true,
      __VUE_PROD_DEVTOOLS__: false,
    }),
    new ModuleFederationPlugin({
      name: 'editor-side',
      filename: 'remoteEntry.js',
      shared: {
        vue: {
          singleton: true,
          requiredVersion: '^3.3.4',
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
