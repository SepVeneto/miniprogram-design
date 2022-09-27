# 快速开始

## 安装
```cmd
pnpm i @mpd/core
npm i @mpd/core
yarn add @mpd/core
```

## 使用
```js
import { useDesign } from '@mpd/core'

const [getData, setData] = await useDesign('#mpd-container', {
  name: 'mpd-editor',
  url: '//localhost:9999/miniprogram/editor'
})
```