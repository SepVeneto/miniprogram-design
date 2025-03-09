<template>
  <div>当前触发事件：{{ eventName }}</div>
  <div>事件值：{{ eventData }}</div>

  <div>编辑器：{{ config }}</div>
  <!-- <div id="miniprogram-design" /> -->
  <VueEditor
    v-model="config"
    url="http://localhost:8082"
    remote-url="http://localhost:8090"
    :widgets="widgets"
    :settings="{ disabledItem: disableItem }"
    @selected="handleSelected"
    @delete="handleDelete"
    @mounted="onMount"
  />

  <button @click="handleSetWidget">
    set widgets
  </button>
</template>

<script setup lang="ts">
import { ref, shallowRef } from 'vue'
import { VueEditor } from '../../src/vue'
// import { useDesign } from '../../src/index'
// import { initEmitter } from '../../src/helper'

function onMount() {
  console.log('mounted')
}

const config = ref({ globalConfig: {}, body: {} })

// initEmitter()
// const [get, set, prepare] = useDesign('#miniprogram-design', {
//   name: 'mp',
//   url: 'http://localhost:8082',
//   inline: true,
//   data: {
//     remoteUrl: 'http://localhost:8090',
//     config: config.value,
//     schema: { globalConfig: [] },
//     widgets: [],
//     routes: [{ name: 'Home', path: '/' }],
//     settings: {},
//   },
//   mounted() {
//     console.log('m')
//   },
// })

setTimeout(async () => {
  config.value = {
    globalConfig: {},
    body: {
      Home: [
        { _view: 'test', _schema: 'test', style: { height: 100, width: 375 }, _name: 'comp1', _uuid: '1' },
      ],
    },
  }
  // await prepare
  // set({ config: config.value })
}, 2000)
const widgets = shallowRef<any[]>([])
function handleSetWidget() {
  widgets.value = [{ name: 'test', group: [{ _view: 'test', _schema: 'test', style: { height: 100, width: 375 }, _name: 'comp1' }] }]
}

const eventName = ref()
const eventData = ref()
function handleSelected(data: any) {
  eventName.value = 'selected'
  eventData.value = data
}
function handleDelete(data: any) {
  eventName.value = 'delete'
  eventData.value = data
}

function disableItem(selected) {
  return {
    delete: true,
    sort: false,
    custom: true,
  }
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
