import theme from 'vitepress/theme'
import microApp from '@micro-zoe/micro-app'
import VpApp from './components/VpApp.vue'
import VpEditor from './components/VpEditor.vue'

microApp.start()
console.log('trigger')

export default {
  ...theme,
  // Layout: VpApp,

  enhanceApp: ({ app }) => {
    app.component('VpEditor', VpEditor)
  },
}
