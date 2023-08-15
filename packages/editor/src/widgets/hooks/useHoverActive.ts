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
    console.log('start')
    isDrag = true
  }
  function onDragEnd(fn?: any) {
    console.log('end')
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
