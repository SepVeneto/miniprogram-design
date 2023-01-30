import { shallowRef, watch } from 'vue';
import { useDynamicScript } from './use-dynamic-script';
import { useApp } from '@/store';

export function useFederatedComponent (
  scope: string,
  module: string,
) {
  const appStore = useApp();
  const Component = shallowRef();
  // const key = `${remoteUrl}-${scope}-${module}`;
  // const { ready, errorLoading } = useDynamicScript('http://localhost:8090/remoteEntry.js');
  const { ready, errorLoading } = useDynamicScript(`${appStore.remoteUrl}/remoteEntry.js`);
  watch(ready, async () => {
    Component.value = (await loadComponent(scope, module)).default;
  });
  return { Component, errorLoading };
}

async function loadComponent (scope: string, module: string) {
  // @ts-expect-error: dynamic remote mdf
  await __webpack_init_sharing__('default');
  // @ts-expect-error: mdf
  const container = window[scope];
  // @ts-expect-error: mdf
  await container.init(__webpack_share_scopes__.default);
  // @ts-expect-error: mdf
  const factory = await window[scope].get(module);
  const Module = factory();
  return Module;
  // }
}
