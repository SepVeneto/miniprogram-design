import { computed } from 'vue'
import { useApp } from './store'
import { useRoute } from 'vue-router'

export function useConfig(target?: 'page' | 'global') {
  const route = useRoute()
  const app = useApp()
  const type = computed(() => app.schemaType)
  const config = computed<any>({
    get() {
      const _type = target || type.value
      switch (_type) {
        case 'page':
          return app.config.pageConfig?.[route.name as string] || {}
        case 'global':
          return app.config.globalConfig
        default:
          return app.config.globalConfig
      }
    },
    set(val) {
      const page = route.name as string
      const _type = target || type.value
      switch (_type) {
        case 'page':
          if (!app.config.pageConfig) {
            app.config.pageConfig = { [page]: val }
          } else {
            app.config.pageConfig[page] = val
          }
          break
        case 'global':
          app.config.globalConfig = val
          break
      }
    },
  })

  return config
}
