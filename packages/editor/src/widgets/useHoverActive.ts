import { useApp } from '@/store';
import { computed } from 'vue';

export function useHoverActive () {
  const app = useApp();
  const activeUuid = computed(() => app.activeUuids.slice(-1)[0]);
  let isDrag = false;

  function onEnter (uuid: string) {
    !isDrag && app.active.enter(uuid);
  }
  function onLeave () {
    !isDrag && app.active.leave();
  }
  function onDragStart () {
    console.log('start');
    isDrag = true;
  }
  function onDragEnd () {
    console.log('end');
    isDrag = false;
  }
  return {
    activeUuid,
    onDragStart,
    onDragEnd,
    onEnter,
    onLeave,
  };
}
