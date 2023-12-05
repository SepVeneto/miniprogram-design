import { defineStore } from 'pinia'
import { ref, shallowRef, triggerRef } from 'vue'
import { v4 as uuidv4 } from 'uuid'
import { useApp } from './app'
import type { Config } from './app'

const MAX_HISTORY = 30

export const useHistory = defineStore('history', () => {
  const app = useApp()
  const list = shallowRef<{ index: number, id: string, name: string, data: Config }[]>([])
  const current = ref(0)

  function create(name = 'unknown') {
    const record = {
      index: list.value.length + 1,
      id: uuidv4(),
      name,
      data: JSON.parse(JSON.stringify(app.config)),
    }
    list.value.unshift(record)
    if (list.value.length > MAX_HISTORY) {
      const offset = list.value.length - MAX_HISTORY
      list.value.splice(MAX_HISTORY, offset)
    }
    current.value = 0
    triggerRef(list)
  }
  function jumpTo(id: string) {
    const index = list.value.findIndex(item => item.id === id)
    const record = list.value[index]
    app.config = record.data
    current.value = 0

    list.value.splice(0, index)
    triggerRef(list)
  }
  /**
   * TODO: shortcut
   */
  function undo() {
    current.value = Math.max(0, current.value - 1)
    app.config = list.value[current.value].data
  }
  /**
   * TODO: shortcut
   */
  function redo() {
    current.value = Math.min(list.value.length - 1, current.value + 1)
    app.config = list.value[current.value].data
  }

  return {
    current,
    list,
    create,
    jumpTo,
    undo,
    redo,
  }
})
