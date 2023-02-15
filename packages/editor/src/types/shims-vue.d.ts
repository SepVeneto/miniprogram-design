/* eslint-disable */
declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component

  interface ComponentCustomProps {
    [key: string]: any
  }
}

declare module "*.svg" {
  const src: string
  export default src
}