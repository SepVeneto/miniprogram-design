import federation from '@originjs/vite-plugin-federation'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { resolve } from 'node:path'
import { version } from './package.json'

export default defineConfig({
  build: {
    assetsDir: 'design-static',
    target: 'ESnext',
    minify: false,
    cssCodeSplit: true,
    rollupOptions: {
      output: {
        minifyInternalExports: false,
        // format: 'system',
        // entryFileNames: 'assets/[name].js',
      },
    },
  },
  server: {
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
    federation({
      name: 'editor_side',
      filename: 'remoteEntry.js',
      // https://github.com/originjs/vite-plugin-federation/issues/157#issuecomment-1774558250
      // https://github.com/originjs/vite-plugin-federation/blob/v1.3.2/packages/lib/src/prod/remote-production.ts#L54
      // 为了保证正常导入虚拟文件，哪怕没有静态组件也得加一个空的remotes字段
      remotes: {
        test: '',
      },
      // exposes: {
      //   './store': './src/store/index.ts',
      // },
      shared: {
        vue: {
        },
        'vue-router': {
        },
        '@sepveneto/free-dom': {
          version: '^0.9.1',
        },
      },
      // 'element-plus',
      // '@element-plus/icons-vue',
      // '@sepveneto/basic-comp',
    }),
    vue(),
    vueJsx(),
  ],
})
