export interface Tabbar {
  _uuid: string
  id: number
  name: string
  subTitle: string
  text: string
  activeColor?: string
  inactiveColor?: string
  activeImage?: string
  inactiveImage?: string
}

export interface TabbarWidgetConfig {
  _uuid: string
  list: Tabbar[]
  hidden?: boolean
}
