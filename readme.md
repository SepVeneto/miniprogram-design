# 小程序可视化设计

分为三部分，编辑器(editor)、视图组件(widget)以及组件配置(schema)

其中`editor`与`widget`采用`模块联邦`进行分离，而`schema`则依赖`json`动态渲染

因此在大部场景下`editor`可以独立部署，只需要针对不同的需求开发不同的`widget`以及`schema`


## 使用

需要接入编辑器的项目

```
pnpm i @mpd/core @micro-zoe/micro-app
```

main.js
```js
import microApp from '@micro-zoe/micro-app'

microApp.start()
```

接入文件
```html
<template>
  <div id="mpd-container"></div>
</template
```
```js
import { useDesign } from '@mpd/core'

const [getData, setData] = await useDesign('#mpd-container', {
  url: '//localhost:9999/miniprogram/editor'
})
```

进行视图组件开发的
```
pnpm create @mpd/template example
cd example
pnpm i
pnpm editor:init
```

具体可以参考`@mpd/template`中的demo

## Packages

| Package                       | Version (click for changelogs)                                                                                                                                                                     |
| ----------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [core](packages/core)         | [![@mpd/core version](https://img.shields.io/github/package-json/v/SepVeneto/miniprogram-design?filename=packages%2Fcore%2Fpackage.json&label=%20)](packages/core/CHANGELOG.md)                    |
| [editor](packages/editor)     | [![@mpd/editor version](https://img.shields.io/github/package-json/v/SepVeneto/miniprogram-design?filename=packages%2Feditor%2Fpackage.json&label=%20)](packages/editor/CHANGELOG.md)              |
| [template](packages/template) | [![@mpd/create-template version](https://img.shields.io/github/package-json/v/SepVeneto/miniprogram-design?filename=packages%2Ftemplate%2Fpackage.json&label=%20)](packages/template/CHANGELOG.md) |

## 编辑器

默认是在微前端([micro-app](https://micro-zoe.com/docs/))环境下执行的。

可以独立部署，需要保证同域或允许跨域。

[具体说明](packages/editor/CHANGELOG.md)

## 视图组件

支持独立运行，依赖`Module Federation`，如果不使用[模板](packages/template)，需要自行配置相关入口。

渲染环境已经安装了`element-plus`，因此可以在视图中直接使用相关组件。但是独立运行时需要自行安装（不推荐)

理论上进行视图组件开发时，只需要关注`widgets`中的内容，由于依赖了动态组件，视图的命名规则需要遵循`${name}.view.vue`

如果有特殊需求，可以在`components/viewRender`中自行修改

### 类型

```ts
interface IWidget {
  _uuid: string             // 随机字符串，唯一识别id
  _name: string             // 视力组件的显示名称
  _view: string             // 渲染视图的名称
  _schema: string           // 相关配置项集合的名称
  _disabled: boolean        
  _inContainer: 'outer' | 'inner' | string // 该组件允许出现的位置
  [attr: string]: any
}
```

### 说明

带下划线的都是设计侧在渲染视图和应用配置参数的时候会用到的参数，小程序侧不推荐使用。

`_inContainer`的作用是限制组件的拖拽位置

| 参数 | 说明 |
| ---  | ---- |
| inner | 只允许出现在容器内部 |
| outer | 只允许出现在容器外部 |

比如容器不允许嵌套，那么只能出现在外部，就需要设置`outer`。

## 组件配置

通过json配置组件相关的设置内容

```ts
interface ISchema {
  type: SchemaType   // 配置项的类型
  label: string      // 配置项的名称
  key: string        // 视图中双向绑定的值，支持链式（style.marginTop）
  [attr: string]: any
}
```

| Type | Desc |
| ---- | ---- |
| input | 文本输入框 |
| number | 数字输入框 |
| checkbox | 多选框 |
| image | 图片上传（需要自行实现上传相关逻辑）|
| colorPicker | 拾色器 |
| select | 选择器 |
| radioGroup | 单选框组|
| editor | 富文本编辑器（wangeditor）|
