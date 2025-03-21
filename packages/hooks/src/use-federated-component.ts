import { defineAsyncComponent, h, shallowRef, watch } from 'vue'
import { useDynamicScript } from './use-dynamic-script'

export function useFederatedComponent(
  remoteUrl: string,
  scope: string,
  module: string,
) {
  const Component = shallowRef()
  const { ready, errorLoading } = useDynamicScript(`${remoteUrl}/remoteEntry.js`)
  watch(ready, async (res) => {
    if (!res) return
    Component.value = defineAsyncComponent({
      loader: () => loadComponent(scope, module),
      loadingComponent: () => h('div', '加载中...'),
      onError(error, retry, fail) {
        console.error(error)
        fail()
      },
    })
  }, { immediate: true })
  return { Component, errorLoading }
}

async function loadComponent(scope: string, module: string) {
  // @ts-expect-error: mdf
  await __webpack_init_sharing__('default')
  // @ts-expect-error: mdf
  const container = window[scope]
  // @ts-expect-error: mdf
  await container.init(__webpack_share_scopes__.default)
  // @ts-expect-error: mdf
  const factory = await window[scope].get(module)
  const Module = factory()
  return Module
  // }
}
