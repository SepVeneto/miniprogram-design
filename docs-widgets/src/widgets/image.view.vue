<template>
  <free-dom
    :custom-style="wrapStyle"
    @update:custom-style="onUpdate"
  >
    <el-image
      draggable="false"
      style="width: 100%; height: 100%;"
      :src="config.img"
    />
  </free-dom>
</template>

<script lang="ts" setup>
import { freeDom } from '@sepveneto/free-dom'
import { useNormalizeStyle, useState } from '@/hooks';

const props = defineProps({
  config: {
    type: Object,
    default: () => ({})
  }
})

const style = useState(props.config, 'style')
const wrapStyle = useNormalizeStyle(props.config.style, [])
function onUpdate(_style: any) {
  style.value = _style
}
</script>
