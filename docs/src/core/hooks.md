---
outline: deep
---
# hooks使用

## useDesign

如果是通过微前端接入编辑器，需要通过这个api将其挂载到指定的dom上

```ts
useDesign: (dom: string | Element, options: DesignOptions) => DesignReturn
```

::: details DesignOptions
```ts
type DesignOptions = {
  /**
   * 编辑器部署的地址 
   */
  url: string
  /**
   * 挂载的子应用的名称(全局唯一)
   */
  name: string
  /**
   * 是否使用内联script方式执行js
   */
  inline: boolean
  /**
   * 传递给编辑器的数据
   */
  data?: EditorData
  /**
   * 编辑器完全加载完成的回调
   */
  mounted?: () => void
} & MicroAppConfig

interface EditorData {
  /**
   * 需要自行实现文件、图片上传
   */
  upload?: (data: UploadRequestOptions) => Promise<string>
  /**
   * 组件视图的可访问地址
   */
  remoteUrl?: string
  /**
   * 编辑器数据
   */
  config: EditorConfig
  /**
   * 组件的配置项
   */
  schema?: EditorSchema
  /**
   * 可配置的组件列表
   */
  widgets?: {
    name: string
    group: EditorWidget[]
  }[]
  /**
   * 编辑器的路由
   */
  routes?: EditorRoute[]
  /**
   * 编辑器配置
   */
  settings?: EditorSettings
}
```
除了上述属性，还兼容了[MicroAppConfig](https://micro-zoe.com/docs/1.x/#/zh-cn/api?id=renderapp)


::: code-group
```ts [EditorConfig]
interface EditorConfig {
  version?: string
  globalConfig: Record<PropertyKey, unknown>
  body: Record<PropertyKey, unknown>
  tabbars?: Record<PropertyKey, unknown>
}
```
```ts [EditorSchema]
type WidgetType = 'input'
  | 'number'
  | 'checkbox'
  | 'image'
  | 'colorPicker'
  | 'select'
  | 'radioGroup'
  | 'editor'
type ISchema = {
  type: WidgetType | string
  label: string
  key: string
  link?: Record<string, ISchema[]>
  [attr: string]: any
}
interface EditorSchema = {
  globalConfig: ISchema[]
  [key: string]: ISchema[]
}
```
```ts [EditorWidget]
interface EditorWidget {
  name: string
  group: EditorWidget[]
}
```
```ts [EditorRoute]
interface EditorRoute {
  name: string
  path: string
  meta?: Record<PropertyKey, unknown> & { title?: string }
}
```
```ts [EditorSettings]
interface EditorSettings {
  disabledItem?: (widget: EditorWidget) => (boolean | {
    // 是否禁用选中项的删除按钮
    delete?: boolean,
    // 是否允许编辑器内的拖曳排序
    sort?: boolean,
    // 是否禁用选中项的模板自定义
    custom?: boolean,
  })
  disableAdd?: boolean
}
:::

::: details DesignReturn
```ts
type get = () => EditorConfig | null
type set = (data: EditorData) => void

type DesignReturn = [get, set]
```
:::

## upgrade

当编辑器的数据结构发生变更时，需要通过这个api对`config`进行升级

```ts
type upgrade = (data: CoreDataV1) => Record<PropertyKey, unknown>

type CoreDataV1 = {
  version?: string
  globalConfig: {
    color: string
    emptyColor: string
    bubbleColor: string
    loginBg: string
  }
  body: Record<string, BaseConfig[]>
  tabbars?: TabbarRecord
  mpGlobalConfig: Record<string, unknown>
}
```
