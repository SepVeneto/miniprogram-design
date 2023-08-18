<template>
  <div
    ref="inputRef"
    :contenteditable="editing"
    class="box-num--input"
    :class="[editing && 'editing']"
    @dblclick="handleDblclick"
    @input="handleInput"
    @keydown="handleDown"
    @blur="editing = false"
  >
    {{ modelValue || placeholder }}
  </div>
</template>

<script lang="ts" setup>
import { nextTick, ref } from 'vue'

defineProps({
  modelValue: {
    type: Number,
    default: undefined,
  },
  placeholder: {
    type: String,
    default: '0',
  },
})
const emit = defineEmits(['update:modelValue'])

const editing = ref(false)

const inputRef = ref<HTMLElement>()

function handleInput(evt: Event) {
  const target = evt.target as HTMLElement
  const val = Number(target.textContent)
  emit('update:modelValue', val)
}
function handleDown(evt: KeyboardEvent) {
  const el = evt.target as HTMLElement
  let current = Number(el.textContent)
  switch (evt.key) {
    case 'ArrowUp':
      current += 1
      break
    case 'ArrowDown':
      current -= 1
      break
    case 'Enter':
      editing.value = false
      break
  }
  emit('update:modelValue', current)
}
async function handleDblclick() {
  editing.value = true
  await nextTick()
  const el = inputRef.value
  if (!el) return
  el.focus()
  selectAll(el)
}

function selectAll(node: Element) {
  const range = document.createRange()
  range.selectNodeContents(node)
  const selection = window.getSelection()
  selection?.removeAllRanges()
  selection?.addRange(range)
}
</script>

<style scoped>
.box-num--input.editing {
  padding: 0 2px;
  outline: none;
  border: none;
  box-shadow: 0 0 6px 0;
}
</style>
