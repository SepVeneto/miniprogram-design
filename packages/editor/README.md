# 快速开始

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