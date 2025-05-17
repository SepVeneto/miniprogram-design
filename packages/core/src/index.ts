import microApp, { renderApp } from '@micro-zoe/micro-app'
import type { MicroAppConfig } from '@micro-app/types'
import { getCurrentInstance, nextTick, onMounted } from 'vue-demi'
import { upgrade } from './upgrade'
import type { EditorConfig, EditorData, IWidget } from './types'

export * from './upgrade'
export * from './types'

export type DesignOptions = {
  url: string
  name: string
  inline: boolean
  data?: EditorData
  mounted?: () => void
} & MicroAppConfig
type DataListener = {
  event?: 'mounted'
  config?: EditorConfig
  validate?: () => Promise<false | IWidget>
}

export function useDesign(
  dom: string | Element,
  options: DesignOptions,
): [() => (EditorConfig | null), (data: EditorData) => void, Promise<boolean>] {
  const { url, inline, name = 'miniprogram-design', data, mounted, ...params } = options
  microApp.addDataListener(name, (val: DataListener) => {
    const { event } = val
    if (event === 'mounted') {
      mounted?.()
    }
  })
  const prepare = new Promise<boolean>((resolve, reject) => {
    tryOnMounted(() => {
      renderApp({
        name,
        url,
        container: dom,
        inline,
        data,
        'disable-patch-request': true, // 关闭对子应用请求的拦截
        'disable-memory-router': true, // 关闭虚拟路由
        ...params,
      }).then((result) => {
        if (result) {
          resolve(result)
        } else {
          reject(new Error('[@sepveneto/mpd-core] 应用加载失败'))
        }
      })
    })
  })

  function set(data: EditorData) {
    const { config } = data
    if (!config.version) {
      config.version = upgrade.VERSION
    }
    microApp.setData(name, { ...data, config })
  }
  function get(): EditorConfig | null {
    const data = microApp.getData(name) as DataListener
    if (!data.config) {
      throw new Error('[@sepveneto/mpd-core] missing config in data')
    }
    return data.config
  }
  return [get, set, prepare]
}

function tryOnMounted(fn: () => void) {
  if (getCurrentInstance()) {
    onMounted(fn)
  } else {
    nextTick().then(fn)
  }
}
