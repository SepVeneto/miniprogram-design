import path from 'path'
import webpack from 'webpack'
import 'webpack-dev-server'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import { version } from '../package.json'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import { VueLoaderPlugin } from 'vue-loader'
import { EsbuildPlugin } from 'esbuild-loader'

const { ModuleFederationPlugin } = webpack.container

const config: webpack.Configuration = {
  mode: 'production',
  cache: false,
  target: 'web',
  entry: path.resolve(__dirname, '../src/main.ts'),
  optimization: {
    minimize: true,
    minimizer: [
      new EsbuildPlugin({
        target: ['es2017'],
        legalComments: 'none',
        css: true,
      }),
    ],
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
    filename: 'design-static/js/[name]-[contenthash:6].bundle.js',
    chunkFilename: 'design-static/js/[name]-[chunkhash:6].chunk.js',
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
    new MiniCssExtractPlugin({
      filename: 'design-static/css/[name]-[contenthash:6].css',
    }),
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
        test: /\.(png|svg|jpe?g|gif)$/,
        type: 'asset',
        generator: {
          filename: 'design-static/images/[name]-[hash][ext]',
        },
      },
      {
        test: /\.(sc|c)ss$/,
        use: [{
          loader: MiniCssExtractPlugin.loader,
          options: {
            publicPath: '../../',
          },
        }, 'css-loader', 'sass-loader'],
      },
    ],
  },
}

export default config
