import federation from '@originjs/vite-plugin-federation'
import type { Plugin } from 'vite'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { resolve } from 'node:path'
import { version } from './package.json'

function patchRawWindow(): Plugin {
  return {
    name: 'patchRawWindow',
    transform(code, id) {
      if (id.includes('element-plus')) {
        let isFind = false
        const _code = code.replace(
          /instanceof (([A-Z]{1}[a-zA-Z]+)?Event)/g,
          (_, $1) => {
            isFind = true
            return `instanceof (patchRawWindow('${$1}') || ${$1})`
          },
        )
        const fn = `function patchRawWindow(key) {
          if (window.__MICRO_APP_ENVIRONMENT__ && window[key]) {
            return window.rawWindow[key]
          } else {
            return false
          }
        }\n`
        return isFind ? fn + _code : _code
      }
      return code
    },
  }
}

export default defineConfig({
  base: './',
  build: {
    assetsDir: 'design-static',
    target: 'ESnext',
    minify: true,
    cssCodeSplit: true,
    rollupOptions: {
      output: {
        minifyInternalExports: false,
      },
    },
  },
  server: {
    origin: 'http://localhost:8082',
    port: 8082,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
  define: {
    __VERSION__: `"${version}"`,
  },
  plugins: [
    patchRawWindow(),
    federation({
      name: 'editor_side',
      filename: 'remoteEntry.js',
      // https://github.com/originjs/vite-plugin-federation/issues/157#issuecomment-1774558250
      // https://github.com/originjs/vite-plugin-federation/blob/v1.3.2/packages/lib/src/prod/remote-production.ts#L54
      // 为了保证正常导入虚拟文件，哪怕没有静态组件也得加一个空的remotes字段
      remotes: {
        widgets_side: '',
      },
      shared: {
        vue: {
          version: '^3.3.4',
        },
        'vue-router': {
        },
        '@sepveneto/free-dom': {
          version: '^0.9.1',
        },
      },
    }),
    vue(),
    vueJsx(),
  ],
})
