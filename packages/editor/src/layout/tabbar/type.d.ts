export interface Tabbar {
  _uuid: string
  /**
   * @deprecated 暂时不需要使用
   */
  name?: string
  type: string
  text: string
  subTitle?: string
  isShow?: 1 | 0
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
