import type { LikeWidgetNode, WidgetNode } from '@/types/type'
import type { MenuItem } from '@imengyu/vue3-context-menu'
import ContextMenu from '@imengyu/vue3-context-menu'
import '@imengyu/vue3-context-menu/lib/vue3-context-menu.css'
import type { MaybeElementRef } from '@vueuse/core'
import { unrefElement } from '@vueuse/core'
import type { Ref } from 'vue'
import { ref, shallowRef } from 'vue'

type Callbacks = {
  onDelete: (selected: LikeWidgetNode) => void
}

export function useZIndex(
  nodes: Ref<WidgetNode[]>,
  callbacks: Callbacks,
) {
  const selectedNode = ref<LikeWidgetNode>()
  const extraMenu = shallowRef<MenuItem[]>([])

  function handleContextMenu(evt: MouseEvent) {
    const current = selectedNode.value
    if (!current || !isNode(evt.target as HTMLElement)) return

    evt.preventDefault()

    ContextMenu.showContextMenu({
      zIndex: 2024,
      x: evt.x,
      y: evt.y,
      items: [
        {
          label: '删除',
          onClick: () => {
            if (!selectedNode.value) {
              console.warn('找不到待删除的节点')
              return
            }

            callbacks.onDelete(selectedNode.value)
          },
        },
        {
          label: '下一层',
          onClick: () => {
            if (!selectedNode.value) return

            const list = [...nodes.value]
            const index = list.findIndex(node => node._uuid === selectedNode.value!._uuid)
            list.splice(index, 1)
            const nextLayer = Math.max(0, index - 1)
            list.splice(nextLayer, 0, selectedNode.value as WidgetNode)
            nodes.value = list
          },
        },
        {
          label: '上一层',
          onClick: () => {
            if (!selectedNode.value) return

            const list = [...nodes.value]
            const index = list.findIndex(node => node._uuid === selectedNode.value!._uuid)
            list.splice(index, 1)
            const previous = Math.min(list.length, index + 1)
            list.splice(previous, 0, selectedNode.value as WidgetNode)
            nodes.value = list
          },
        },
        {
          label: '置于顶层',
          onClick: () => {
            if (!selectedNode.value) return

            const list = [...nodes.value]
            const index = list.findIndex(node => node._uuid === selectedNode.value!._uuid)
            list.splice(index, 1)
            list.splice(list.length, 0, selectedNode.value as WidgetNode)
            nodes.value = list
          },
        },
        {
          label: '置于底层',
          onClick: () => {
            if (!selectedNode.value) return

            const list = [...nodes.value]
            const index = list.findIndex(node => node._uuid === selectedNode.value!._uuid)
            list.splice(index, 1)
            list.splice(0, 0, selectedNode.value as WidgetNode)
            nodes.value = list
          },
        },
        ...extraMenu.value,
      ],
    })
  }

  function init(elRef: MaybeElementRef) {
    stop(elRef)
    const node = unrefElement(elRef) as HTMLElement
    if (!node) {
      console.warn('找不到右键菜单的触发区域')
      return
    }
    node.addEventListener('contextmenu', handleContextMenu)
  }

  function stop(elRef: MaybeElementRef) {
    const node = unrefElement(elRef) as HTMLElement
    node?.removeEventListener('contextmenu', handleContextMenu)
  }

  function select(node: LikeWidgetNode) {
    selectedNode.value = node
  }

  return {
    extraMenu,
    select,
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
