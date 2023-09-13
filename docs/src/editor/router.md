# Router

编辑器依赖`vue-router`的`createMemoryHistory`来模拟小程序的路由系统

## 使用

1. 在useDesign初始化时，通过`router`添加
2. 通过`set`方法自行决定添加路由的时机

::: warning 警告
`set`并不会校验添加的路由在路由表中是否已存在，对于重复的路由行为参考`vue-router`
:::

```ts
import { useDesign } from '@sepveneto/mpd-core'

const [, set] = useDesign({
  // ...options
  router: [
    { name: 'home', path: '/' },
    { name: 'personal', path: '/personal' },
  ]
})

// set({
//   router: [
//     { name: 'home', path: '/' },
//     { name: 'personal', path: '/personal' },
//   ]
// })

```
