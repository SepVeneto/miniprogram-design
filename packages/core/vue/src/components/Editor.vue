<template>
  <div id="miniprogram-design" />
</template>

<script setup lang="ts">
import { type PropType, watch } from 'vue'
import type { EditorConfig, EditorData, EditorRoute, EditorSchema, EditorSettings, EditorWidgets } from '../../../src/index'
import { Emitter, useDesign } from '../../../src/index'
import microApp from '@micro-zoe/micro-app'

const props = defineProps({
  name: {
    type: String,
    default: 'miniprogram-design',
  },
  url: {
    type: String,
    required: true,
  },
  inline: Boolean,
  modelValue: {
    type: Object as PropType<EditorConfig>,
    default: () => ({
      globalConfig: {},
      body: {},
    }),
  },
  upload: {
    type: Function as PropType<EditorData['upload']>,
    default: () => ({}),
  },
  remoteUrl: {
    type: String,
    required: true,
  },
  schema: {
    type: Object as PropType<EditorSchema>,
    default: () => ({}),
  },
  widgets: {
    type: Array as PropType<EditorWidgets>,
    default: () => ([]),
  },
  routes: {
    type: Array as PropType<EditorRoute[]>,
    default: () => ([{ name: 'Home', path: '/' }]),
  },
  settings: {
    type: Object as PropType<EditorSettings>,
    default: () => ({}),
  },
})
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const [_get, _set, prepare] = useDesign('#miniprogram-design', {
  name: props.name,
  url: props.url,
  inline: props.inline,
  data: {
    upload: props.upload,
    remoteUrl: props.remoteUrl,
    config: props.modelValue,
    schema: props.schema,
    widgets: props.widgets,
    routes: props.routes,
    settings: props.settings,
  },
})

const emit = defineEmits([
  'delete',
  'change',
  'update:modelValue',
  'selected',
])

const baseEvent = new Emitter()
const appEvent = new Emitter()

async function setData(name: string, data: any) {
  await prepare
  appEvent.emit(name, data)
  // microApp.clearData(props.name)
  // microApp.setData(props.name, { emit: { name, data } })
}

watch(() => props.widgets, async () => {
  await prepare
  microApp.clearData(props.name)
  microApp.setData(props.name, { widgets: props.widgets })
})

watch(() => props.widgets, (val) => {
  setData('SET_WIDGETS', val)
})

watch(() => props.remoteUrl, (val) => {
  setData('SET_REMOTE_URL', val)
})

watch(() => props.settings, (val) => {
  setData('SET_SETTINGS', val)
})

watch(() => props.schema, (val) => {
  setData('SET_SCHEMA', val)
})

watch(() => props.routes, (val) => {
  setData('SET_ROUTES', val)
})
watch(() => props.modelValue, (val) => {
  setData('SET_CONFIG', val)
})
baseEvent.on('SET_CONFIG', (val: any) => {
  emit('update:modelValue', val)
  emit('change', val)
})
baseEvent.on('SET_DELETE', (val: any) => {
  emit('delete', val)
})
baseEvent.on('SET_SELECTED', (val: any) => {
  console.log('selected', val)
  emit('selected', val)
})

microApp.setGlobalData({
  BASE_EMITTER: baseEvent,
  MPD_EMITTER: appEvent,
})
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
