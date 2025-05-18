import path from 'node:path'
import { defineConfig } from '@rsbuild/core'
import { pluginModuleFederation } from '@module-federation/rsbuild-plugin'
import { pluginVue } from '@rsbuild/plugin-vue'
import { pluginSass } from '@rsbuild/plugin-sass'
import { getPackageInfoSync } from 'local-pkg'
import { version } from '../package.json'

export default defineConfig({
  mode: 'development',
  html: {
    template: 'public/index.html',
  },
  source: {
    entry: {
      index: path.resolve(__dirname, '../src/main.ts'),
    },
    define: {
      __EDITOR_VERSION__: `"${version}"`,
      __VR_VERSION__: `"${getPackageInfoSync('vue-router')!.version}"`,
      __BC_VERSION__: `"${getPackageInfoSync('@sepveneto/basic-comp')!.version}"`,
      // 不能关闭，vuedraggable使用了options api
      __VUE_OPTIONS_API__: true,
      __VUE_PROD_DEVTOOLS__: false,
      __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: false,
    },
  },
  tools: {
    rspack: {
      optimization: {
        minimize: true,
        splitChunks: {
          chunks: 'async',
        },
      },
    },
  },
  resolve: {
    extensions: ['.vue', '.jsx', '.js', '.json', '.ts', '.tsx'],
    alias: {
      '@': path.resolve(__dirname, '../src'),
    },
  },
  output: {
    distPath: {
      root: '../../dist/prod',
    },
    sourceMap: false,
    target: 'web',
    cleanDistPath: true,
    filename: {
      js: '[contenthash:6].js',
      css: '[contenthash:6].css',
    },
  },
  plugins: [
    pluginSass(),
    pluginVue(),
    pluginModuleFederation({
      dts: false,
      name: 'editor-side',
      filename: 'remoteEntry.js',
      shared: ['vue-router', 'vue', 'element-plus'],
    }),
  ],
})
