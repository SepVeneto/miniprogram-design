import microApp, { renderApp } from '@micro-zoe/micro-app'
import type { MicroAppConfig } from '@micro-app/types'
import type { CSSProperties } from 'vue-demi'
import { getCurrentInstance, nextTick, onMounted } from 'vue-demi'
import { upgrade } from './upgrade'
import type { UploadRequestOptions } from 'element-plus'
import type { ISchema, SchemaOther } from './types'

export * from './upgrade'
export * from './types'

export type EditorConfig = {
  version?: string
  globalConfig: Record<PropertyKey, unknown>
  body: Record<PropertyKey, unknown>
  tabbars?: Record<PropertyKey, unknown>
}

export type EditorSchema = {
  globalConfig?: SchemaOther<any>[]
  $pageConfig?: Record<string, SchemaOther<any>[]>
  tabbar?: { custom?: boolean }
  [other: string]: ISchema | undefined | { custom?: boolean} | SchemaOther<any>[]
}

export type EditorWidget = {
  _name: string
  _view: string
  _schema: string
  _inContainer?: 'outer' | 'inner'
  style?: Partial<CSSProperties>
  [key: string]: unknown
}
type DisabledRules = boolean | Partial<{
  delete: boolean
  custom: boolean
  sort: boolean
}>
export type DisabledItemFn = (widget: EditorWidget) => DisabledRules
export type EditorWidgets = {
  name: string,
  group: EditorWidget[],
}[]

export type EditorSettings = {
  disabledItem?: DisabledItemFn
  disabledAdd?: boolean
}

export type EditorRoute = {
  name: string
  path: string
  meta?: Record<PropertyKey, unknown> & { title?: string }
}
export type EditorData = {
  upload?: (data: UploadRequestOptions) => Promise<string>
  /**
   * 组件视图的可访问地址
   */
  remoteUrl?: string
  /**
   * 编辑器数据
   */
  config: EditorConfig
  /**
   * 组件的配置项
   */
  schema?: EditorSchema
  /**
   * 可配置的组件列表
   */
  widgets?: {
    name: string
    group: EditorWidget[]
  }[]
  /**
   * 编辑器的路由
   */
  routes?: EditorRoute[]
  /**
   * 编辑器配置
   */
  settings?: EditorSettings,
}

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
