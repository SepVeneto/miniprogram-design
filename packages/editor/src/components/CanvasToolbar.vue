<template>
  <div
    class="vv-editor--toolbar"
  >
    <component
      :is="toolbarComponent"
      :model-value="modelValue"
    />
  </div>
</template>

<script lang="ts" setup>
import { CanvasImage, CanvasText } from './toolbar'
import { computed } from 'vue'

const props = defineProps({
  modelValue: {
    type: Object,
    default: () => ({}),
  },
})

const type = computed(() => props.modelValue.type)
const toolbarComponent = computed(() => {
  switch (type.value) {
    case 'text':
      return CanvasText
    case 'image':
      return CanvasImage
    default:
      return CanvasText
  }
})
</script>

<style lang="scss" scoped>
.vv-editor--toolbar {
  background: var(--mpd-border-color);
  padding: 4px;
  border-radius: 4px;
  display: flex;
  z-index: 99;
  :deep(.mpd-color-picker__trigger) {
    display: none;
  }
}
.vv-editor--toolbar__item {
  font-size: 18px;
  cursor: pointer;
}
</style>
