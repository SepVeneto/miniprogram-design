import { VersionMachine } from './fsm'
interface Upgrade {
  <T extends Record<PropertyKey, unknown>>(data: T): T
  VERSION: string
}

type BaseConfig = {
  _name: string
  _view: string
  _schema: string
  isShow: boolean
  style?: Record<string, number | string>
  [key: string]: unknown
}
export type TabbarRecord = {
  list: {
    text: string
    type: string
    _uuid: string
    [key: string]: unknown
  }[]
} & BaseConfig

export type CoreDataV1 = {
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

export const upgrade = <Upgrade>((data: CoreDataV1) => {
  const fsm = new VersionMachine(data)
  while (fsm.getVersion() !== upgrade.VERSION) {
    fsm.upgrade()
  }
  return fsm.data
})

upgrade.VERSION = '1.0'
console.log(`数据版本：${upgrade.VERSION}`)
