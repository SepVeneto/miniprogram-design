import { defineStore } from 'pinia'
import { ref, shallowRef } from 'vue'

export const useState = defineStore('state', () => {
  const dragging = ref(false)
  const currentElem = shallowRef<Record<string, any>>({})

  return {
    dragging,
    currentElem,
  }
})
