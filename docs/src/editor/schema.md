<script setup>
import GlobalConfig from '../demo/GlobalConfig.vue'
import DataLink from '../demo/DataLink.vue'
</script>

# Schema（组件配置）

指定视图组件的可配置内容

## 自定义tabbar配置

```ts
{
  tabbar: {
    custom: true
  }
}
```

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
  key: string // 支持链式取值，如style.color
  tips?: string
  link?: Record<string, WidgetOther[]>
  _inContainer?: 'outer' | 'inner'
  _hidden?: boolean // 是否隐藏当前配置项
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

## 全局配置

`globalConfig`中保存的是针对整个应用的配置，其中固定实现了顶部和底部导航栏的显示与隐藏，及其背景图片和颜色的配置。

<GlobalConfig />

```js
[
  // 禁用快速生成
  { key: 'layoutMode', disabled: true },
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
  // ...otherSchema,
]
```

## 页面配置

`$pageConfig`可以针对每一个路由来配置。

::: danger 注意
当初始配置中不存在`$pageConfig`时会默认使用全局配置，而当`$pageConfig`存在时，全局配置就会被忽略
:::

::: warning 提醒
`$pageConfig`的`key`值为页面路由的名称，而不是标题，也就是配置中的`name`。如果对应页面没有配置名称或是没有找到，就会使用全局配置。
:::

::: warning 注意
在`schema`中通过`$pageConfig`来控制页面配置的内容，在`config`中是`pageConfig`。
:::

```js
{
  $pageConfig: {
    Home: {},
    Personal: {},
  }
}
```

::: info 提示
可以通过配置同样的key来重写全局/页面配置里的预设
:::


## css样式

由于`key`支持链式取值，因此所有依赖于css样式的配置可以直接通过`style.color`这种写法来设置

::: danger 注意
对于所有的样式相关的配置，必需统一放置在`style`中，其它位置是无效的
:::

```json
[
  {
    "type": "colorPicker",
    "label": "字体颜色",
    "key": "style.color"
  },
  {
    "type": "number",
    "label": "字体大小",
    "key": "fontSize" // [!code --]
    "key": "style.fontSize" // [!code ++]
  }
]
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

::: warning 
该功能依赖`module federation`实现，会从视图侧拉取`configRender`，再交由`configRender`根据类型动态渲染指定配置

以下是一个由视图侧实现的demo

```vue
<template>
  <component
    :is="configView"
    v-bind="$attrs"
  />
</template>

<script lang="ts">
import { defineAsyncComponent, defineComponent, shallowRef, watch } from 'vue'
export default defineComponent({
  props: {
    type: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const configView = shallowRef()

    watch(() => props.type, (type) => {
      configView.value = defineAsyncComponent(
        // 根据指定规则动态导入配置文件
        () => import(`@/config/${type}.config.vue`),
      )
    }, { immediate: true })
    return {
      configView,
    }
  },
})
</script>
```
:::

::: info
远程组件的缓存策略是本地缓存12小时
:::
