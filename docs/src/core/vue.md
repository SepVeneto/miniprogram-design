---
outline: deep
---

# 与vue组合使用

```html
<html>
  <VueEditor
    v-model="config"
    url="http://localhost:8082"
    remote-url="http://localhost:8090"
    :widgets="widgets"
    @selected="handleSelected"
    @delete="handleDelete"
    @mounted="onMount"
  />
</html>
<script setup>
import { VueEditor } from '@sepveneto/mpd-core/vue'
</script>
```

## 属性
| 名称 | 类型 | 必填 | 默认值 | 可选项 | 说明 |
| :--- | :-- | :--- | :---- | :----- | :--- |
| name | string | ❌ | miniprogram-design | - | 组件名称，需要唯一 |
| url | string | ✅ | - | - | 编辑器的远程地址 |
| remoteUrl | string | ✅ | - | - | 视图组件的远程地址 |
| inline | boolean | ❌ | false | - | js是否内联，一般用于调试 |
| v-model/modelValue | EditorConfig | ❌ | <Desc desc="{ globalConfig: {}, body: {}, }">object</Desc> | - | 编辑器的数据 |
| upload | function | ❌ | - | - | 文件上传的方法，如果不涉及可不配置 |
| schema | EditorSchema | ❌ | Object | - | 组件的配置项 |
| widgets | EditorWidgets | ❌ | Array | - | 可配置的组件列表 |
| routes | EditorRoute[] | ❌ | <Desc desc="[{ name: 'Home', path: '/' }]">Array</Desc> | - | 编辑器路由，如果是单页的不需要配置 |
| settings | EditorSettings | ❌ | Object | - | 对选中项或编辑器的操作限制，详见下方 |

### EditorSettings
| 名称 | 说明 |
| :--- | :--- |
| disabledAdd | 是否允许向编辑器中添加新的组件，禁用后左侧组件列表将消失 |
| disabledItem | 选中项将被禁用的操作<br>delete: 是否禁用删除<br>sort: 是否禁用拖曳排序<br>custom: 是否禁用自定义模板 |

## 方法
| 名称 | 说明 |
| :--- | :--- |
| clearSelected | 清除编辑器当前的选中项 |
