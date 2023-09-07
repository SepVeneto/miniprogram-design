<template>
  <div>远程视图</div>
  <input
    v-model="remoteUrl"
    @blur="onBlur"
  >
  <button @click="handleLoad">
    加载远程视图
  </button>
  <Content />
</template>

<script setup lang="ts">
import { ref } from 'vue'
const remoteUrl = ref(localStorage.getItem('RemoteUrl'))

function handleLoad() {
  window.location.reload()
}
function onBlur() {
  localStorage.setItem('RemoteUrl', remoteUrl.value)
}
</script>
