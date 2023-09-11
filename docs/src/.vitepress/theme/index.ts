import theme from 'vitepress/theme'
import VpApp from './components/VpApp.vue'
import VpEditor from './components/VpEditor.vue'

export default {
  ...theme,
  // Layout: VpApp,

  enhanceApp: ({ app }) => {
    app.component('VpEditor', VpEditor)
  },
}
