import { defineConfig } from '@rsbuild/core'
import { version } from './package.json'
import { getPackageInfoSync } from 'local-pkg'
import path from 'node:path'
import { pluginModuleFederation } from '@module-federation/rsbuild-plugin'
import { pluginVue } from '@rsbuild/plugin-vue'
import { pluginSass } from '@rsbuild/plugin-sass'

export default defineConfig({
  plugins: [
    pluginSass(),
    pluginVue(),
    pluginModuleFederation({
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
  ],
  html: {
    template: './index.html',
  },
  resolve: {
    extensions: ['.vue', '.jsx', '.js', '.json', '.ts', '.tsx'],
    alias: {
      '@': path.resolve(__dirname, '../src'),
    },
  },
  source: {
    define: {
      // sketch2json
      'process.env.FOLKTALE_DOCS': '""',
      __EDITOR_VERSION__: `"${version}"`,
      __VR_VERSION__: `"${getPackageInfoSync('vue-router')!.version}"`,
      __BC_VERSION__: `"${getPackageInfoSync('@sepveneto/basic-comp')!.version}"`,
      // 不能关闭，vuedraggable使用了options api
      __VUE_OPTIONS_API__: true,
      __VUE_PROD_DEVTOOLS__: false,
      __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: false,
    },
    entry: {
      index: './src/main.ts',
    },
  },
  server: {
    compress: true,
    port: 8082,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  },
})
