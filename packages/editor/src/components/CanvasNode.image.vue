<template>
  <ElImage
    v-if="src"
    ref="imgRef"
    :src="src"
    :style="{ pointerEvents: 'none', width: '100%', height: '100%' }"
    @load="handleLoad"
  />
  <ElIcon
    v-else
    :size="24"
  >
    <IconPicture />
  </ElIcon>
</template>

<script lang="ts" setup>
import { ElIcon, ElImage } from 'element-plus'
import { Picture as IconPicture } from '@element-plus/icons-vue'
import { ref } from 'vue'
import { toFixed } from '@/utils'

const imgRef = ref<InstanceType<typeof ElImage>>()
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
  const { naturalHeight, naturalWidth } = imgRef.value.$el.querySelector('img')
  const ratio = naturalHeight / naturalWidth
  const w = 100
  const h = toFixed(w * ratio)
  emit('update:style', { ...props.style, w, h })
}
</script>
