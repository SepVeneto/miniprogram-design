import theme from 'vitepress/theme'
import VpApp from './components/VpApp.vue'
import VpEditor from './components/VpEditor.vue'
import ElementPlus from 'element-plus'
import 'element-plus/theme-chalk/index.css'

export default {
  ...theme,
  // Layout: VpApp,

  enhanceApp: ({ app }) => {
    app.component('VpEditor', VpEditor)
    app.use(ElementPlus)
  },
}
