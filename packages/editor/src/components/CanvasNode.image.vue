<template>
  <img
    v-if="src"
    ref="imgRef"
    :src="src"
    :style="{ pointerEvents: 'none', width: '100%', height: '100%' }"
    @load="handleLoad"
  >
  <ElIcon
    v-else
    :size="24"
  >
    <IconPicture />
  </ElIcon>
</template>

<script lang="ts" setup>
import { ElIcon } from 'element-plus'
import { Picture as IconPicture } from '@element-plus/icons-vue'
import { ref } from 'vue'

const imgRef = ref<HTMLImageElement>()
const props = defineProps({
  src: {
    type: String,
    default: '',
  },
  style: {
    type: Object,
    default: () => ({}),
  },
})
const emit = defineEmits(['update:style'])
function handleLoad() {
  if (!imgRef.value) return
  const { naturalHeight, naturalWidth } = imgRef.value
  const ratio = naturalWidth / naturalHeight
  const { w = 100 } = props.style
  const h = w * ratio
  emit('update:style', { ...props.style, w, h })
}
</script>
