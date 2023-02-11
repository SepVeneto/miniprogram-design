<template>
  <component :is="configView" />
</template>

<script setup lang="ts">
import { defineAsyncComponent, shallowRef, watch } from 'vue';

const props = defineProps({
  type: {
    type: String,
    required: true,
  },
});
const configView = shallowRef();

watch(() => props.type, (type) => {
  console.log(type);
  configView.value = defineAsyncComponent(
    () => import(`@/config/${type}.view.vue`),
  );
}, { immediate: true });
</script>
