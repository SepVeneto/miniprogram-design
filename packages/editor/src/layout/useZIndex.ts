import ContextMenu from '@imengyu/vue3-context-menu'
import '@imengyu/vue3-context-menu/lib/vue3-context-menu.css'
import type { MaybeElementRef } from '@vueuse/core'
import { unrefElement } from '@vueuse/core'
import type { Ref } from 'vue'
import { ref } from 'vue'
import { useApp, useHistory } from '@/store'
import { useRoute } from 'vue-router'

export function useZIndex(elRef: MaybeElementRef, nodes: Ref<any[]>) {
  const route = useRoute()
  const maxZindex = ref(381)

  const history = useHistory()
  const app = useApp()

  function handleContextMenu(evt: MouseEvent) {
    const current = app.selected
    if (!current || !isNode(evt.target as HTMLElement)) return

    evt.preventDefault()

    ContextMenu.showContextMenu({
      x: evt.x,
      y: evt.y,
      items: [
        {
          label: '删除',
          onClick: () => {
            const currentConfig = app.config.body[route.name!]
            const index = currentConfig.findIndex(item => item._uuid === app.selected._uuid)
            currentConfig.splice(index, 1)
            history.create(`删除-${app.selected._name}`)
            app.selected = {}
          },
        },
        {
          label: '下一层',
          onClick: () => {
            const nodes = getCollisionNodes()
            const currentMax = getMaxIndex(nodes)
            current.style.zIndex = Math.min(currentMax - 1, 0)
          },
        },
        {
          label: '上一层',
          onClick: () => {
            const nodes = getCollisionNodes()
            const currentMax = getMaxIndex(nodes)
            current.style.zIndex = currentMax + 1
            maxZindex.value = Math.max(current.style.zIndex, maxZindex.value)
          },
        },
        {
          label: '置于顶层',
          onClick: () => {
            current.style.zIndex = maxZindex.value
          },
        },
        {
          label: '置于底层',
          onClick: () => {
            // const nodes = getCollisionNodes()
            // const currentMax = getMaxIndex(nodes)
            current.style.zIndex = 0
          },
        },
      ],
    })
  }

  function init() {
    const node = unrefElement(elRef) as HTMLElement
    node?.addEventListener('contextmenu', handleContextMenu)
  }

  function stop() {
    const node = unrefElement(elRef) as HTMLElement
    node?.removeEventListener('contextmenu', handleContextMenu)
  }

  function getMaxIndex(nodes: any[]) {
    return Math.max(...nodes.map(item => Number(item.style.zIndex) || 0))
  }

  function getCollisionNodes() {
    return nodes.value.filter(node => collisionDetection(node, app.selected))
  }

  return {
    init,
    stop,
  }
}

function isNode(elm: HTMLElement | null) {
  if (!elm || elm.classList.contains('vv-free-dom--scene')) return false

  if (elm.dataset.type === 'node') {
    return true
  }

  return isNode(elm.parentElement)
}

function collisionDetection(node1: any, node2: any) {
  const { x: x1, y: y1, width: w1, height: h1 } = node1.style
  const { x: x2, y: y2, width: w2, height: h2 } = node2.style

  if (node1._uuid === node2._uuid) return false
  else if (x1 + w1 <= x2) return false
  else if (y1 + h1 <= y2) return false
  else if (x1 >= x2 + w2) return false
  else if (y1 >= y2 + h2) return false
  else return true
}
