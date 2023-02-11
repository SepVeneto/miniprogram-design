export interface Tabbar {
  _uuid: string
  type: string
  text: string
  activeColor: string
  activeImage: string
  inactiveImage: string
  subTitle: string
}

export interface TabbarWidgetConfig {
  uuid: string
  type: string
  list: Tabbar[]
}
