# Widgets（工具栏）

左侧的工具栏主要用于向编辑器提供视图组合

## 数据结构

可以进行字段的扩展

```ts
type Widgets = Item[]

interface Item {
  name: string
  group: Widget[]
}
interface Widget {
  /**
   * 显示在组件树和工具栏上的名称
   */
  _name: string
  /**
   * 是否允许拖曳添加到编辑器中
   */
  _disabled?: boolean
  /**
   * 视图的名称，用来向远程视图加载对应视图组件
   */
  _view: string
  /**
   * 该视图组件可配置数据的名称，用来查询对应指定组件的配置数据
   */
  _schema: string

  /**
   * 该组件是否可以出现在容器中
   * inner: 只允许出现在容器中
   * outer: 只允许出现在容器外
   * 默认可以出现在任意位置
   */
  _inContainer?: 'inner' | 'outer'
  /**
   * 样式相关的配置
   */
  style: CSSProperties
}
```

::: warning 警告
以`_`开头的字段表示在编辑器内部被使用了，在自定义的时候不要覆盖。除非明确知道修改之后会对系统造成什么影响。
:::

::: warning 注意
这里的容器包含`栅格容器`和`轮播容器`
:::

## 例子

```ts
[
  {
    name: '基本组件',
    group: [
      {
        _name: '卡片',
        _view: 'card',
        _schema: 'card',
        style: { width: 375, height: 100 },
      },
    ],
  },
]
```
