# 快速开始

## 安装
```cmd
pnpm i @sepveneto/mpd-core
npm i @sepveneto/mpd-core
yarn add @sepveneto/mpd-core
```

## 使用
```js
import { useDesign } from '@sepveneto/mpd-core'

const [getData, setData] = await useDesign('#mpd-container', {
  name: 'mpd-editor',
  url: '//localhost:9999/miniprogram/editor'
})
```