// import './public-path'
import type { App } from 'vue'
import { createApp } from 'vue'
import AppVue from './App.vue'
import type { Pinia } from 'pinia'
import { createPinia } from 'pinia'
import { useApp } from './store'
import ElementPlus from 'element-plus'
import 'element-plus/theme-chalk/index.css'
import { router } from './router'
import BasicComp from '@sepveneto/basic-comp'
import '@sepveneto/basic-comp/css'

let app: App | null
let store: Pinia | null

function mount() {
  app = createApp(AppVue)
  store = createPinia()
  app.use(ElementPlus)
  app.use(BasicComp)
  app.use(store)
  app.use(router)
  app.mount('#app')

  const appStore = useApp()
  window.microApp && window.microApp.addDataListener((data: any) => {
    data.remoteUrl && (appStore.remoteUrl = data.remoteUrl)
    if (!data.config) return
    appStore.setConfig(data.config, data.widgets, data.schema, data.routes)
  }, true)
}

// function unmount () {
//   console.log('trigger');
//   app?.unmount();
//   store = null;
//   app = null;
//   window.microApp?.clearDataListener();
// }
// micro-app 会在子应用创建之初就对window进行代理
// 而mdf需要异步加载
// 导致如果想使用umd模式，mount和unmount不会立即绑定到window上
mount()

console.log(`编辑器版本：v${__VERSION__}`)
