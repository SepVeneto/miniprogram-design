---
layout: home
---

<div class="remote-wrapper">
  <input class="remote-input" v-model="remoteUrl" @blur="onBlur">
  <button @click="handleRemote" class="remote-button">加载远程视图</button>
</div>

<ClientOnly>
  <VpEditor />
</ClientOnly>

<script setup>
import { ref } from 'vue'

const remoteUrl = ref(localStorage.getItem('RemoteUrl'))

function onBlur() {
  localStorage.setItem('RemoteUrl', remoteUrl.value)
}
function handleRemote() {
  window.location.reload()
}
</script>

<style scoped>
.remote-wrapper {
  width: fit-content;
  border: 1px solid #999;
  border-radius: 6px;
  margin: 0 auto;
  margin-bottom: 20px;
}
.remote-button {
  padding: 4px;
  background: #ddd;
  border-radius: 6px;
}
.remote-input {
  padding: 4px;
  padding-left: 10px;
}
</style>
