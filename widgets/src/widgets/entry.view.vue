<template>
  <div
    class="menu-item"
    :style="{
      padding: 16 + 'px',
      ...style
    }"
  >
    <div class="menu-title">
      {{ config.title }}
    </div>
    <div class="menu-desc">{{ config.desc }}</div>
    <img class="menu-img" :src="config.defaultImg" alt="" />
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

<style lang="scss" scoped>
.menu-item {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>
