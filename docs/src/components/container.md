# Container

编辑器预设的基本容器组件

## 配置项

| 名称 | 类型 | 默认值 | 可选值 | 说明 |
| :--- | :-- | :----- | :---- | :--- |
| type | string | 'grid' | 'grid' \| 'swiper' | 决定容器的类型 |
| grid | number | 2 | - | 栅格布局的列数（仅grid类型有效）

::: info
其它诸如列间隔，行间隔等依赖css样式实现的功能可以直接将对应样式作为`key`配置在`schema`中


```json
[
  {
    "type": "number",
    "label": "列",
    "key": "grid"
  },
  {
    "type": "number",
    "label": "列间隙",
    "key": "style.columnGap"
  },
  {
    "type": "number",
    "label": "行间隙",
    "key": "style.rowGap"
  }
]
```
:::

## 栅格布局原理

contianer的栅格布局并不是真正意义的上栅格，而是依赖`flex`和动态计算列宽模拟出来的效果，因此实际使用中不可避免的会出现自动挤占空白格的情况，这个是不可避免的。

## 轮播

只是简单的实现了轮播的手动切换展示，考虑到手动切换会占用鼠标事件，对拖曳功能有影响，因此只有在预览模式才可以使用轮播的手动切换。

如果需要对轮播的顺序进行调整，目前只能通过[自定义配置](/editor/schema#自定义)来自己实现排序功能，比如[vueuse/useSortable](https://vueuse.org/integrations/useSortable/#usesortable)