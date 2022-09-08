import { CSSProperties } from "vue"

interface WidgetConfig {
  order: number
  style: CSSProperties
  isShow: number
  uuid: string
  type: string
  _name: string
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


type Base = {
  _uuid: string
  _name: string
  isShow: boolean
  type: string
  style: CSSProperties
}

interface Card extends Base {
  defaultImg: string
}
interface Shop extends Base {
  defaultImg: string
  url: string
}
interface Explain extends Base {
  defaultImg: string
}
interface Mine extends Card {
  unbound: boolean
  recharge: boolean
}
type Theme = {
  color: string
  emptyColor: string
  bubbleColor: string
  loginBg: string
}

type Tabbar = {
  _uuid: string
  _name: string
  type: 'home' | 'personal',
  inactiveImage: string
  activeImage: string
  text: string
}
interface Container extends Base {
  list: Base[]
}

interface MenuItem extends Base {
  name: string
  defaultImg: string
}
interface Reserve extends Card {
  title: {
    content: string,
    style: CSSProperties
  },
  desc: {
    content: string,
    style: CSSProperties
  }
}

type Home = Array<Card | Shop | Explain | Container>
type Personal = Array<Mine | MenuItem[]>

type Config = {
  globalConfig: Theme
  body: {
    home: Home,
    personal: Personal,
  },
  tabbars: Tabbar[]
}