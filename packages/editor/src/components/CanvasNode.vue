<template>
  <FreeDom
    :model-value="style"
    :class="[(!preview || active) && 'vv-editor--node', active && 'vv-editor--node__active']"
    :disabled-drag="editing || preview"
    :disabled-resize="preview"
    @update:model-value="$emit('update:modelValue', { ...modelValue, style: $event })"
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

const props = defineProps({
  modelValue: {
    type: Object,
    required: true,
  },
  preview: Boolean,
  active: Boolean,
})
const style = ref({})
defineEmits(['update:modelValue'])
const editing = ref(false)

const nodeStyle = computed(() => normalizeStyle(props.modelValue.style))
watchEffect(() => {
  style.value = props.modelValue.style
})
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
