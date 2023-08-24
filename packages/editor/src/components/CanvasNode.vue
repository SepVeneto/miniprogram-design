<template>
  <FreeDom
    ref="freeRef"
    v-model="pos"
    :class="[(!preview || active) && 'vv-editor--node', active && 'vv-editor--node__active']"
    :disabled-drag="editing || preview"
    :disabled-resize="preview"
    :drag-start-fn="() => $emit('moveStart')"
    :resize-start-fn="() => $emit('moveStart')"
    @update:model-value="handleFreedomStyle"
  >
    <CanvasNodeText
      v-if="modelValue.type === 'text'"
      :model-value="modelValue.content"
      :preview="preview"
      :style="nodeStyle"
      @update:model-value="$emit('update:modelValue', { ...modelValue, content: $event })"
      @update:style="$emit('update:modelValue', { ...modelValue, style: $event })"
      @change-edit="editing = $event"
    />
    <img
      v-else-if="modelValue.type === 'image'"
      :src="modelValue.image"
    >
  </FreeDom>
</template>

<script lang="ts" setup>
import { FreeDom } from '@sepveneto/free-dom'
import { computed, ref, watchEffect } from 'vue'
import CanvasNodeText from './CanvasNode.text.vue'
import { normalizeStyle } from '@sepveneto/mpd-hooks'
import { onClickOutside } from '@vueuse/core'

const props = defineProps({
  modelValue: {
    type: Object,
    required: true,
  },
  preview: Boolean,
  active: Boolean,
  toolbar: {
    type: Object,
    required: true,
  },
})
const emit = defineEmits(['update:modelValue', 'moveStart', 'moveStop', 'clickOutside'])
const editing = ref(false)
const pos = ref<Partial<{ x: number, y: number, w: number, h: number }>>({})
const freeRef = ref()

onClickOutside(freeRef, () => {
  emit('clickOutside')
}, { ignore: [props.toolbar, '.vv-editor--toolbar__colorpanel'] })

const nodeStyle = computed(() => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { x, y, width, height, ...normalStyle } = props.modelValue.style
  return normalizeStyle(normalStyle)
})
watchEffect(() => {
  const { x, y, w, h } = props.modelValue.style
  pos.value = {
    x,
    y,
    w,
    h,
  }
})

function handleFreedomStyle(style: any) {
  emit('update:modelValue', { ...props.modelValue, style: { ...props.modelValue.style, ...style } })
  emit('moveStop', style)
}
</script>

<style lang="scss" scoped>
.vv-editor--node {
  box-sizing: border-box;
  border: 1px dashed transparent;
  :deep(.vv-resize-dom--handler) {
    opacity: 0;
  }
  &__active {
    border-color: var(--el-color-success);
  }
  &:hover {
    border-color: var(--el-color-success);
    :deep(.vv-resize-dom--handler) {
      opacity: 1;
    }
  }
}
</style>
