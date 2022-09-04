<template>
  <div :style="config.style">
    <el-image
      style="width: 100%; height: 100%;"
      :src="config.defaultImg"
    />
  </div>
</template>

<script lang="ts" setup>
const props = defineProps({
  config: {
    type: Object,
    default: () => ({})
  }
})
</script>
