<template>
  <div :style="style">
    <i>{{config.icon}}</i>
    <span>{{config.title}}</span>
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
