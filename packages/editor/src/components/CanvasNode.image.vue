<template>
  <img
    v-if="src"
    :src="src"
    :style="{ objectFit, pointerEvents: 'none', width: '100%', height: '100%' }"
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
import { computed, ref, watchEffect } from 'vue'

const props = defineProps({
  src: {
    type: String,
    default: '',
  },
  mode: {
    type: String,
    default: undefined,
  },
  preview: Boolean,
})
const objectFit = computed(() => {
  switch (props.mode) {
    case 'scaleToFill':
      return 'fill'
    case 'aspectFit':
      return 'contain'
    case 'aspectFill':
      return 'cover'
    default:
      return 'fill'
  }
})
</script>
