# 快速开始

## 编辑器部署

```shell
docker pull sepveneto/editor

docker run -d --name mpd-editor -p 9087:8080 sepveneto/editor
```

## 安装

::: code-group
```shell [pnpm]
pnpm i @sepveneto/mpd-core @micro-zoe/micro-app@beta
```
```shell [npm]
npm i @sepveneto/mpd-core @micro-zoe/micro-app@beta
```
```shell [yarn]
yarn add @sepveneto/mpd-core @micro-zoe/micro-app@beta
```
:::

## 项目使用

::: code-group
```js [main.js]
import microApp from '@micro-zoe/micro-app'

microApp.start()
```
```vue [App.vue]
<template>
  <div id="design-container" />
</template>

<script setup>
import { useDesign } from '@sepveneto/mpd-core'

useDesign('#design-container', {
  url: '编辑器部署的地址',
  data: {
    remoteUrl: '远程视图的地址'
  },
})
</script>
```
:::

## 远程视图

```shell
pnpm create @sepveneto/mpd-tempalte

pnpm i

pnpm dev
```
