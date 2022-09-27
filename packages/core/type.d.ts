export interface IDesignOptions {
  name?: string
  url: string
}

type DataType = Record<string, any>

export function useDesign(dom: string, options: IDesignOptions): Promise<[() => DataType, (data: DataType) => void]>