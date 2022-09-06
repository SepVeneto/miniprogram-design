<template>
  <div :style="style">
    <el-image
      v-if="config.defaultImg"
      style="width: 100%; height: 100%;"
      :src="config.defaultImg"
    />
    <div style="width: 100%; height: 100%;">empty</div>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
const props = defineProps({
  config: {
    type: Object,
    default: () => ({})
  }
})
const style = computed(() => {
  const _style = normalizeStyle(props.config.style)
  return {
    transition: 'inherit',
    ..._style
  }
})
function normalizeStyle(data = {}) {
  return Object.entries(data).reduce((obj, _style) => {
    const [key, value] = _style
    if (typeof value === 'number') {
      obj[key] = value + 'px'
    } else {
      obj[key] = value
    }
    return obj
  }, {})
}
</script>
