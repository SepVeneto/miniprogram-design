import { CSSProperties } from "vue"

interface WidgetConfig {
  order: number
  style: CSSProperties
  isShow: boolean
  uuid: string
  type: string
}

export interface GlobalConfig {
  color: string
  emptyColor: string
  bubbleColor: string
  loginBg: string
  title: string
}

export interface MenuIcon {
  defaultImg: string
  title: string
  desc: string
  width: number
  height: number
}

export interface Tabbar {
  id: number
  type: string
  text: string
  activeColor: string
  activeImage: string
  inactiveImage: string
  subTitle: string
}

export interface CardWidgetConfig extends WidgetConfig {
  defaultImg: string
}

export interface MenuWidgetConfig extends WidgetConfig {
  childrens: MenuIcon[]
}

export interface ShopWidgetConfig extends WidgetConfig {
  defaultImg: string
  url: string
}

export interface TabbarWidgetConfig {
  uuid: string
  type: string
  list: Tabbar[]
}
