<template>
  <div>当前触发事件：{{ eventName }}</div>
  <div>事件值：{{ eventData }}</div>

  <div>编辑器：{{ config }}</div>
  <Editor
    v-model="config"
    url="http://localhost:8082"
    remote-url="http://localhost:8090"
    :widgets="widgets"
    @delete="handleDelete"
  />

  <button @click="handleSetWidget">
    set widgets
  </button>
</template>

<script setup lang="ts">
import { ref, shallowRef } from 'vue'
import Editor from './components/Editor.vue'

const config = ref({ globalConfig: {}, body: {} })

setTimeout(() => {
  config.value = {
    globalConfig: {},
    body: {
      Home: [
        { _view: 'test', _schema: 'test', style: { height: 100, width: 375 }, _name: 'comp1', _uuid: '1' },
      ],
    },
  }
}, 2000)
const widgets = shallowRef([])
function handleSetWidget() {
  widgets.value = [{ name: 'test', group: [{ _view: 'test', _schema: 'test', style: { height: 100, width: 375 }, _name: 'comp1' }] }]
}

const eventName = ref()
const eventData = ref()
function handleDelete(data: any) {
  eventName.value = 'delete'
  eventData.value = data
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
