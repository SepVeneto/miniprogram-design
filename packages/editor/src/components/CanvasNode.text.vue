<template>
  <div
    ref="inputRef"
    :key="Number(editing)"
    class="canvas-node--input"
    :class="[editing && 'editing']"
    :contenteditable="editing"
    @input="handleInput"
    @blur="handleBlur"
    @dblclick="handleEdit"
  >
    {{ content }}
  </div>
</template>

<script lang="ts" setup>
import { nextTick, ref, watchEffect } from 'vue'

const inputRef = ref()
const content = ref('')
const editing = ref(false)
const emit = defineEmits(['update:modelValue', 'changeEdit'])
const props = defineProps({
  modelValue: {
    type: String,
    default: '',
  },
  preview: Boolean,
})

watchEffect(() => {
  content.value = props.modelValue
})
watchEffect(() => {
  emit('changeEdit', editing.value)
})

function handleInput(evt: Event) {
  const target = evt.target as HTMLElement
  content.value = target.textContent || ''
}
function handleBlur() {
  editing.value = false
  emit('update:modelValue', content.value)
}
async function handleEdit() {
  if (props.preview) return
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

<style lang="scss" scoped>
.canvas-node--input {
  overflow: hidden;
  word-break: break-all;
  height: 100%;
  &.editing {
    outline: none;
    border: none;
    cursor: text;
  }
}
</style>
