<template>
  <!-- 将编辑状态作为key，可以在编辑结束后更新dom，防止删除所有内容导致无法再次编辑 -->
  <div
    :key="Number(editing)"
    ref="inputRef"
    :contenteditable="editing"
    class="box-num--input"
    :class="[editing && 'editing']"
    @dblclick="handleDblclick"
    @input="handleInput"
    @keydown="handleDown"
    @blur="editing = false"
  >
    {{ editing ? modelValue : (modelValue || placeholder) }}
  </div>
</template>

<script lang="ts" setup>
import { nextTick, ref } from 'vue'
import type { PropType } from 'vue'

const props = defineProps({
  modelValue: {
    type: [Number, String] as PropType<number | '-'>,
    default: undefined,
  },
  placeholder: {
    type: String,
    default: '0',
  },
  disabled: Boolean,
})
const emit = defineEmits(['update:modelValue'])

const editing = ref(false)

const inputRef = ref<HTMLElement>()

function handleInput(evt: Event) {
  const target = evt.target as HTMLElement
  const val = Number(target.textContent)
  updateVal(val)
}
function updateVal(num: number) {
  const val = (typeof num === 'number' && !isNaN(num)) ? num : undefined
  emit('update:modelValue', val)
}
function handleDown(evt: KeyboardEvent) {
  const el = evt.target as HTMLElement
  let current = Number(el.textContent)
  current = isNaN(current) ? 0 : current
  switch (evt.key) {
    case 'ArrowUp':
      current += 1
      updateVal(current)
      break
    case 'ArrowDown':
      current -= 1
      updateVal(current)
      break
    case 'Enter':
      editing.value = false
      break
  }
}
async function handleDblclick() {
  if (props.disabled) return
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

<style scoped lang="scss">
.box-num--input {
  padding: 0 4px;
  &.editing {
    outline: none;
    border: none;
    box-shadow: 0 0 6px 0;
  }
}
</style>
