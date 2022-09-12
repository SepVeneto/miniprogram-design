<template>
  <div
    v-if="config.isShow"
    class="menu-item"
    :style="{
      width: config.width + 'px',
      height: config.height + 'px',
      backgroundColor: config.backgroundColor,
      padding: 16 + 'px',
      marginBottom: config.marginBottom + 'px',
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
const props = defineProps({
  config: {
    type: Object,
    default: () => ({})
  }
})
</script>
