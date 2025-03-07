<template>
  <Editor
    url="http://localhost:8082"
    remote-url="http://localhost:8090"
    :widgets="widgets"
  />

  <button @click="handleSetWidget">
    set widgets
  </button>
</template>

<script setup lang="ts">
import { shallowRef } from 'vue'
import Editor from './components/Editor.vue'

const widgets = shallowRef([])
function handleSetWidget() {
  widgets.value = [{ name: 'test', group: [{ _view: 'test', _schema: 'test', style: {}, _name: 'comp1' }] }]
}
</script>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
