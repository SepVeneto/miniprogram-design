import microApp from '@micro-zoe/micro-app'
import { Emitter } from './emitter'
import type { EditorWidget } from 'src'

type EmitConfig = {
  SET_CONFIG?: (val: EditorWidget) => void
  SET_DELETE?: (val: EditorWidget) => void
  SET_SELECTED?: (val: EditorWidget) => void
}

export function initEmitter(config?: EmitConfig) {
  const baseEvent = new Emitter()
  const appEvent = new Emitter()

  baseEvent.on('SET_CONFIG', (val: EditorWidget) => {
    config?.SET_CONFIG?.(val)
  })
  baseEvent.on('SET_DELETE', (val: EditorWidget) => {
    config?.SET_DELETE?.(val)
  })
  baseEvent.on('SET_SELECTED', (val: EditorWidget) => {
    config?.SET_SELECTED?.(val)
  })

  microApp.setGlobalData({
    BASE_EMITTER: baseEvent,
    MPD_EMITTER: appEvent,
  })

  return { baseEvent, appEvent }
}
