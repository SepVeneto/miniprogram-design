# 快速开始

这个包本质上是提供一个更新`editor`的途径，本身没有任何导出

## 安装
```cmd
pnpm i @mpd/editor
npm i @mpd/editor
yarn add @mpd/editor
```

## 使用
```diff
"scripts": {
  ...
+ "editor:init": "mpd init --dir public"
}
```

```
pnpm editor:init
```

### 参数说明

dir是项目配置的公共路径，一般情况下不需要修改。

[vue-cli](https://cli.vuejs.org/zh/guide/html-and-static-assets.html#public-%E6%96%87%E4%BB%B6%E5%A4%B9)

[vite](https://vitejs.dev/guide/assets.html#the-public-directory)

[webpack-dev-server](https://github.com/webpack/webpack-dev-server#with-the-cli)

由于是独立部署，因此即使项目没有部署在域名根部，也不需要去适配`publicPath`。只需要保证域名根部有这样的一个文件结构就可以了
```tree
root
└───miniprogram-design
    │   favicon.ico
    │   index.html
    │   remoteEntry.js
    │
    ├───css
    │
    ├───editor
    │   │   favicon.ico
    │   │   index.html
    │   │
    │   └───deign-static
    │       ├───css
    │       │
    │       ├───img
    │       │
    │       └───js
    │
    └───js
```