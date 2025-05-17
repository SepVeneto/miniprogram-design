<template>
  <div>当前触发事件：{{ eventName }}</div>
  <div>事件值：{{ eventData }}</div>

  <div>编辑器：{{ config }}</div>

  <button @click="handleValidate">
    validate
  </button>
  <!-- <div id="miniprogram-design" /> -->
  <VueEditor
    ref="editorRef"
    v-model="config"
    url="http://localhost:8082"
    remote-url="http://localhost:8090"
    :widgets="widgets"
    :settings="{ disabledItem: disableItem }"
    :schema="schema"
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
import { VueEditor, type VueEditorInstance } from '../../src/vue'
import type { ISchema } from '../../src'
// import { useDesign } from '../../src/index'
// import { initEmitter } from '../../src/helper'

const editorRef = ref<VueEditorInstance>()

function handleValidate() {
  editorRef.value?.validate()
}

function onMount() {
  console.log('mounted')
}

const config = ref({ globalConfig: {}, body: {} })
const schema: Record<string, ISchema> = {
  test: [
    { label: 'input', key: 'a', type: 'datepicker', rules: [{ required: true, message: 'test' }] },
  ],
} as const

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

function disableItem() {
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
