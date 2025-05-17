import path from 'path'
import webpack from 'webpack'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import { VueLoaderPlugin } from 'vue-loader'
import 'webpack-dev-server'

const { ModuleFederationPlugin } = webpack.container

const config: webpack.Configuration = {
  mode: 'development',
  cache: false,
  target: 'web',
  optimization: {
    minimize: false,
  },
  entry: path.resolve(__dirname, './src/main.ts'),
  resolve: {
    extensions: ['.vue', '.jsx', '.js', '.json', '.ts', '.tsx'],
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  devServer: {
    // server: 'https',
    allowedHosts: ['sepveneto.github.io'],
    compress: true,
    port: 8090,
    hot: true,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    client: {
      logging: 'info',
      overlay: false,
      webSocketURL: 'auto://localhost:8090/ws',
    },
  },
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
            // experimental: {
            //   plugins: [['swc-plugin-vue-jsx', {}]],
            // },
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
          filename: 'images/[name]-[hash][ext]',
        },
      },
    ],
  },
  output: {
    publicPath: 'auto',
  },
  plugins: [
    new webpack.DefinePlugin({
      __VUE_OPTIONS_API__: true,
      __VUE_PROD_DEVTOOLS__: true,
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css',
    }),
    new ModuleFederationPlugin({
      name: 'widgets',
      filename: 'remoteEntry.js',
      library: {
        type: 'umd',
        name: 'widgets',
      },
      exposes: {
        './viewRender': './src/components/viewRender.vue',
        './configRender': './src/components/configRender.vue',
      },
      shared: {
        vue: {
          singleton: true,
          requiredVersion: '^3.3.4',
        },
        'element-plus': {
          singleton: true,
          requiredVersion: '^2.8.6',
        },
      },
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, './index.html'),
    }),
    new VueLoaderPlugin(),
  ],
}

export default config
