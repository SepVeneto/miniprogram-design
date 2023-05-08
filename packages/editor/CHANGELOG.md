## [0.7.5](https://github.com/SepVeneto/miniprogram-design/compare/0.0.1-alpha.2...0.7.5) (2023-05-08)


### Bug Fixes

* 轮播容器插入新组件无法切换 ([f7afbfd](https://github.com/SepVeneto/miniprogram-design/commit/f7afbfd16e6a6c683e9f06f63d24f71e0f1f18df))
* 双向绑定丢失 ([d0e11c0](https://github.com/SepVeneto/miniprogram-design/commit/d0e11c0cbb547ec48ad239afa1e294b1ab44edc8))
* 选择tabbar异常 ([b646413](https://github.com/SepVeneto/miniprogram-design/commit/b646413cfed359019e8d98e2d4704b91608fc04a))
* 远程容器错误使用基座的资源，异步加载配置失败 ([2df4748](https://github.com/SepVeneto/miniprogram-design/commit/2df47485ba018dab20d94883ae445d9ddd111c44))
* 组件默认数据被编辑器影响 ([54f9185](https://github.com/SepVeneto/miniprogram-design/commit/54f91858aa73739d9c872393180b18a691cfb4b4))
* basic-comp still 0.1.7 ([a49ed38](https://github.com/SepVeneto/miniprogram-design/commit/a49ed38523abd79e561f37956d74ce62a6b92acb))
* build error ([d9fec09](https://github.com/SepVeneto/miniprogram-design/commit/d9fec0985a7d1143b0c4f04bcb2bc885e924e058))
* **container:** 容器背景为图片时size和repeat属性被覆盖 ([147f24c](https://github.com/SepVeneto/miniprogram-design/commit/147f24cc39d3df186e20874dd8a4f1e7d43caf52))
* **editor:** 国际化无效 ([7030ffb](https://github.com/SepVeneto/miniprogram-design/commit/7030ffbb9a98e617f1ed0388d8e1f7d1e213ba8a))
* **editor:** 组件视图初始化时，grid宽度计算错误 ([8568afc](https://github.com/SepVeneto/miniprogram-design/commit/8568afcf68e2c96982a369e8e95c4f6e5a63e114))
* **editor:** container宽度计算在存在padding时有偏差 ([1d2d670](https://github.com/SepVeneto/miniprogram-design/commit/1d2d67006b9712c7ca82bf7ae647f3313ab9edfc))
* preview无效 ([d4c5450](https://github.com/SepVeneto/miniprogram-design/commit/d4c5450c1fef9260e9a100e26be4853e9544dc21))
* **swiper:** 子组件删除后轮播不更新 ([1181eea](https://github.com/SepVeneto/miniprogram-design/commit/1181eea2b9663075b798ef7fdabb8aca5c14335a))
* update types ([1abb222](https://github.com/SepVeneto/miniprogram-design/commit/1abb222478e4876dcd273832337de9786f4edb26))


* feat(globalConfig)!: 支持配置 ([c0ef74b](https://github.com/SepVeneto/miniprogram-design/commit/c0ef74b4566df663fd7929e67a7da92147a62a47))
* feat(widgets)!: 分组 ([c21518d](https://github.com/SepVeneto/miniprogram-design/commit/c21518da045fd07c4978d2be8cf755f2a22a6dfd))


### Features

* 添加@sepveneto/basic-comp ([1b1a481](https://github.com/SepVeneto/miniprogram-design/commit/1b1a4813267020ad2cad069d1a1e3fef7345df66))
* 添加canvas ([617cd81](https://github.com/SepVeneto/miniprogram-design/commit/617cd81f8085da3d88a7ac014f442870223322d7))
* 添加tabbar与router的默认行为 ([30b6cb1](https://github.com/SepVeneto/miniprogram-design/commit/30b6cb1091eec2da78a9abb584f16868c6c0f3d7))
* 修改数据更新逻辑 ([6849a05](https://github.com/SepVeneto/miniprogram-design/commit/6849a05e8203bde6e08a542b377fc692beec5346))
* 支持使用全局配置 ([3bf82e1](https://github.com/SepVeneto/miniprogram-design/commit/3bf82e14a33da7519c765d64c7bca81d7157d0ff))
* 子元素宽度完全贴合预览大小 ([e029e60](https://github.com/SepVeneto/miniprogram-design/commit/e029e603ab2695b57120b7eed36fecbc240b3aca))
* add route ([cde8030](https://github.com/SepVeneto/miniprogram-design/commit/cde80302550a1c7aaf27a453269780430afc5ef2))
* apply routes ([c6fc2d0](https://github.com/SepVeneto/miniprogram-design/commit/c6fc2d0bc84edd4e5e0f4400ece9e3b73bdcbc87))
* **container:** 支持背景图片 ([0cc1512](https://github.com/SepVeneto/miniprogram-design/commit/0cc15124d9cb9fa2af43c5c80fbd19d81e010334))
* dynamic remote ([1751e9a](https://github.com/SepVeneto/miniprogram-design/commit/1751e9adfe2d435746f86ca3baa7c01fd3f63a55))
* dynamic set remote url ([42299c9](https://github.com/SepVeneto/miniprogram-design/commit/42299c9c347b045a8430fcdca67b999629cc572e))
* **editor:** 不限制vueuse的版本 ([6624cc6](https://github.com/SepVeneto/miniprogram-design/commit/6624cc69dc8c5a2f8e86042f6f5dff7edfcbdfc6))
* **editor:** 容器内组件支持缩放 ([9aad63a](https://github.com/SepVeneto/miniprogram-design/commit/9aad63ae231ee2ac47111ca3a429d67086ba6156))
* **editor:** 输出版本号 ([35c3fe1](https://github.com/SepVeneto/miniprogram-design/commit/35c3fe12812359bcd39de50c93960d0122ee4242))
* **editor:** 添加basic-comp ([d40a1a9](https://github.com/SepVeneto/miniprogram-design/commit/d40a1a94f6028a6584d8a7840813f779ac369313))
* **editor:** container内的元素添加默认值 ([ed281fa](https://github.com/SepVeneto/miniprogram-design/commit/ed281fa0fc87c72db6b55a83bcca625ff5bcd0ce))
* **editor:** element 中文 ([c4a4a63](https://github.com/SepVeneto/miniprogram-design/commit/c4a4a634bf758cb406221efe98e0bc48cca6d714))
* hooks ([b577b80](https://github.com/SepVeneto/miniprogram-design/commit/b577b8086e9919779b606f3b421219e28d2fe330))
* mobile operate ([eb2b2e9](https://github.com/SepVeneto/miniprogram-design/commit/eb2b2e92a11c466a95437f3f1fd738ed8f2ef162))
* **route:** back and home ([ef41075](https://github.com/SepVeneto/miniprogram-design/commit/ef41075670dadd9715eaf20e616208b39db08a89))
* schema ([75378fc](https://github.com/SepVeneto/miniprogram-design/commit/75378fc11e9038f98a013da89d3b93380ce8bde5))
* text, image ([6006263](https://github.com/SepVeneto/miniprogram-design/commit/6006263211dc925e08ce3741ae9ef1b736d93db0))
* update basic-comp ([c400621](https://github.com/SepVeneto/miniprogram-design/commit/c40062120afc3acdfab452ea86c9188dcdb00ef5))
* update element, vue, basic-comp to latest version ([8edba5c](https://github.com/SepVeneto/miniprogram-design/commit/8edba5c3036a2101c105bf00b8e3454635d7a2a1))


### BREAKING CHANGES

* 改为动态配置
* 组件列表的数据结构修改



## [0.7.4](https://github.com/SepVeneto/miniprogram-design/compare/0.0.1-alpha.2...0.7.4) (2023-05-05)


### Bug Fixes

* 轮播容器插入新组件无法切换 ([f7afbfd](https://github.com/SepVeneto/miniprogram-design/commit/f7afbfd16e6a6c683e9f06f63d24f71e0f1f18df))
* 双向绑定丢失 ([d0e11c0](https://github.com/SepVeneto/miniprogram-design/commit/d0e11c0cbb547ec48ad239afa1e294b1ab44edc8))
* 选择tabbar异常 ([b646413](https://github.com/SepVeneto/miniprogram-design/commit/b646413cfed359019e8d98e2d4704b91608fc04a))
* 远程容器错误使用基座的资源，异步加载配置失败 ([2df4748](https://github.com/SepVeneto/miniprogram-design/commit/2df47485ba018dab20d94883ae445d9ddd111c44))
* 组件默认数据被编辑器影响 ([54f9185](https://github.com/SepVeneto/miniprogram-design/commit/54f91858aa73739d9c872393180b18a691cfb4b4))
* basic-comp still 0.1.7 ([a49ed38](https://github.com/SepVeneto/miniprogram-design/commit/a49ed38523abd79e561f37956d74ce62a6b92acb))
* build error ([d9fec09](https://github.com/SepVeneto/miniprogram-design/commit/d9fec0985a7d1143b0c4f04bcb2bc885e924e058))
* **editor:** 国际化无效 ([7030ffb](https://github.com/SepVeneto/miniprogram-design/commit/7030ffbb9a98e617f1ed0388d8e1f7d1e213ba8a))
* **editor:** 组件视图初始化时，grid宽度计算错误 ([8568afc](https://github.com/SepVeneto/miniprogram-design/commit/8568afcf68e2c96982a369e8e95c4f6e5a63e114))
* **editor:** container宽度计算在存在padding时有偏差 ([1d2d670](https://github.com/SepVeneto/miniprogram-design/commit/1d2d67006b9712c7ca82bf7ae647f3313ab9edfc))
* preview无效 ([d4c5450](https://github.com/SepVeneto/miniprogram-design/commit/d4c5450c1fef9260e9a100e26be4853e9544dc21))
* **swiper:** 子组件删除后轮播不更新 ([1181eea](https://github.com/SepVeneto/miniprogram-design/commit/1181eea2b9663075b798ef7fdabb8aca5c14335a))
* update types ([1abb222](https://github.com/SepVeneto/miniprogram-design/commit/1abb222478e4876dcd273832337de9786f4edb26))


* feat(globalConfig)!: 支持配置 ([c0ef74b](https://github.com/SepVeneto/miniprogram-design/commit/c0ef74b4566df663fd7929e67a7da92147a62a47))
* feat(widgets)!: 分组 ([c21518d](https://github.com/SepVeneto/miniprogram-design/commit/c21518da045fd07c4978d2be8cf755f2a22a6dfd))


### Features

* 添加@sepveneto/basic-comp ([1b1a481](https://github.com/SepVeneto/miniprogram-design/commit/1b1a4813267020ad2cad069d1a1e3fef7345df66))
* 添加canvas ([617cd81](https://github.com/SepVeneto/miniprogram-design/commit/617cd81f8085da3d88a7ac014f442870223322d7))
* 添加tabbar与router的默认行为 ([30b6cb1](https://github.com/SepVeneto/miniprogram-design/commit/30b6cb1091eec2da78a9abb584f16868c6c0f3d7))
* 修改数据更新逻辑 ([6849a05](https://github.com/SepVeneto/miniprogram-design/commit/6849a05e8203bde6e08a542b377fc692beec5346))
* 支持使用全局配置 ([3bf82e1](https://github.com/SepVeneto/miniprogram-design/commit/3bf82e14a33da7519c765d64c7bca81d7157d0ff))
* 子元素宽度完全贴合预览大小 ([e029e60](https://github.com/SepVeneto/miniprogram-design/commit/e029e603ab2695b57120b7eed36fecbc240b3aca))
* add route ([cde8030](https://github.com/SepVeneto/miniprogram-design/commit/cde80302550a1c7aaf27a453269780430afc5ef2))
* apply routes ([c6fc2d0](https://github.com/SepVeneto/miniprogram-design/commit/c6fc2d0bc84edd4e5e0f4400ece9e3b73bdcbc87))
* **container:** 支持背景图片 ([0cc1512](https://github.com/SepVeneto/miniprogram-design/commit/0cc15124d9cb9fa2af43c5c80fbd19d81e010334))
* dynamic remote ([1751e9a](https://github.com/SepVeneto/miniprogram-design/commit/1751e9adfe2d435746f86ca3baa7c01fd3f63a55))
* dynamic set remote url ([42299c9](https://github.com/SepVeneto/miniprogram-design/commit/42299c9c347b045a8430fcdca67b999629cc572e))
* **editor:** 不限制vueuse的版本 ([6624cc6](https://github.com/SepVeneto/miniprogram-design/commit/6624cc69dc8c5a2f8e86042f6f5dff7edfcbdfc6))
* **editor:** 容器内组件支持缩放 ([9aad63a](https://github.com/SepVeneto/miniprogram-design/commit/9aad63ae231ee2ac47111ca3a429d67086ba6156))
* **editor:** 输出版本号 ([35c3fe1](https://github.com/SepVeneto/miniprogram-design/commit/35c3fe12812359bcd39de50c93960d0122ee4242))
* **editor:** 添加basic-comp ([d40a1a9](https://github.com/SepVeneto/miniprogram-design/commit/d40a1a94f6028a6584d8a7840813f779ac369313))
* **editor:** container内的元素添加默认值 ([ed281fa](https://github.com/SepVeneto/miniprogram-design/commit/ed281fa0fc87c72db6b55a83bcca625ff5bcd0ce))
* **editor:** element 中文 ([c4a4a63](https://github.com/SepVeneto/miniprogram-design/commit/c4a4a634bf758cb406221efe98e0bc48cca6d714))
* hooks ([b577b80](https://github.com/SepVeneto/miniprogram-design/commit/b577b8086e9919779b606f3b421219e28d2fe330))
* mobile operate ([eb2b2e9](https://github.com/SepVeneto/miniprogram-design/commit/eb2b2e92a11c466a95437f3f1fd738ed8f2ef162))
* **route:** back and home ([ef41075](https://github.com/SepVeneto/miniprogram-design/commit/ef41075670dadd9715eaf20e616208b39db08a89))
* schema ([75378fc](https://github.com/SepVeneto/miniprogram-design/commit/75378fc11e9038f98a013da89d3b93380ce8bde5))
* text, image ([6006263](https://github.com/SepVeneto/miniprogram-design/commit/6006263211dc925e08ce3741ae9ef1b736d93db0))
* update basic-comp ([c400621](https://github.com/SepVeneto/miniprogram-design/commit/c40062120afc3acdfab452ea86c9188dcdb00ef5))
* update element, vue, basic-comp to latest version ([8edba5c](https://github.com/SepVeneto/miniprogram-design/commit/8edba5c3036a2101c105bf00b8e3454635d7a2a1))


### BREAKING CHANGES

* 改为动态配置
* 组件列表的数据结构修改



## [0.7.3](https://github.com/SepVeneto/miniprogram-design/compare/0.0.1-alpha.2...0.7.3) (2023-05-05)


### Bug Fixes

* 轮播容器插入新组件无法切换 ([f7afbfd](https://github.com/SepVeneto/miniprogram-design/commit/f7afbfd16e6a6c683e9f06f63d24f71e0f1f18df))
* 双向绑定丢失 ([d0e11c0](https://github.com/SepVeneto/miniprogram-design/commit/d0e11c0cbb547ec48ad239afa1e294b1ab44edc8))
* 选择tabbar异常 ([b646413](https://github.com/SepVeneto/miniprogram-design/commit/b646413cfed359019e8d98e2d4704b91608fc04a))
* 远程容器错误使用基座的资源，异步加载配置失败 ([2df4748](https://github.com/SepVeneto/miniprogram-design/commit/2df47485ba018dab20d94883ae445d9ddd111c44))
* 组件默认数据被编辑器影响 ([54f9185](https://github.com/SepVeneto/miniprogram-design/commit/54f91858aa73739d9c872393180b18a691cfb4b4))
* basic-comp still 0.1.7 ([a49ed38](https://github.com/SepVeneto/miniprogram-design/commit/a49ed38523abd79e561f37956d74ce62a6b92acb))
* build error ([d9fec09](https://github.com/SepVeneto/miniprogram-design/commit/d9fec0985a7d1143b0c4f04bcb2bc885e924e058))
* **editor:** 国际化无效 ([7030ffb](https://github.com/SepVeneto/miniprogram-design/commit/7030ffbb9a98e617f1ed0388d8e1f7d1e213ba8a))
* **editor:** 组件视图初始化时，grid宽度计算错误 ([8568afc](https://github.com/SepVeneto/miniprogram-design/commit/8568afcf68e2c96982a369e8e95c4f6e5a63e114))
* **editor:** container宽度计算在存在padding时有偏差 ([1d2d670](https://github.com/SepVeneto/miniprogram-design/commit/1d2d67006b9712c7ca82bf7ae647f3313ab9edfc))
* preview无效 ([d4c5450](https://github.com/SepVeneto/miniprogram-design/commit/d4c5450c1fef9260e9a100e26be4853e9544dc21))
* **swiper:** 子组件删除后轮播不更新 ([1181eea](https://github.com/SepVeneto/miniprogram-design/commit/1181eea2b9663075b798ef7fdabb8aca5c14335a))
* update types ([1abb222](https://github.com/SepVeneto/miniprogram-design/commit/1abb222478e4876dcd273832337de9786f4edb26))


* feat(globalConfig)!: 支持配置 ([c0ef74b](https://github.com/SepVeneto/miniprogram-design/commit/c0ef74b4566df663fd7929e67a7da92147a62a47))
* feat(widgets)!: 分组 ([c21518d](https://github.com/SepVeneto/miniprogram-design/commit/c21518da045fd07c4978d2be8cf755f2a22a6dfd))


### Features

* 添加@sepveneto/basic-comp ([1b1a481](https://github.com/SepVeneto/miniprogram-design/commit/1b1a4813267020ad2cad069d1a1e3fef7345df66))
* 添加canvas ([617cd81](https://github.com/SepVeneto/miniprogram-design/commit/617cd81f8085da3d88a7ac014f442870223322d7))
* 添加tabbar与router的默认行为 ([30b6cb1](https://github.com/SepVeneto/miniprogram-design/commit/30b6cb1091eec2da78a9abb584f16868c6c0f3d7))
* 修改数据更新逻辑 ([6849a05](https://github.com/SepVeneto/miniprogram-design/commit/6849a05e8203bde6e08a542b377fc692beec5346))
* 支持使用全局配置 ([3bf82e1](https://github.com/SepVeneto/miniprogram-design/commit/3bf82e14a33da7519c765d64c7bca81d7157d0ff))
* 子元素宽度完全贴合预览大小 ([e029e60](https://github.com/SepVeneto/miniprogram-design/commit/e029e603ab2695b57120b7eed36fecbc240b3aca))
* add route ([cde8030](https://github.com/SepVeneto/miniprogram-design/commit/cde80302550a1c7aaf27a453269780430afc5ef2))
* apply routes ([c6fc2d0](https://github.com/SepVeneto/miniprogram-design/commit/c6fc2d0bc84edd4e5e0f4400ece9e3b73bdcbc87))
* **container:** 支持背景图片 ([0cc1512](https://github.com/SepVeneto/miniprogram-design/commit/0cc15124d9cb9fa2af43c5c80fbd19d81e010334))
* dynamic remote ([1751e9a](https://github.com/SepVeneto/miniprogram-design/commit/1751e9adfe2d435746f86ca3baa7c01fd3f63a55))
* dynamic set remote url ([42299c9](https://github.com/SepVeneto/miniprogram-design/commit/42299c9c347b045a8430fcdca67b999629cc572e))
* **editor:** 不限制vueuse的版本 ([6624cc6](https://github.com/SepVeneto/miniprogram-design/commit/6624cc69dc8c5a2f8e86042f6f5dff7edfcbdfc6))
* **editor:** 容器内组件支持缩放 ([9aad63a](https://github.com/SepVeneto/miniprogram-design/commit/9aad63ae231ee2ac47111ca3a429d67086ba6156))
* **editor:** 输出版本号 ([35c3fe1](https://github.com/SepVeneto/miniprogram-design/commit/35c3fe12812359bcd39de50c93960d0122ee4242))
* **editor:** 添加basic-comp ([d40a1a9](https://github.com/SepVeneto/miniprogram-design/commit/d40a1a94f6028a6584d8a7840813f779ac369313))
* **editor:** container内的元素添加默认值 ([ed281fa](https://github.com/SepVeneto/miniprogram-design/commit/ed281fa0fc87c72db6b55a83bcca625ff5bcd0ce))
* **editor:** element 中文 ([c4a4a63](https://github.com/SepVeneto/miniprogram-design/commit/c4a4a634bf758cb406221efe98e0bc48cca6d714))
* hooks ([b577b80](https://github.com/SepVeneto/miniprogram-design/commit/b577b8086e9919779b606f3b421219e28d2fe330))
* mobile operate ([eb2b2e9](https://github.com/SepVeneto/miniprogram-design/commit/eb2b2e92a11c466a95437f3f1fd738ed8f2ef162))
* **route:** back and home ([ef41075](https://github.com/SepVeneto/miniprogram-design/commit/ef41075670dadd9715eaf20e616208b39db08a89))
* schema ([75378fc](https://github.com/SepVeneto/miniprogram-design/commit/75378fc11e9038f98a013da89d3b93380ce8bde5))
* text, image ([6006263](https://github.com/SepVeneto/miniprogram-design/commit/6006263211dc925e08ce3741ae9ef1b736d93db0))
* update element, vue, basic-comp to latest version ([8edba5c](https://github.com/SepVeneto/miniprogram-design/commit/8edba5c3036a2101c105bf00b8e3454635d7a2a1))


### BREAKING CHANGES

* 改为动态配置
* 组件列表的数据结构修改



## [0.7.2](https://github.com/SepVeneto/miniprogram-design/compare/0.0.1-alpha.2...0.7.2) (2023-05-05)


### Bug Fixes

* 轮播容器插入新组件无法切换 ([f7afbfd](https://github.com/SepVeneto/miniprogram-design/commit/f7afbfd16e6a6c683e9f06f63d24f71e0f1f18df))
* 双向绑定丢失 ([d0e11c0](https://github.com/SepVeneto/miniprogram-design/commit/d0e11c0cbb547ec48ad239afa1e294b1ab44edc8))
* 选择tabbar异常 ([b646413](https://github.com/SepVeneto/miniprogram-design/commit/b646413cfed359019e8d98e2d4704b91608fc04a))
* 远程容器错误使用基座的资源，异步加载配置失败 ([2df4748](https://github.com/SepVeneto/miniprogram-design/commit/2df47485ba018dab20d94883ae445d9ddd111c44))
* 组件默认数据被编辑器影响 ([54f9185](https://github.com/SepVeneto/miniprogram-design/commit/54f91858aa73739d9c872393180b18a691cfb4b4))
* basic-comp still 0.1.7 ([a49ed38](https://github.com/SepVeneto/miniprogram-design/commit/a49ed38523abd79e561f37956d74ce62a6b92acb))
* **editor:** 国际化无效 ([7030ffb](https://github.com/SepVeneto/miniprogram-design/commit/7030ffbb9a98e617f1ed0388d8e1f7d1e213ba8a))
* **editor:** 组件视图初始化时，grid宽度计算错误 ([8568afc](https://github.com/SepVeneto/miniprogram-design/commit/8568afcf68e2c96982a369e8e95c4f6e5a63e114))
* **editor:** container宽度计算在存在padding时有偏差 ([1d2d670](https://github.com/SepVeneto/miniprogram-design/commit/1d2d67006b9712c7ca82bf7ae647f3313ab9edfc))
* preview无效 ([d4c5450](https://github.com/SepVeneto/miniprogram-design/commit/d4c5450c1fef9260e9a100e26be4853e9544dc21))
* **swiper:** 子组件删除后轮播不更新 ([1181eea](https://github.com/SepVeneto/miniprogram-design/commit/1181eea2b9663075b798ef7fdabb8aca5c14335a))
* update types ([1abb222](https://github.com/SepVeneto/miniprogram-design/commit/1abb222478e4876dcd273832337de9786f4edb26))


* feat(globalConfig)!: 支持配置 ([c0ef74b](https://github.com/SepVeneto/miniprogram-design/commit/c0ef74b4566df663fd7929e67a7da92147a62a47))
* feat(widgets)!: 分组 ([c21518d](https://github.com/SepVeneto/miniprogram-design/commit/c21518da045fd07c4978d2be8cf755f2a22a6dfd))


### Features

* 添加@sepveneto/basic-comp ([1b1a481](https://github.com/SepVeneto/miniprogram-design/commit/1b1a4813267020ad2cad069d1a1e3fef7345df66))
* 添加canvas ([617cd81](https://github.com/SepVeneto/miniprogram-design/commit/617cd81f8085da3d88a7ac014f442870223322d7))
* 添加tabbar与router的默认行为 ([30b6cb1](https://github.com/SepVeneto/miniprogram-design/commit/30b6cb1091eec2da78a9abb584f16868c6c0f3d7))
* 修改数据更新逻辑 ([6849a05](https://github.com/SepVeneto/miniprogram-design/commit/6849a05e8203bde6e08a542b377fc692beec5346))
* 支持使用全局配置 ([3bf82e1](https://github.com/SepVeneto/miniprogram-design/commit/3bf82e14a33da7519c765d64c7bca81d7157d0ff))
* 子元素宽度完全贴合预览大小 ([e029e60](https://github.com/SepVeneto/miniprogram-design/commit/e029e603ab2695b57120b7eed36fecbc240b3aca))
* add route ([cde8030](https://github.com/SepVeneto/miniprogram-design/commit/cde80302550a1c7aaf27a453269780430afc5ef2))
* apply routes ([c6fc2d0](https://github.com/SepVeneto/miniprogram-design/commit/c6fc2d0bc84edd4e5e0f4400ece9e3b73bdcbc87))
* **container:** 支持背景图片 ([0cc1512](https://github.com/SepVeneto/miniprogram-design/commit/0cc15124d9cb9fa2af43c5c80fbd19d81e010334))
* dynamic remote ([1751e9a](https://github.com/SepVeneto/miniprogram-design/commit/1751e9adfe2d435746f86ca3baa7c01fd3f63a55))
* dynamic set remote url ([42299c9](https://github.com/SepVeneto/miniprogram-design/commit/42299c9c347b045a8430fcdca67b999629cc572e))
* **editor:** 不限制vueuse的版本 ([6624cc6](https://github.com/SepVeneto/miniprogram-design/commit/6624cc69dc8c5a2f8e86042f6f5dff7edfcbdfc6))
* **editor:** 容器内组件支持缩放 ([9aad63a](https://github.com/SepVeneto/miniprogram-design/commit/9aad63ae231ee2ac47111ca3a429d67086ba6156))
* **editor:** 输出版本号 ([35c3fe1](https://github.com/SepVeneto/miniprogram-design/commit/35c3fe12812359bcd39de50c93960d0122ee4242))
* **editor:** 添加basic-comp ([d40a1a9](https://github.com/SepVeneto/miniprogram-design/commit/d40a1a94f6028a6584d8a7840813f779ac369313))
* **editor:** container内的元素添加默认值 ([ed281fa](https://github.com/SepVeneto/miniprogram-design/commit/ed281fa0fc87c72db6b55a83bcca625ff5bcd0ce))
* **editor:** element 中文 ([c4a4a63](https://github.com/SepVeneto/miniprogram-design/commit/c4a4a634bf758cb406221efe98e0bc48cca6d714))
* hooks ([b577b80](https://github.com/SepVeneto/miniprogram-design/commit/b577b8086e9919779b606f3b421219e28d2fe330))
* mobile operate ([eb2b2e9](https://github.com/SepVeneto/miniprogram-design/commit/eb2b2e92a11c466a95437f3f1fd738ed8f2ef162))
* **route:** back and home ([ef41075](https://github.com/SepVeneto/miniprogram-design/commit/ef41075670dadd9715eaf20e616208b39db08a89))
* schema ([75378fc](https://github.com/SepVeneto/miniprogram-design/commit/75378fc11e9038f98a013da89d3b93380ce8bde5))
* text, image ([6006263](https://github.com/SepVeneto/miniprogram-design/commit/6006263211dc925e08ce3741ae9ef1b736d93db0))
* update element, vue, basic-comp to latest version ([8edba5c](https://github.com/SepVeneto/miniprogram-design/commit/8edba5c3036a2101c105bf00b8e3454635d7a2a1))


### BREAKING CHANGES

* 改为动态配置
* 组件列表的数据结构修改



## [0.7.1](https://github.com/SepVeneto/miniprogram-design/compare/0.0.1-alpha.2...0.7.1) (2023-05-05)


### Bug Fixes

* 轮播容器插入新组件无法切换 ([f7afbfd](https://github.com/SepVeneto/miniprogram-design/commit/f7afbfd16e6a6c683e9f06f63d24f71e0f1f18df))
* 双向绑定丢失 ([d0e11c0](https://github.com/SepVeneto/miniprogram-design/commit/d0e11c0cbb547ec48ad239afa1e294b1ab44edc8))
* 选择tabbar异常 ([b646413](https://github.com/SepVeneto/miniprogram-design/commit/b646413cfed359019e8d98e2d4704b91608fc04a))
* 远程容器错误使用基座的资源，异步加载配置失败 ([2df4748](https://github.com/SepVeneto/miniprogram-design/commit/2df47485ba018dab20d94883ae445d9ddd111c44))
* 组件默认数据被编辑器影响 ([54f9185](https://github.com/SepVeneto/miniprogram-design/commit/54f91858aa73739d9c872393180b18a691cfb4b4))
* **editor:** 国际化无效 ([7030ffb](https://github.com/SepVeneto/miniprogram-design/commit/7030ffbb9a98e617f1ed0388d8e1f7d1e213ba8a))
* **editor:** 组件视图初始化时，grid宽度计算错误 ([8568afc](https://github.com/SepVeneto/miniprogram-design/commit/8568afcf68e2c96982a369e8e95c4f6e5a63e114))
* **editor:** container宽度计算在存在padding时有偏差 ([1d2d670](https://github.com/SepVeneto/miniprogram-design/commit/1d2d67006b9712c7ca82bf7ae647f3313ab9edfc))
* preview无效 ([d4c5450](https://github.com/SepVeneto/miniprogram-design/commit/d4c5450c1fef9260e9a100e26be4853e9544dc21))
* **swiper:** 子组件删除后轮播不更新 ([1181eea](https://github.com/SepVeneto/miniprogram-design/commit/1181eea2b9663075b798ef7fdabb8aca5c14335a))
* update types ([1abb222](https://github.com/SepVeneto/miniprogram-design/commit/1abb222478e4876dcd273832337de9786f4edb26))


* feat(globalConfig)!: 支持配置 ([c0ef74b](https://github.com/SepVeneto/miniprogram-design/commit/c0ef74b4566df663fd7929e67a7da92147a62a47))
* feat(widgets)!: 分组 ([c21518d](https://github.com/SepVeneto/miniprogram-design/commit/c21518da045fd07c4978d2be8cf755f2a22a6dfd))


### Features

* 添加@sepveneto/basic-comp ([1b1a481](https://github.com/SepVeneto/miniprogram-design/commit/1b1a4813267020ad2cad069d1a1e3fef7345df66))
* 添加canvas ([617cd81](https://github.com/SepVeneto/miniprogram-design/commit/617cd81f8085da3d88a7ac014f442870223322d7))
* 添加tabbar与router的默认行为 ([30b6cb1](https://github.com/SepVeneto/miniprogram-design/commit/30b6cb1091eec2da78a9abb584f16868c6c0f3d7))
* 修改数据更新逻辑 ([6849a05](https://github.com/SepVeneto/miniprogram-design/commit/6849a05e8203bde6e08a542b377fc692beec5346))
* 支持使用全局配置 ([3bf82e1](https://github.com/SepVeneto/miniprogram-design/commit/3bf82e14a33da7519c765d64c7bca81d7157d0ff))
* 子元素宽度完全贴合预览大小 ([e029e60](https://github.com/SepVeneto/miniprogram-design/commit/e029e603ab2695b57120b7eed36fecbc240b3aca))
* add route ([cde8030](https://github.com/SepVeneto/miniprogram-design/commit/cde80302550a1c7aaf27a453269780430afc5ef2))
* apply routes ([c6fc2d0](https://github.com/SepVeneto/miniprogram-design/commit/c6fc2d0bc84edd4e5e0f4400ece9e3b73bdcbc87))
* **container:** 支持背景图片 ([0cc1512](https://github.com/SepVeneto/miniprogram-design/commit/0cc15124d9cb9fa2af43c5c80fbd19d81e010334))
* dynamic remote ([1751e9a](https://github.com/SepVeneto/miniprogram-design/commit/1751e9adfe2d435746f86ca3baa7c01fd3f63a55))
* dynamic set remote url ([42299c9](https://github.com/SepVeneto/miniprogram-design/commit/42299c9c347b045a8430fcdca67b999629cc572e))
* **editor:** 不限制vueuse的版本 ([6624cc6](https://github.com/SepVeneto/miniprogram-design/commit/6624cc69dc8c5a2f8e86042f6f5dff7edfcbdfc6))
* **editor:** 容器内组件支持缩放 ([9aad63a](https://github.com/SepVeneto/miniprogram-design/commit/9aad63ae231ee2ac47111ca3a429d67086ba6156))
* **editor:** 输出版本号 ([35c3fe1](https://github.com/SepVeneto/miniprogram-design/commit/35c3fe12812359bcd39de50c93960d0122ee4242))
* **editor:** 添加basic-comp ([d40a1a9](https://github.com/SepVeneto/miniprogram-design/commit/d40a1a94f6028a6584d8a7840813f779ac369313))
* **editor:** container内的元素添加默认值 ([ed281fa](https://github.com/SepVeneto/miniprogram-design/commit/ed281fa0fc87c72db6b55a83bcca625ff5bcd0ce))
* **editor:** element 中文 ([c4a4a63](https://github.com/SepVeneto/miniprogram-design/commit/c4a4a634bf758cb406221efe98e0bc48cca6d714))
* hooks ([b577b80](https://github.com/SepVeneto/miniprogram-design/commit/b577b8086e9919779b606f3b421219e28d2fe330))
* mobile operate ([eb2b2e9](https://github.com/SepVeneto/miniprogram-design/commit/eb2b2e92a11c466a95437f3f1fd738ed8f2ef162))
* **route:** back and home ([ef41075](https://github.com/SepVeneto/miniprogram-design/commit/ef41075670dadd9715eaf20e616208b39db08a89))
* schema ([75378fc](https://github.com/SepVeneto/miniprogram-design/commit/75378fc11e9038f98a013da89d3b93380ce8bde5))
* text, image ([6006263](https://github.com/SepVeneto/miniprogram-design/commit/6006263211dc925e08ce3741ae9ef1b736d93db0))
* update element, vue, basic-comp to latest version ([8edba5c](https://github.com/SepVeneto/miniprogram-design/commit/8edba5c3036a2101c105bf00b8e3454635d7a2a1))


### BREAKING CHANGES

* 改为动态配置
* 组件列表的数据结构修改



# [0.7.0](https://github.com/SepVeneto/miniprogram-design/compare/0.0.1-alpha.2...0.7.0) (2023-04-27)


### Bug Fixes

* 轮播容器插入新组件无法切换 ([f7afbfd](https://github.com/SepVeneto/miniprogram-design/commit/f7afbfd16e6a6c683e9f06f63d24f71e0f1f18df))
* 双向绑定丢失 ([d0e11c0](https://github.com/SepVeneto/miniprogram-design/commit/d0e11c0cbb547ec48ad239afa1e294b1ab44edc8))
* 选择tabbar异常 ([b646413](https://github.com/SepVeneto/miniprogram-design/commit/b646413cfed359019e8d98e2d4704b91608fc04a))
* 远程容器错误使用基座的资源，异步加载配置失败 ([2df4748](https://github.com/SepVeneto/miniprogram-design/commit/2df47485ba018dab20d94883ae445d9ddd111c44))
* 组件默认数据被编辑器影响 ([54f9185](https://github.com/SepVeneto/miniprogram-design/commit/54f91858aa73739d9c872393180b18a691cfb4b4))
* **editor:** 国际化无效 ([7030ffb](https://github.com/SepVeneto/miniprogram-design/commit/7030ffbb9a98e617f1ed0388d8e1f7d1e213ba8a))
* **editor:** 组件视图初始化时，grid宽度计算错误 ([8568afc](https://github.com/SepVeneto/miniprogram-design/commit/8568afcf68e2c96982a369e8e95c4f6e5a63e114))
* **editor:** container宽度计算在存在padding时有偏差 ([1d2d670](https://github.com/SepVeneto/miniprogram-design/commit/1d2d67006b9712c7ca82bf7ae647f3313ab9edfc))
* preview无效 ([d4c5450](https://github.com/SepVeneto/miniprogram-design/commit/d4c5450c1fef9260e9a100e26be4853e9544dc21))
* **swiper:** 子组件删除后轮播不更新 ([1181eea](https://github.com/SepVeneto/miniprogram-design/commit/1181eea2b9663075b798ef7fdabb8aca5c14335a))
* update types ([1abb222](https://github.com/SepVeneto/miniprogram-design/commit/1abb222478e4876dcd273832337de9786f4edb26))


* feat(globalConfig)!: 支持配置 ([c0ef74b](https://github.com/SepVeneto/miniprogram-design/commit/c0ef74b4566df663fd7929e67a7da92147a62a47))
* feat(widgets)!: 分组 ([c21518d](https://github.com/SepVeneto/miniprogram-design/commit/c21518da045fd07c4978d2be8cf755f2a22a6dfd))


### Features

* 添加@sepveneto/basic-comp ([1b1a481](https://github.com/SepVeneto/miniprogram-design/commit/1b1a4813267020ad2cad069d1a1e3fef7345df66))
* 添加canvas ([617cd81](https://github.com/SepVeneto/miniprogram-design/commit/617cd81f8085da3d88a7ac014f442870223322d7))
* 添加tabbar与router的默认行为 ([30b6cb1](https://github.com/SepVeneto/miniprogram-design/commit/30b6cb1091eec2da78a9abb584f16868c6c0f3d7))
* 修改数据更新逻辑 ([6849a05](https://github.com/SepVeneto/miniprogram-design/commit/6849a05e8203bde6e08a542b377fc692beec5346))
* 支持使用全局配置 ([3bf82e1](https://github.com/SepVeneto/miniprogram-design/commit/3bf82e14a33da7519c765d64c7bca81d7157d0ff))
* 子元素宽度完全贴合预览大小 ([e029e60](https://github.com/SepVeneto/miniprogram-design/commit/e029e603ab2695b57120b7eed36fecbc240b3aca))
* add route ([cde8030](https://github.com/SepVeneto/miniprogram-design/commit/cde80302550a1c7aaf27a453269780430afc5ef2))
* apply routes ([c6fc2d0](https://github.com/SepVeneto/miniprogram-design/commit/c6fc2d0bc84edd4e5e0f4400ece9e3b73bdcbc87))
* **container:** 支持背景图片 ([0cc1512](https://github.com/SepVeneto/miniprogram-design/commit/0cc15124d9cb9fa2af43c5c80fbd19d81e010334))
* dynamic remote ([1751e9a](https://github.com/SepVeneto/miniprogram-design/commit/1751e9adfe2d435746f86ca3baa7c01fd3f63a55))
* dynamic set remote url ([42299c9](https://github.com/SepVeneto/miniprogram-design/commit/42299c9c347b045a8430fcdca67b999629cc572e))
* **editor:** 不限制vueuse的版本 ([6624cc6](https://github.com/SepVeneto/miniprogram-design/commit/6624cc69dc8c5a2f8e86042f6f5dff7edfcbdfc6))
* **editor:** 容器内组件支持缩放 ([9aad63a](https://github.com/SepVeneto/miniprogram-design/commit/9aad63ae231ee2ac47111ca3a429d67086ba6156))
* **editor:** 输出版本号 ([35c3fe1](https://github.com/SepVeneto/miniprogram-design/commit/35c3fe12812359bcd39de50c93960d0122ee4242))
* **editor:** 添加basic-comp ([d40a1a9](https://github.com/SepVeneto/miniprogram-design/commit/d40a1a94f6028a6584d8a7840813f779ac369313))
* **editor:** container内的元素添加默认值 ([ed281fa](https://github.com/SepVeneto/miniprogram-design/commit/ed281fa0fc87c72db6b55a83bcca625ff5bcd0ce))
* **editor:** element 中文 ([c4a4a63](https://github.com/SepVeneto/miniprogram-design/commit/c4a4a634bf758cb406221efe98e0bc48cca6d714))
* hooks ([b577b80](https://github.com/SepVeneto/miniprogram-design/commit/b577b8086e9919779b606f3b421219e28d2fe330))
* mobile operate ([eb2b2e9](https://github.com/SepVeneto/miniprogram-design/commit/eb2b2e92a11c466a95437f3f1fd738ed8f2ef162))
* **route:** back and home ([ef41075](https://github.com/SepVeneto/miniprogram-design/commit/ef41075670dadd9715eaf20e616208b39db08a89))
* schema ([75378fc](https://github.com/SepVeneto/miniprogram-design/commit/75378fc11e9038f98a013da89d3b93380ce8bde5))
* text, image ([6006263](https://github.com/SepVeneto/miniprogram-design/commit/6006263211dc925e08ce3741ae9ef1b736d93db0))


### BREAKING CHANGES

* 改为动态配置
* 组件列表的数据结构修改



# [0.6.0](https://github.com/SepVeneto/miniprogram-design/compare/0.0.1-alpha.2...0.6.0) (2023-04-25)


### Bug Fixes

* 轮播容器插入新组件无法切换 ([f7afbfd](https://github.com/SepVeneto/miniprogram-design/commit/f7afbfd16e6a6c683e9f06f63d24f71e0f1f18df))
* 双向绑定丢失 ([d0e11c0](https://github.com/SepVeneto/miniprogram-design/commit/d0e11c0cbb547ec48ad239afa1e294b1ab44edc8))
* 选择tabbar异常 ([b646413](https://github.com/SepVeneto/miniprogram-design/commit/b646413cfed359019e8d98e2d4704b91608fc04a))
* 远程容器错误使用基座的资源，异步加载配置失败 ([2df4748](https://github.com/SepVeneto/miniprogram-design/commit/2df47485ba018dab20d94883ae445d9ddd111c44))
* 组件默认数据被编辑器影响 ([54f9185](https://github.com/SepVeneto/miniprogram-design/commit/54f91858aa73739d9c872393180b18a691cfb4b4))
* **editor:** 国际化无效 ([7030ffb](https://github.com/SepVeneto/miniprogram-design/commit/7030ffbb9a98e617f1ed0388d8e1f7d1e213ba8a))
* **editor:** 组件视图初始化时，grid宽度计算错误 ([8568afc](https://github.com/SepVeneto/miniprogram-design/commit/8568afcf68e2c96982a369e8e95c4f6e5a63e114))
* **editor:** container宽度计算在存在padding时有偏差 ([1d2d670](https://github.com/SepVeneto/miniprogram-design/commit/1d2d67006b9712c7ca82bf7ae647f3313ab9edfc))
* preview无效 ([d4c5450](https://github.com/SepVeneto/miniprogram-design/commit/d4c5450c1fef9260e9a100e26be4853e9544dc21))
* **swiper:** 子组件删除后轮播不更新 ([1181eea](https://github.com/SepVeneto/miniprogram-design/commit/1181eea2b9663075b798ef7fdabb8aca5c14335a))


* feat(globalConfig)!: 支持配置 ([c0ef74b](https://github.com/SepVeneto/miniprogram-design/commit/c0ef74b4566df663fd7929e67a7da92147a62a47))
* feat(widgets)!: 分组 ([c21518d](https://github.com/SepVeneto/miniprogram-design/commit/c21518da045fd07c4978d2be8cf755f2a22a6dfd))


### Features

* 添加@sepveneto/basic-comp ([1b1a481](https://github.com/SepVeneto/miniprogram-design/commit/1b1a4813267020ad2cad069d1a1e3fef7345df66))
* 添加canvas ([617cd81](https://github.com/SepVeneto/miniprogram-design/commit/617cd81f8085da3d88a7ac014f442870223322d7))
* 添加tabbar与router的默认行为 ([30b6cb1](https://github.com/SepVeneto/miniprogram-design/commit/30b6cb1091eec2da78a9abb584f16868c6c0f3d7))
* 修改数据更新逻辑 ([6849a05](https://github.com/SepVeneto/miniprogram-design/commit/6849a05e8203bde6e08a542b377fc692beec5346))
* 支持使用全局配置 ([3bf82e1](https://github.com/SepVeneto/miniprogram-design/commit/3bf82e14a33da7519c765d64c7bca81d7157d0ff))
* 子元素宽度完全贴合预览大小 ([e029e60](https://github.com/SepVeneto/miniprogram-design/commit/e029e603ab2695b57120b7eed36fecbc240b3aca))
* add route ([cde8030](https://github.com/SepVeneto/miniprogram-design/commit/cde80302550a1c7aaf27a453269780430afc5ef2))
* apply routes ([c6fc2d0](https://github.com/SepVeneto/miniprogram-design/commit/c6fc2d0bc84edd4e5e0f4400ece9e3b73bdcbc87))
* dynamic remote ([1751e9a](https://github.com/SepVeneto/miniprogram-design/commit/1751e9adfe2d435746f86ca3baa7c01fd3f63a55))
* dynamic set remote url ([42299c9](https://github.com/SepVeneto/miniprogram-design/commit/42299c9c347b045a8430fcdca67b999629cc572e))
* **editor:** 不限制vueuse的版本 ([6624cc6](https://github.com/SepVeneto/miniprogram-design/commit/6624cc69dc8c5a2f8e86042f6f5dff7edfcbdfc6))
* **editor:** 容器内组件支持缩放 ([9aad63a](https://github.com/SepVeneto/miniprogram-design/commit/9aad63ae231ee2ac47111ca3a429d67086ba6156))
* **editor:** 输出版本号 ([35c3fe1](https://github.com/SepVeneto/miniprogram-design/commit/35c3fe12812359bcd39de50c93960d0122ee4242))
* **editor:** 添加basic-comp ([d40a1a9](https://github.com/SepVeneto/miniprogram-design/commit/d40a1a94f6028a6584d8a7840813f779ac369313))
* **editor:** container内的元素添加默认值 ([ed281fa](https://github.com/SepVeneto/miniprogram-design/commit/ed281fa0fc87c72db6b55a83bcca625ff5bcd0ce))
* **editor:** element 中文 ([c4a4a63](https://github.com/SepVeneto/miniprogram-design/commit/c4a4a634bf758cb406221efe98e0bc48cca6d714))
* hooks ([b577b80](https://github.com/SepVeneto/miniprogram-design/commit/b577b8086e9919779b606f3b421219e28d2fe330))
* mobile operate ([eb2b2e9](https://github.com/SepVeneto/miniprogram-design/commit/eb2b2e92a11c466a95437f3f1fd738ed8f2ef162))
* **route:** back and home ([ef41075](https://github.com/SepVeneto/miniprogram-design/commit/ef41075670dadd9715eaf20e616208b39db08a89))
* schema ([75378fc](https://github.com/SepVeneto/miniprogram-design/commit/75378fc11e9038f98a013da89d3b93380ce8bde5))
* text, image ([6006263](https://github.com/SepVeneto/miniprogram-design/commit/6006263211dc925e08ce3741ae9ef1b736d93db0))


### BREAKING CHANGES

* 改为动态配置
* 组件列表的数据结构修改



## [0.5.1](https://github.com/SepVeneto/miniprogram-design/compare/0.0.1-alpha.2...0.5.1) (2023-04-23)


### Bug Fixes

* 轮播容器插入新组件无法切换 ([f7afbfd](https://github.com/SepVeneto/miniprogram-design/commit/f7afbfd16e6a6c683e9f06f63d24f71e0f1f18df))
* 双向绑定丢失 ([d0e11c0](https://github.com/SepVeneto/miniprogram-design/commit/d0e11c0cbb547ec48ad239afa1e294b1ab44edc8))
* 选择tabbar异常 ([b646413](https://github.com/SepVeneto/miniprogram-design/commit/b646413cfed359019e8d98e2d4704b91608fc04a))
* 远程容器错误使用基座的资源，异步加载配置失败 ([2df4748](https://github.com/SepVeneto/miniprogram-design/commit/2df47485ba018dab20d94883ae445d9ddd111c44))
* 组件默认数据被编辑器影响 ([54f9185](https://github.com/SepVeneto/miniprogram-design/commit/54f91858aa73739d9c872393180b18a691cfb4b4))
* **editor:** 国际化无效 ([7030ffb](https://github.com/SepVeneto/miniprogram-design/commit/7030ffbb9a98e617f1ed0388d8e1f7d1e213ba8a))
* **editor:** 组件视图初始化时，grid宽度计算错误 ([8568afc](https://github.com/SepVeneto/miniprogram-design/commit/8568afcf68e2c96982a369e8e95c4f6e5a63e114))
* **editor:** container宽度计算在存在padding时有偏差 ([1d2d670](https://github.com/SepVeneto/miniprogram-design/commit/1d2d67006b9712c7ca82bf7ae647f3313ab9edfc))
* preview无效 ([d4c5450](https://github.com/SepVeneto/miniprogram-design/commit/d4c5450c1fef9260e9a100e26be4853e9544dc21))
* **swiper:** 子组件删除后轮播不更新 ([1181eea](https://github.com/SepVeneto/miniprogram-design/commit/1181eea2b9663075b798ef7fdabb8aca5c14335a))


* feat(globalConfig)!: 支持配置 ([c0ef74b](https://github.com/SepVeneto/miniprogram-design/commit/c0ef74b4566df663fd7929e67a7da92147a62a47))
* feat(widgets)!: 分组 ([c21518d](https://github.com/SepVeneto/miniprogram-design/commit/c21518da045fd07c4978d2be8cf755f2a22a6dfd))


### Features

* 添加canvas ([617cd81](https://github.com/SepVeneto/miniprogram-design/commit/617cd81f8085da3d88a7ac014f442870223322d7))
* 添加tabbar与router的默认行为 ([30b6cb1](https://github.com/SepVeneto/miniprogram-design/commit/30b6cb1091eec2da78a9abb584f16868c6c0f3d7))
* 修改数据更新逻辑 ([6849a05](https://github.com/SepVeneto/miniprogram-design/commit/6849a05e8203bde6e08a542b377fc692beec5346))
* 支持使用全局配置 ([3bf82e1](https://github.com/SepVeneto/miniprogram-design/commit/3bf82e14a33da7519c765d64c7bca81d7157d0ff))
* 子元素宽度完全贴合预览大小 ([e029e60](https://github.com/SepVeneto/miniprogram-design/commit/e029e603ab2695b57120b7eed36fecbc240b3aca))
* add route ([cde8030](https://github.com/SepVeneto/miniprogram-design/commit/cde80302550a1c7aaf27a453269780430afc5ef2))
* apply routes ([c6fc2d0](https://github.com/SepVeneto/miniprogram-design/commit/c6fc2d0bc84edd4e5e0f4400ece9e3b73bdcbc87))
* dynamic remote ([1751e9a](https://github.com/SepVeneto/miniprogram-design/commit/1751e9adfe2d435746f86ca3baa7c01fd3f63a55))
* dynamic set remote url ([42299c9](https://github.com/SepVeneto/miniprogram-design/commit/42299c9c347b045a8430fcdca67b999629cc572e))
* **editor:** 不限制vueuse的版本 ([6624cc6](https://github.com/SepVeneto/miniprogram-design/commit/6624cc69dc8c5a2f8e86042f6f5dff7edfcbdfc6))
* **editor:** 容器内组件支持缩放 ([9aad63a](https://github.com/SepVeneto/miniprogram-design/commit/9aad63ae231ee2ac47111ca3a429d67086ba6156))
* **editor:** 输出版本号 ([35c3fe1](https://github.com/SepVeneto/miniprogram-design/commit/35c3fe12812359bcd39de50c93960d0122ee4242))
* **editor:** 添加basic-comp ([d40a1a9](https://github.com/SepVeneto/miniprogram-design/commit/d40a1a94f6028a6584d8a7840813f779ac369313))
* **editor:** container内的元素添加默认值 ([ed281fa](https://github.com/SepVeneto/miniprogram-design/commit/ed281fa0fc87c72db6b55a83bcca625ff5bcd0ce))
* **editor:** element 中文 ([c4a4a63](https://github.com/SepVeneto/miniprogram-design/commit/c4a4a634bf758cb406221efe98e0bc48cca6d714))
* hooks ([b577b80](https://github.com/SepVeneto/miniprogram-design/commit/b577b8086e9919779b606f3b421219e28d2fe330))
* mobile operate ([eb2b2e9](https://github.com/SepVeneto/miniprogram-design/commit/eb2b2e92a11c466a95437f3f1fd738ed8f2ef162))
* **route:** back and home ([ef41075](https://github.com/SepVeneto/miniprogram-design/commit/ef41075670dadd9715eaf20e616208b39db08a89))
* schema ([75378fc](https://github.com/SepVeneto/miniprogram-design/commit/75378fc11e9038f98a013da89d3b93380ce8bde5))
* text, image ([6006263](https://github.com/SepVeneto/miniprogram-design/commit/6006263211dc925e08ce3741ae9ef1b736d93db0))


### BREAKING CHANGES

* 改为动态配置
* 组件列表的数据结构修改



# [0.5.0](https://github.com/SepVeneto/miniprogram-design/compare/0.0.1-alpha.2...0.5.0) (2023-04-21)


### Bug Fixes

* 轮播容器插入新组件无法切换 ([f7afbfd](https://github.com/SepVeneto/miniprogram-design/commit/f7afbfd16e6a6c683e9f06f63d24f71e0f1f18df))
* 双向绑定丢失 ([d0e11c0](https://github.com/SepVeneto/miniprogram-design/commit/d0e11c0cbb547ec48ad239afa1e294b1ab44edc8))
* 选择tabbar异常 ([b646413](https://github.com/SepVeneto/miniprogram-design/commit/b646413cfed359019e8d98e2d4704b91608fc04a))
* 远程容器错误使用基座的资源，异步加载配置失败 ([2df4748](https://github.com/SepVeneto/miniprogram-design/commit/2df47485ba018dab20d94883ae445d9ddd111c44))
* 组件默认数据被编辑器影响 ([54f9185](https://github.com/SepVeneto/miniprogram-design/commit/54f91858aa73739d9c872393180b18a691cfb4b4))
* **editor:** 组件视图初始化时，grid宽度计算错误 ([8568afc](https://github.com/SepVeneto/miniprogram-design/commit/8568afcf68e2c96982a369e8e95c4f6e5a63e114))
* **editor:** container宽度计算在存在padding时有偏差 ([1d2d670](https://github.com/SepVeneto/miniprogram-design/commit/1d2d67006b9712c7ca82bf7ae647f3313ab9edfc))
* preview无效 ([d4c5450](https://github.com/SepVeneto/miniprogram-design/commit/d4c5450c1fef9260e9a100e26be4853e9544dc21))
* **swiper:** 子组件删除后轮播不更新 ([1181eea](https://github.com/SepVeneto/miniprogram-design/commit/1181eea2b9663075b798ef7fdabb8aca5c14335a))


* feat(globalConfig)!: 支持配置 ([c0ef74b](https://github.com/SepVeneto/miniprogram-design/commit/c0ef74b4566df663fd7929e67a7da92147a62a47))
* feat(widgets)!: 分组 ([c21518d](https://github.com/SepVeneto/miniprogram-design/commit/c21518da045fd07c4978d2be8cf755f2a22a6dfd))


### Features

* 添加canvas ([617cd81](https://github.com/SepVeneto/miniprogram-design/commit/617cd81f8085da3d88a7ac014f442870223322d7))
* 添加tabbar与router的默认行为 ([30b6cb1](https://github.com/SepVeneto/miniprogram-design/commit/30b6cb1091eec2da78a9abb584f16868c6c0f3d7))
* 修改数据更新逻辑 ([6849a05](https://github.com/SepVeneto/miniprogram-design/commit/6849a05e8203bde6e08a542b377fc692beec5346))
* 支持使用全局配置 ([3bf82e1](https://github.com/SepVeneto/miniprogram-design/commit/3bf82e14a33da7519c765d64c7bca81d7157d0ff))
* 子元素宽度完全贴合预览大小 ([e029e60](https://github.com/SepVeneto/miniprogram-design/commit/e029e603ab2695b57120b7eed36fecbc240b3aca))
* add route ([cde8030](https://github.com/SepVeneto/miniprogram-design/commit/cde80302550a1c7aaf27a453269780430afc5ef2))
* apply routes ([c6fc2d0](https://github.com/SepVeneto/miniprogram-design/commit/c6fc2d0bc84edd4e5e0f4400ece9e3b73bdcbc87))
* dynamic remote ([1751e9a](https://github.com/SepVeneto/miniprogram-design/commit/1751e9adfe2d435746f86ca3baa7c01fd3f63a55))
* dynamic set remote url ([42299c9](https://github.com/SepVeneto/miniprogram-design/commit/42299c9c347b045a8430fcdca67b999629cc572e))
* **editor:** 不限制vueuse的版本 ([6624cc6](https://github.com/SepVeneto/miniprogram-design/commit/6624cc69dc8c5a2f8e86042f6f5dff7edfcbdfc6))
* **editor:** 容器内组件支持缩放 ([9aad63a](https://github.com/SepVeneto/miniprogram-design/commit/9aad63ae231ee2ac47111ca3a429d67086ba6156))
* **editor:** 输出版本号 ([35c3fe1](https://github.com/SepVeneto/miniprogram-design/commit/35c3fe12812359bcd39de50c93960d0122ee4242))
* **editor:** 添加basic-comp ([d40a1a9](https://github.com/SepVeneto/miniprogram-design/commit/d40a1a94f6028a6584d8a7840813f779ac369313))
* **editor:** container内的元素添加默认值 ([ed281fa](https://github.com/SepVeneto/miniprogram-design/commit/ed281fa0fc87c72db6b55a83bcca625ff5bcd0ce))
* **editor:** element 中文 ([c4a4a63](https://github.com/SepVeneto/miniprogram-design/commit/c4a4a634bf758cb406221efe98e0bc48cca6d714))
* hooks ([b577b80](https://github.com/SepVeneto/miniprogram-design/commit/b577b8086e9919779b606f3b421219e28d2fe330))
* mobile operate ([eb2b2e9](https://github.com/SepVeneto/miniprogram-design/commit/eb2b2e92a11c466a95437f3f1fd738ed8f2ef162))
* **route:** back and home ([ef41075](https://github.com/SepVeneto/miniprogram-design/commit/ef41075670dadd9715eaf20e616208b39db08a89))
* schema ([75378fc](https://github.com/SepVeneto/miniprogram-design/commit/75378fc11e9038f98a013da89d3b93380ce8bde5))
* text, image ([6006263](https://github.com/SepVeneto/miniprogram-design/commit/6006263211dc925e08ce3741ae9ef1b736d93db0))


### BREAKING CHANGES

* 改为动态配置
* 组件列表的数据结构修改



## [0.1.1](https://github.com/SepVeneto/miniprogram-design/compare/0.0.1-alpha.2...0.1.1) (2022-10-28)


### Bug Fixes

* 轮播容器插入新组件无法切换 ([f7afbfd](https://github.com/SepVeneto/miniprogram-design/commit/f7afbfd16e6a6c683e9f06f63d24f71e0f1f18df))
* 选择tabbar异常 ([b646413](https://github.com/SepVeneto/miniprogram-design/commit/b646413cfed359019e8d98e2d4704b91608fc04a))
* 组件默认数据被编辑器影响 ([54f9185](https://github.com/SepVeneto/miniprogram-design/commit/54f91858aa73739d9c872393180b18a691cfb4b4))
* **swiper:** 子组件删除后轮播不更新 ([1181eea](https://github.com/SepVeneto/miniprogram-design/commit/1181eea2b9663075b798ef7fdabb8aca5c14335a))


* feat(globalConfig)!: 支持配置 ([c0ef74b](https://github.com/SepVeneto/miniprogram-design/commit/c0ef74b4566df663fd7929e67a7da92147a62a47))
* feat(widgets)!: 分组 ([c21518d](https://github.com/SepVeneto/miniprogram-design/commit/c21518da045fd07c4978d2be8cf755f2a22a6dfd))


### Features

* 添加canvas ([617cd81](https://github.com/SepVeneto/miniprogram-design/commit/617cd81f8085da3d88a7ac014f442870223322d7))
* 修改数据更新逻辑 ([6849a05](https://github.com/SepVeneto/miniprogram-design/commit/6849a05e8203bde6e08a542b377fc692beec5346))
* 支持使用全局配置 ([3bf82e1](https://github.com/SepVeneto/miniprogram-design/commit/3bf82e14a33da7519c765d64c7bca81d7157d0ff))
* schema ([75378fc](https://github.com/SepVeneto/miniprogram-design/commit/75378fc11e9038f98a013da89d3b93380ce8bde5))
* text, image ([6006263](https://github.com/SepVeneto/miniprogram-design/commit/6006263211dc925e08ce3741ae9ef1b736d93db0))


### BREAKING CHANGES

* 改为动态配置
* 组件列表的数据结构修改



# [0.1.0](https://github.com/SepVeneto/miniprogram-design/compare/0.0.1-alpha.2...0.1.0) (2022-10-28)


### Bug Fixes

* 轮播容器插入新组件无法切换 ([f7afbfd](https://github.com/SepVeneto/miniprogram-design/commit/f7afbfd16e6a6c683e9f06f63d24f71e0f1f18df))
* 选择tabbar异常 ([b646413](https://github.com/SepVeneto/miniprogram-design/commit/b646413cfed359019e8d98e2d4704b91608fc04a))
* 组件默认数据被编辑器影响 ([54f9185](https://github.com/SepVeneto/miniprogram-design/commit/54f91858aa73739d9c872393180b18a691cfb4b4))


* feat(globalConfig)!: 支持配置 ([c0ef74b](https://github.com/SepVeneto/miniprogram-design/commit/c0ef74b4566df663fd7929e67a7da92147a62a47))
* feat(widgets)!: 分组 ([c21518d](https://github.com/SepVeneto/miniprogram-design/commit/c21518da045fd07c4978d2be8cf755f2a22a6dfd))


### Features

* 添加canvas ([617cd81](https://github.com/SepVeneto/miniprogram-design/commit/617cd81f8085da3d88a7ac014f442870223322d7))
* 修改数据更新逻辑 ([6849a05](https://github.com/SepVeneto/miniprogram-design/commit/6849a05e8203bde6e08a542b377fc692beec5346))
* 支持使用全局配置 ([3bf82e1](https://github.com/SepVeneto/miniprogram-design/commit/3bf82e14a33da7519c765d64c7bca81d7157d0ff))
* schema ([75378fc](https://github.com/SepVeneto/miniprogram-design/commit/75378fc11e9038f98a013da89d3b93380ce8bde5))
* text, image ([6006263](https://github.com/SepVeneto/miniprogram-design/commit/6006263211dc925e08ce3741ae9ef1b736d93db0))


### BREAKING CHANGES

* 改为动态配置
* 组件列表的数据结构修改



## 0.0.5 (2022-09-27)



