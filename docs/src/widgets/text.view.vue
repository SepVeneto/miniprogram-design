<template>
  <free-dom
    :style="wrapStyle"
    v-model:custom-style="style"
  >{{config.content}}</free-dom>
</template>

<script lang="ts" setup>
import { useNormalizeStyle, useState } from '@/hooks';
import { freeDom } from 'free-dom'
import 'free-dom/dist/theme.css'
const props = defineProps({
  config: {
    type: Object,
    default: () => ({})
  }
})

const wrapStyle = useNormalizeStyle(props.config)
const style = useState(props.config, 'style')
</script>
