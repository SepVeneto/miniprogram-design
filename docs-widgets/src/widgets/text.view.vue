<template>
  <free-dom
    v-model:custom-style="style"
    :style="wrapStyle"
  >
    {{ config.content }}
  </free-dom>
</template>

<script lang="ts" setup>
import { useNormalizeStyle, useState } from '@/hooks';
import { freeDom } from '@sepveneto/free-dom';
import '@sepveneto/free-dom/css';
const props = defineProps({
  config: {
    type: Object,
    default: () => ({}),
  },
});

const wrapStyle = useNormalizeStyle(props.config);
const style = useState(props.config, 'style');
</script>
