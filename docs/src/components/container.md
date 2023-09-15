# Container

编辑器预设的基本容器组件


::: warning
栅格布局并不是真正意义的上栅格，而是依赖`flex`和动态计算列宽模拟出来的效果，因此实际使用中不可避免的会出现自动挤占空白格的情况，这个是不可避免的。
:::

## 使用

```json
{
  "name": "容器",
  "_view": "container",
  "_schema": "container"
}
```

## 配置项

| 名称 | 类型 | 默认值 | 可选值 | 说明 |
| :--- | :-- | :----- | :---- | :--- |
| grid | number | 2 | - | 栅格布局的列数 |

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
