import path from 'node:path'
import { rspack } from '@rspack/core'
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
    // rspack: {
    //   optimization: {
    //     splitChunks: {
    //       chunks: 'async',
    //     },
    //   },
    // },
    rspack: (config, { appendPlugins }) => {
      config.optimization = {
        splitChunks: {
          chunks: 'async',
        },
      }
      appendPlugins([
        new rspack.HotModuleReplacementPlugin(),
      ])
    },
  },
  resolve: {
    extensions: ['.vue', '.jsx', '.js', '.json', '.ts', '.tsx'],
    alias: {
      '@': path.resolve(__dirname, '../src'),
    },
  },
  output: {
    cleanDistPath: true,
    sourceMap: true,
    minify: false,
    distPath: {
      root: '../../dist/dev',
    },
    target: 'web',
    filename: {
      js: 'design-static/[name]-[contenthash:6].js',
    },
  },
  dev: {
    hmr: false,
  },
  server: {
    compress: true,
    port: 8082,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  },
  plugins: [
    pluginSass(),
    pluginVue(),
    pluginModuleFederation({
      dts: false,
      name: 'editor-side',
      filename: 'remoteEntry.js',
      shared: {
        'vue-router': { singleton: true, requiredVersion: '^4.0.0' },
        vue: { singleton: true, requiredVersion: '^3.5.0' },
        'element-plus': { singleton: true, requiredVersion: '^2.9.0' },
      },
    }),
  ],
})
