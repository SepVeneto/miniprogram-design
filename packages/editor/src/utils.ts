import { normalizeStyle as format } from '@sepveneto/mpd-hooks'
import { useApp } from './store'
import type { LikeWidgetNode } from './types/type'
import { loadRemote } from '@module-federation/enhanced/runtime'
import { defineAsyncComponent, h } from 'vue'

export function normalizeStyle(customStyle: Record<string, any>, mode: 'grid' | 'free' = 'grid') {
  const { x, y, ..._style } = customStyle
  const style = format(_style)
  const image = style.backgroundImage || style.background
  if (typeof image === 'string' && image.startsWith('url(')) {
    style.backgroundSize = '100%'
    style.backgroundRepeat = 'no-repeat'
  }

  if (mode === 'free') {
    style.transform = `translate(${x}px, ${y}px)`
    style.position = 'absolute'
    style.top = '0px'
    style.left = '0px'
  }
  return style
}

export function toFixed(num: number) {
  return Number(num.toFixed(2))
}

export function emitEvt(name: string, data?: any) {
  const app = useApp()
  if (!app.emitter) return
  app.emitter.emit(name, data)
}

export function genDisabled(selected: LikeWidgetNode, type: 'delete' | 'custom' | 'sort') {
  const app = useApp()
  if (!app.settings?.disabledItem) {
    return false
  }
  const rules = app.settings.disabledItem(selected)
  if (typeof rules === 'boolean') {
    return rules
  } else {
    return rules[type]
  }
}

export function loadFromRemote(scope: string, module: string) {
  const renderer = defineAsyncComponent({
    loader: () => loadRemote(`${scope}/${module}`) as any,
    loadingComponent: () => h('div', '加载中...'),
    onError(error, retry, fail) {
      console.error(error)
      fail()
    },
  })

  return renderer
}
