import type { Component } from 'vue'
import { shallowRef, watch } from 'vue'
import { useDynamicScript } from './use-dynamic-script'
import { __federation_method_getRemote, __federation_method_setRemote, __federation_method_unwrapDefault } from 'virtual:__federation__'

export function useFederatedComponent(
  remoteUrl: string,
  scope: string,
  module: string,
) {
  const component = shallowRef<Component>()
  const errorLoading = shallowRef(false)
  __federation_method_setRemote(scope, {
    url: () => Promise.resolve(remoteUrl),
    format: 'var',
    from: 'webpack',
  })
  __federation_method_getRemote(scope, module)
    .then(moduleWraped => __federation_method_unwrapDefault(moduleWraped))
    .then(module => {
      component.value = module
    }).catch((err) => {
      console.error(err)
      errorLoading.value = true
    })
  return { Component: component, errorLoading }
}

export function useFederatedComponent_webpack(
  remoteUrl: string,
  scope: string,
  module: string,
) {
  const Component = shallowRef()
  // const key = `${remoteUrl}-${scope}-${module}`;
  // const { ready, errorLoading } = useDynamicScript('http://localhost:8090/remoteEntry.js');
  const { ready, errorLoading } = useDynamicScript(`${remoteUrl}/remoteEntry.js`)
  watch(ready, async (res) => {
    if (!res) return
    Component.value = (await loadComponent(scope, module)).default
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
