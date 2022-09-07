import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import federation from '@originjs/vite-plugin-federation'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), federation({
    name: 'widgets-side',
    exposes: {
      './card': {
        name: 'card',
        import: './src/widgets/card'
      }
    },
    shared: ['vue', 'element-plus']
  })],
  resolve: {
    alias: {
      '@': 'src'
    }
  }
})
