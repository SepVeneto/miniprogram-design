import './public-path'
import type { App } from 'vue'
import { createApp, version } from 'vue'
import AppVue from './App.vue'
import type { Pinia } from 'pinia'
import { createPinia } from 'pinia'
import { useApp } from './store'
import ElementPlus, { version as EP_VERSION } from 'element-plus'
import './styles/global.scss'
// import 'element-plus/theme-chalk/index.css'
import { router } from './router'
import BasicComp from '@sepveneto/basic-comp'
import '@sepveneto/basic-comp/css'

let app: App | null
let store: Pinia | null

function mount() {
  app = createApp(AppVue)
  store = createPinia()
  app.use(ElementPlus, { namespace: 'mpd' })
  app.use(BasicComp, {})
  app.use(store)
  app.use(router)
  app.mount('#app')

  const appStore = useApp()

  const emitter = window.microApp?.getGlobalData()?.MPD_EMITTER as any
  const baseEmitter = window.microApp?.getGlobalData()?.BASE_EMITTER
  appStore.emitter = baseEmitter
  emitter.on('SET_CONFIG', (val: any) => {
    appStore.config = val
  })
  emitter.on('SET_SCHEMA', (val: any) => {
    appStore.schema = val
  })
  emitter.on('SET_ROUTES', (val: any) => {
    appStore.setRoutes(val)
  })
  emitter.on('SET_WIDGETS', (val: any) => {
    appStore.widgetList = val
  })
  emitter.on('SET_REMOTE_URL', (val: string) => {
    appStore.remoteUrl = val
  })
  emitter.on('SET_SETTINGS', (val: any) => {
    appStore.setSettings(val)
  })

  window.microApp && window.microApp.addDataListener((data: any) => {
    data.remoteUrl && (appStore.remoteUrl = data.remoteUrl)
    if (!data.config) return
    appStore.setSettings(data.settings)
    appStore.setConfig(data.config, data.widgets, data.schema, data.routes)
    appStore.selected = {}
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

console.log(`编辑器版本：v${__EDITOR_VERSION__}`)
console.log(`VUE版本：v${version}`)
console.log(`Vue Router版本: v${__VR_VERSION__}`)
console.log(`Element Plus版本：v${EP_VERSION}`)
console.log(`Basic Component版本：v${__BC_VERSION__}`)
