<template>
  <div id="miniprogram-design" />
</template>

<script setup lang="ts">
import { type PropType, watch } from 'vue'
import type { EditorConfig, EditorData, EditorRoute, EditorSchema, EditorSettings, EditorWidgets } from '../../../src/index'
import { useDesign } from '../../../src/index'
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
  upload: {
    type: Function as PropType<EditorData['upload']>,
    default: () => ({}),
  },
  remoteUrl: {
    type: String,
    required: true,
  },
  config: {
    type: Object as PropType<EditorConfig>,
    default: () => ({
      globalConfig: {},
      body: [],
    }),
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
const [get, set, prepare] = useDesign('#miniprogram-design', {
  name: props.name,
  url: props.url,
  inline: props.inline,
  data: {
    upload: props.upload,
    remoteUrl: props.remoteUrl,
    config: props.config,
    schema: props.schema,
    widgets: props.widgets,
    routes: props.routes,
    settings: props.settings,
  },
})

watch(() => props.widgets, async () => {
  await prepare
  microApp.clearData(props.name)
  microApp.setData(props.name, { widgets: props.widgets })
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
