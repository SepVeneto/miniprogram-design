declare module '*.png' {
  const value: string;
  export = value
}
interface Window {
  mount: () => void
  unmount: () => void
}

declare var __EDITOR_VERSION__: string
declare var __VR_VERSION__: string
declare var __BC_VERSION__: string