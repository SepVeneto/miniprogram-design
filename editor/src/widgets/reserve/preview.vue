<template>
  <div :style="style">
    <div v-if="config.defaultImg" style="position: relative;">
      <div :style="config.title.style">{{ config.title.content }}</div>
      <div :style="config.desc.style">{{ config.desc.content }}</div>
      <el-image
        style="width: 100%; height: 100%;"
        :src="config.defaultImg"
      />
    </div>
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
