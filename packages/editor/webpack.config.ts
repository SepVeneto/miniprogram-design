import * as path from 'path'
import * as webpack from 'webpack'
import 'webpack-dev-server'

import { VueLoaderPlugin } from 'vue-loader'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import HtmlWebpackPlugin from 'html-webpack-plugin'

const isProduction = process.env.NODE_ENV === 'production'

const config: webpack.Configuration = {
  entry: './src/main.ts',
  mode: 'development',
  target: 'web',
  optimization: {
    minimize: false,
  },
  devServer: {
    port: 8082,
    static: './dist',
    headers: {
      'Access-Control-Allow-Origin': '*',
    }
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: 'vue-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.[jt]sx?$/,
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true,
          }
        },
        exclude: /node_modules/,
      },
      {
        test: /\.png$/,
        use: {
          loader: 'url-loader',
          options: { limit: 8192 },
        }
        
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader',
        ]
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {},
          },
          'css-loader',
        ]
      }
    ]
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  output: {
    publicPath: 'auto',
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css',
    }),
    new webpack.container.ModuleFederationPlugin({
      name: 'editor_side',
      filename: 'remoteEntry.js',
      remotes: {
        widgets_side: `widgets_side@${isProduction ? '/miniprogram-design' : 'http://localhost:8090'}/remoteEntry.js`
      },
      shared: {
        vue: {
          singleton: true
        },
        '@vueuse/core': { singleton: true },
        'free-dom': { singleton: true },
      }
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, './public/index.html'),
    }),
    new VueLoaderPlugin(),
  ]
}

export default config
