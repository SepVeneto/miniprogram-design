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
  { type: 'box' },
  {
    type: 'radioGroup',
    label: '单选框组',
    key: 'type',
    tips: '选中值value决定了link中的追加配置',
    options: [
      { label: '输入框', value: 'input' },
      { label: '计数器', value: 'number' },
      { label: '多选框', value: 'checkbox' },
      { label: '图片上传', value: 'image' },
      { label: '拾色器', value: 'colorPicker' },
      { label: '选择器', value: 'select' },
      { label: '富文本', value: 'editor' },
    ],
    link: {
      input: [{ type: 'input', label: '输入框', key: 'type-input' }],
      number: [{ type: 'number', label: '计数器', key: 'type-number' }],
      checkbox: [{ type: 'checkbox', label: '多选框', key: 'type-checkbox' }],
      image: [{ type: 'image', label: '图片上传', key: 'type-image' }],
      colorPicker: [{ type: 'colorPicker', label: '拾色器', key: 'type-colorPicker' }],
      select: [{ type: 'select', label: '选择器', key: 'type-select' }],
      editor: [{ type: 'editor', label: '富文本', key: 'type-editor' }],
    },
  },
] as const)
</script>
