---
outline: deep
---

# 介绍

`miniprogram-design`的设计初衷是允许将视图组件完全与可视化编辑的功能剥离开来，一方面让开发的关注点下沉，不需要考虑可视化的基础功能，能够快速进行业务组件的开发; 另一方面是能够快速接入不同的项目。

## 业务与功能分离

依赖`module-federation`让业务组件可以与可视化功能分离开。简单的说编辑器本身可以独立部署，而业务组件可以在本地开发。这也是与常见的可视化编辑器的不同地方，要么是颗粒度太细，导致使用起来很麻烦，上手门槛比较高; 要么是单纯通过json配置，比较死板。

## 快速部署

支持通过`docker`来快速部署，运行后可以通过端口直接访问，或者是在网关进行简单的匹配转发。