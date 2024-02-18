<template>
  <tabbar-config
    v-if="selected._schema === 'tabbar'"
    v-model="selected"
  />
  <schema-render
    v-else-if="selected._schema"
    :key="selected._uuid"
    v-model="selected"
    :schema="app.schema[selected._schema]"
    :remote-url="app.remoteUrl"
  />
  <section v-else>
    <schema-render
      v-model="globalConfig"
      :schema="globalSchema"
      :remote-url="app.remoteUrl"
    />
  </section>
</template>

<script lang="ts" setup>
import schemaRender from '@sepveneto/mpd-schema'
import { tabbarConfig } from '@/layout/tabbar'
import { useApp, useHistory } from '@/store'
import { computed, watch } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const app = useApp()
const history = useHistory()
const selected = computed<any>({
  get() {
    return app.selected
  },
  set(val) {
    app.selected = val
  },
})
const globalConfig = computed<any>({
  get() {
    if (!route.name || !app.config.pageConfig?.[route.name as string]) {
      return app.config.globalConfig
    } else {
      return app.config.pageConfig[route.name as string]
    }
  },
  set(val) {
    if (!route.name || !app.config.pageConfig?.[route.name as string]) {
      app.config.globalConfig = val
    } else {
      app.config.pageConfig[route.name as string] = val
    }
  },
})
const globalSchema = computed(() => ([
  {
    type: 'radioGroup',
    key: 'topbarShow',
    label: '顶部导航栏',
    options: [
      { label: '显示', value: 1 },
      { label: '隐藏', value: 0 },
    ],
  },
  {
    type: 'radioGroup',
    key: 'tabbarShow',
    label: '底部导航栏',
    options: [
      { label: '显示', value: 1 },
      { label: '隐藏', value: 0 },
    ],
  },
  {
    type: 'radioGroup',
    key: 'background.type',
    label: '背景',
    options: [
      { label: '图片', value: 'image' },
      { label: '颜色', value: 'color' },
    ],
    link: {
      image: [{
        type: 'image',
        key: 'background.image',
        label: '图片',
        width: '111px',
        height: '182px',
      }],
      color: [{ type: 'colorPicker', key: 'background.color', label: '颜色' }],
    },
  },
  ...(app.schema.globalConfig || []),
]))
watch(selected, (val, oldVal) => {
  val === oldVal && history.create(`编辑-${selected.value._name}`)
}, { deep: true })
</script>
