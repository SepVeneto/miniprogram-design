# 远程视图

对于一个可视化编辑器，如果编辑粒度过细会导致配置繁琐，如果想要设计一个美观的样式需要对css有一个基本的认识，对于部分运营或是产品有一定的上手门槛和学习成本；但是如果过于粗犷，为了适应业务的变化一方面需要尽力为各个业务视图做到大而全的配置，另一方面，面对一些似是而非的样式，如果再单独设置一个组件会或是为这个组件开发更多灵活的配置，前者会导致工具栏出现过多类似的组件，后者会变相的增加一个组件的复杂度，进而出现上手门槛和学习成本变高的问题。

因此针对上述问题，这个编辑器做了一个折中的方案，将一个业务组件拆分为视图和功能两部分，尽量在逻辑层面解耦。

## 开发流程
1. 首先针对产品的需求和UI的设计分别实现一个业务组件的视图和功能，其中视图为了达到业务逻辑下沉和快速部署的目的采用`module federation`的方式动态渲染以及`自定义设计`，功能采用`json`预设配置和`module federation`自定义配置的方式组合。
2. 当项目迭代出现新需求时，尽量保证视图组件不要频繁变动，因为视图的设计对功能的实现起到了一个约束的作用，一个相对稳定的视图设计不太可能让功能配置出现冗余和失控的问题。
3. 基于上一条，当新需求仅仅是表现上的不同，而不是功能上的更新时，先基于指定功能的组件由`自定义设计`自行设计，再由产品去沉淀这个需求，决定是否为这个需要单独设计一个组件。

## 动态渲染

对于视图组件，编辑器在解析`config`时会从视图侧远程加载组件`viewRender`，再由`viewRender`根据组件类型，动态渲染出指定的视图组件。

以下是一个视图侧实现的demo
```vue
<template>
  <component
    :is="compView"
    v-bind="$attrs"
  />
</template>

<script lang="ts" setup>
import { defineAsyncComponent, shallowRef, watch } from 'vue'

const props = defineProps({
  type: {
    type: String,
    required: true,
  },
})
const compView = shallowRef()
watch(() => props.type, (val) => {
  if (!val) return
  // 根据指定规则动态导入组件
  compView.value = defineAsyncComponent(() => import(`@/widgets/${val}.view.vue`))
}, { immediate: true })
</script>
```

::: info
远程组件的缓存策略是本地缓存12小时
:::

## 自定义设计

对于临时或是简单的视图需求，可以使用自定义设计来实现

所有的非预设的视图组件都支持通过由右侧配置上方的`固定模板`切换成`自定义`来进入设计模式

- 右键视图添加设计元素（目前仅支持文本和图片）
- 设计元素支持拖曳缩放和网格吸附
- 通过选中设计元素可以利用键盘上的方向键进行微调

::: info
微调时网格和吸附功能无效
:::

### 文本

- 字体大小
- 字体加粗
- 字体颜色

### 图片

仅支持本地图片,需要自行配置`云存储`或`文件服务器`及上传功能

::: info
上传后图片会自动根据元素宽度（默认100px）进行等比例缩放
:::

### 右键菜单

- 复制
- 层级移动