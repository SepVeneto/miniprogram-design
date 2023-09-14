# Config

## 数据结构

::: info
[RouteRecordName](https://router.vuejs.org/zh/api/#Type-Aliases-RouteRecordName)

[Widget](/editor/widgets#数据结构)
:::
```ts
export interface Config{
  globalConfig: Record<string, unknown>
  body: Record<RouteRecordName , Widget[]>
  tabbars: {
    _uuid: string
    hidden?: boolean
    list:  {
      _uuid: string
      id: number
      name: string
      subTitle: string
      text: string
      activeColor?: string
      inactiveColor?: string
      activeImage?: string
      inactiveImage?: string
    }[]
  }
}
```
