import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import federation from '@originjs/vite-plugin-federation'
// import topLevelAwait from 'vite-plugin-top-level-await'
import { resolve } from 'node:path'

export default defineConfig({
  base: './',
  server: {
    port: 8090,
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
  plugins: [
    vue(),
    vueJsx(),
    federation({
      name: 'widgets_side',
      filename: 'remoteEntry.js',
      exposes: {
        './viewRender': './src/components/viewRender.vue',
        './configRender': './src/components/configRender.vue',
      },
      shared: {
        vue: {
          generate: false,
        },
      },
    }),
    // topLevelAwait({
    //   // The export name of top-level await promise for each chunk module
    //   promiseExportName: '__tla',
    //   // The function to generate import names of top-level await promise in each chunk module
    //   promiseImportName: i => `__tla_${i}`,
    // }),
  ],
  build: {
    target: 'ESnext',
    assetsInlineLimit: 40960,
    minify: false,
    cssCodeSplit: false,
    sourcemap: true,
    rollupOptions: {
      output: {
        minifyInternalExports: false,
      },
    },
  },
})
