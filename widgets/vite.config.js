import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import federation from '@originjs/vite-plugin-federation'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    target: 'esnext',
    minify: false,
    cssCodeSplit: true,
    rollupOptions: {
      output: {
        format: 'esm',
        entryFileNames: 'assets/[name].js',
        minifyInternalExports: false
      }
    }
  },
  plugins: [vue(), federation({
    name: 'widgetsSide',
    filename: 'remoteEntry.js',
    exposes: {
      './card': {
        name: 'card',
        import: './src/widgets/card/preview.vue'
      }
    },
    shared: ['vue']
  })],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src')
    }
  }
})
