import { v4 as uuidv4 } from 'uuid'
import type { Ref } from 'vue'
import { computed } from 'vue'
import ContextMenu from '@imengyu/vue3-context-menu'
import '@imengyu/vue3-context-menu/lib/vue3-context-menu.css'
import { defaultsDeep } from 'lodash-es'
import { useApp } from '@/store'
import type { LikeWidgetNode } from '@/types/type'
import type { EditorWidget } from '@sepveneto/mpd-core'

type BatchSelectPos = {
  lastX: number,
  lastY: number,
  startX: number,
  startY: number,
}

export function useWidgets(widgets: Ref<LikeWidgetNode[]>) {
  let placeholder: LikeWidgetNode
  let currentEvt: MouseEvent

  const app = useApp()
  const menus = computed(() => {
    const list: any[] = []
    app.widgetList.forEach(item => {
      list.push({
        label: item.name,
        children: item.group.map((each: EditorWidget) => ({
          label: each._name,
          onClick: () => {
            defaultsDeep(placeholder, each)

            widgets.value.pop()
            widgets.value.push(placeholder)
          },
        })),
      })
    })
    return list
  })

  function createPlaceholder(batchPos: BatchSelectPos) {
    const { lastX, lastY, startX, startY } = batchPos
    return {
      _uuid: uuidv4(),
      style: {
        x: startX,
        y: startY,
        width: Math.abs(startX - lastX),
        height: Math.abs(startY - lastY),
      },
    }
  }

  function showMenu(x: number, y: number) {
    ContextMenu.showContextMenu({
      zIndex: 2024,
      x,
      y,
      items: menus.value,
      onClose() {
        // 没有在菜单中指定类型的话，需要在菜单关闭后删除占位节点
        if (!placeholder._name) {
          widgets.value.pop()
        }
      },
    })
  }

  function create(pos: BatchSelectPos) {
    placeholder = createPlaceholder(pos)
    widgets.value.push(placeholder)

    showMenu(
      currentEvt.x,
      currentEvt.y,
    )
  }
  function syncEvent(evt: MouseEvent) {
    currentEvt = evt
  }

  return {
    create,
    syncEvent,
  }
}
