<template>
  <FreeDom
    ref="freeRef"
    v-model="pos"
    :class="[(!preview || active) && 'vv-editor--node', active && 'vv-editor--node__active']"
    :disabled-drag="editing || preview"
    :disabled-resize="preview"
    :drag-fn="onMove"
    :drag-stop-fn="() => history.create('移动元素')"
    :resize-fn="() => $emit('move')"
    :resize-stop-fn="() => history.create('缩放元素')"
    :style="nodeStyle"
    :lock-aspect-ratio="modelValue.type === 'image'"
    @update:model-value="handleFreedomStyle"
  >
    <CanvasNodeText
      v-if="modelValue.type === 'text'"
      :model-value="modelValue.content"
      :preview="preview"
      @update:model-value="$emit('update:modelValue', { ...modelValue, content: $event })"
      @update:style="$emit('update:modelValue', { ...modelValue, style: $event })"
      @change-edit="editing = $event"
    />
    <CanvasNodeImage
      v-else-if="modelValue.type === 'image'"
      :src="modelValue.src"
      :style="modelValue.style"
      @update:style="$emit('update:modelValue', { ...modelValue, style: $event })"
    />
  </FreeDom>
</template>

<script lang="ts" setup>
import { FreeDom } from '@sepveneto/free-dom'
import { computed, onMounted, ref, watchEffect } from 'vue'
import CanvasNodeText from './CanvasNode.text.vue'
import CanvasNodeImage from './CanvasNode.image.vue'
import { normalizeStyle } from '@sepveneto/mpd-hooks'
import { onClickOutside } from '@vueuse/core'
import { toFixed } from '@/utils'
import { useHistory } from '@/store'

const props = defineProps({
  modelValue: {
    type: Object,
    required: true,
  },
  preview: Boolean,
  active: Boolean,
  toolbar: {
    type: Object,
    default: undefined,
  },
})
const emit = defineEmits(['update:modelValue', 'move', 'moveStop', 'clickOutside'])
const editing = ref(false)
const pos = ref<Partial<{ x: number, y: number, w: number, h: number }>>({})
const freeRef = ref()
const history = useHistory()

let stop: (() => void) | undefined
onMounted(() => {
  if (props.preview) {
    stop?.()
  } else {
    stop = bindListener()
  }
})

function onMove() {
  if (props.preview) return
  emit('move')
}
function bindListener() {
  return onClickOutside(freeRef, () => {
    emit('clickOutside')
  }, { ignore: [props.toolbar, '.vv-editor--toolbar__colorpanel'] })
}

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
  const { x, y, w, h } = style
  emit('update:modelValue', {
    ...props.modelValue,
    style: {
      ...props.modelValue.style,
      ...style,
      x: toFixed(x),
      y: toFixed(y),
      w: toFixed(w),
      h: toFixed(h),
    },
  })
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
    border-color: var(--mpd-color-success);
  }
  &:hover {
    border-color: var(--mpd-color-success);
    :deep(.vv-resize-dom--handler) {
      opacity: 1;
    }
  }
}
</style>
