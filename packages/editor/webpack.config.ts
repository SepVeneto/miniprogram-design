import path from 'path'
import webpack from 'webpack'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import 'webpack-dev-server'

const { ModuleFederationPlugin } = webpack.container

const config: webpack.Configuration = {
  mode: 'development',
  cache: false,
  target: 'web',
  entry: path.resolve(__dirname, './src/main.ts'),
  resolve: {
    extensions: ['.vue', '.jsx', '.js', '.json', '.ts'],
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  devServer: {
    static: path.join(__dirname, 'public'),
    compress: true,
    port: 8082,
    hot: true,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: 'vue-loader',
      },
      {
        test: /\.[jt]sx?$/,
        exclude: /node_modules/,
        loader: 'esbuild-loader',
        options: {
          target: 'es2015',
        },
      },
      {
        test: /\.(sc|c)ss$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css',
    }),
    new ModuleFederationPlugin({
      name: 'editor-side',
      filename: 'remoteEntry.js',
      shared: {
        vue: {
          requiredVersion: '^3.3.4',
        },
      },
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, './index.html'),
    }),
  ],
}

export default config
