import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useState = defineStore('state', () => {
  const dragging = ref(false)

  return {
    dragging,
  }
})
