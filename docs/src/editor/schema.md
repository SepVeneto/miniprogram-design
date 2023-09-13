# Schema（组件配置）

指定视图组件的可配置内容

## 数据结构

```ts
type WidgetType = 'input' // 输入框
  | 'box' // 盒模型
  | 'number' // 计数器
  | 'checkbox' // 多选框
  | 'image' // 图片
  | 'colorPicker' // 拾色器
  | 'select' // 选择器
  | 'radioGroup' // 单选框组
  | 'editor' // 富文本编辑器（wangeditor)
type WidgetOther = {
  type: Exclude<WidgetType, 'box'>
  label?: string
  key: string
  tips?: string
  link?: Record<string, WidgetOther[]>
  _inContainer?: 'outer' | 'inner'
  [attr: string]: any
}
type WidgetBox = {
  type: Omit<WidgetType, 'box'>
  _inContainer?: 'outer' | 'inner'
  include?: BoxModel[]
  exclude?: BoxModel[]
}
type ISchema = WidgetOther | WidgetBox
```

## 数据联动

通过`link`可以配置指定内容触发的数据联动

`link`作为一个对象，会实时根据`key`绑定的值来决定动态渲染哪一个表单组件

以单选框组为例，选中值`value`决定了`link`中的哪一项作为额外追加的配置

```vue
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
  { type: 'box' as const },
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
])
</script>


```

<DataLink />

<script setup>
import DataLink from '../demo/DataLink.vue'
</script>

## 自定义

有的时候仅仅是这些基础类型无法满足视图组件的配置需求，比如魔方的模板，轮播的排序等等。可以通过自定义一个`type`来实现自定义配置内容。

::: info
一般为了和编辑器预设的基本类型作区分，习惯性的以custom开头来设置自定义类型
:::

```ts
const schema = [
  {
    type: 'customTemplate',
    key: 'template',
  }
]
```

当编辑器在预设的类型中找不到时，就会向视图侧请求获取该配置

```vue
// customTemplate.config.vue
<template>
  <div>自定义配置</div>
<template>

<script setup>
defineProps({
  modelValue: {
    type: Object,
    default: () => ({}),
  },
})
defineEmits(['update:modelValue'])
</script>
```
通过`emit('update:modelValue')`即可向编辑器更新自定义配置中的数据了
