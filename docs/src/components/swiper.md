# Swiper

编辑器预设的基本轮播组件

只是简单的实现了轮播的手动切换展示，考虑到手动切换会占用鼠标事件，对拖曳功能有影响，因此只有在预览模式才可以使用轮播的手动切换。

如果需要对轮播的顺序进行调整，目前只能通过[自定义配置](/editor/schema#自定义)来自己实现排序功能，比如[vueuse/useSortable](https://vueuse.org/integrations/useSortable/#usesortable)

## 使用

```json
{
  "name": "轮播",
  "_view": "swiper",
  "_schema": "swiper",
}
```
