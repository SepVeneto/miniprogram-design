<template>
  <div :style="style">
    <el-image
      v-if="config.defaultImg"
      style="width: 100%; height: 100%;"
      :src="config.defaultImg"
    />
    <div v-else style="width: 100%; height: 100%;">empty</div>
  </div>
</template>

<script lang="ts" setup>
import { useNormalizeStyle } from '@/hooks';
const props = defineProps({
  config: {
    type: Object,
    default: () => ({})
  }
})
const style = useNormalizeStyle(props.config.style)
</script>
