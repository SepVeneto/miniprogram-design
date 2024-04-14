import path from 'path'
import webpack from 'webpack'
import 'webpack-dev-server'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import { version } from '../package.json'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import { VueLoaderPlugin } from 'vue-loader'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { EsbuildPlugin } from 'esbuild-loader'
import { getPackageInfoSync } from 'local-pkg'

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
