export interface IWidget {
  _uuid: string
  _name: string
  _view: string
  _schema: string
  _container?: 'outer' | 'inner'
  [attr: string]: any
}

export interface IWidgetTabbar {
  _uuid: string
  type: string
  text?: string
  inactiveImage?: string
  activeImage?: string
}
export interface IDesignOptions {
  name?: string
  url: string
}

export interface UploadRequestOptions {
  file: File
  [key: string]: any
}

export interface IDesignData {
  globalConfig: Record<string, any>
  body: Record<string, IWidget>
  tabbars?: IWidget & { list: IWidgetTabbar[] }
}

export type SchemaType  = 'input' | 'number' | 'checkbox' | 'image' | 'colorPicker' | 'select' | 'radioGroup' | 'editor'

export interface ISchema {
  type: SchemaType
  key: string
  label: string
  [attr: string]: any
}

export interface IDesignConfig {
  upload: (data: UploadRequestOptions) => string
  config: IDesignData
  widgets: IWidget[]
  schema: ISchema[]
}

type DataType = Record<string, any>

export function useDesign(dom: string, options: IDesignOptions): Promise<[() => IDesignData, (data: IDesignConfig) => void]>