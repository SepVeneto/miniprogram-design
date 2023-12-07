<template>
  <div style="display: flex;">
    <pre style="flex: 1;">{{ config }}</pre>
    <SchemaRender
      v-model="config"
      style="flex: 1;"
      :schema="schema"
      remote-url=""
    />
  </div>
</template>

<script lang="ts" setup>
import SchemaRender from '@sepveneto/mpd-schema'
import { ref } from 'vue'

const config = ref({})
const schema = ref([
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
] as const)
</script>
