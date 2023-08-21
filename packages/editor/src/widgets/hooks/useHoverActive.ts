import { useApp } from '@/store'
import { computed } from 'vue'

export type HoverActiveReturn = ReturnType<typeof useHoverActive>

export function useHoverActive() {
  const app = useApp()
  const activeUuid = computed(() => app.activeUuids.slice(-1)[0])
  let isDrag = false

  function onEnter(uuid: string) {
    !isDrag && app.active.enter(uuid)
  }
  function onLeave() {
    !isDrag && app.active.leave()
  }
  function onDragStart() {
    isDrag = true
  }
  function onDragEnd(fn?: any) {
    isDrag = false
    fn?.()
  }
  return {
    activeUuid,
    onDragStart,
    onDragEnd,
    onEnter,
    onLeave,
  }
}
