import { computed } from 'vue'
import { useApp } from './store'
import { useRoute } from 'vue-router'

export function useConfig() {
  const route = useRoute()
  const app = useApp()
  const globalConfig = computed<any>({
    get() {
      if (!route.name || !app.config.pageConfig?.[route.name as string]) {
        return app.config.globalConfig
      } else {
        return app.config.pageConfig[route.name as string]
      }
    },
    set(val) {
      console.log('trigger')
      if (!route.name || !app.config.pageConfig?.[route.name as string]) {
        app.config.globalConfig = val
      } else {
        app.config.pageConfig[route.name as string] = val
      }
    },
  })

  return globalConfig
}
