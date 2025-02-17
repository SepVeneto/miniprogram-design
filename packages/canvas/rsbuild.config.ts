import { defineConfig } from '@rsbuild/core'
import { pluginVue } from '@rsbuild/plugin-vue'
import { pluginNodePolyfill } from '@rsbuild/plugin-node-polyfill'

export default defineConfig({
  plugins: [pluginNodePolyfill({ include: ['fs', 'path'] }), pluginVue()],
  server: {
    open: false,
  },
  output: {
    copy: [
      { from: './node_modules/canvaskit-wasm/bin/canvaskit.wasm', to: '/static/js/canvaskit.wasm' },
    ],
  },
})
