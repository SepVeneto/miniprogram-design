declare module 'virtual:__federation__' {
  type RemoteConfig = {
    url: (...args: any) => Promise<string>
    format?: import('@originjs/vite-plugin-federation').RemotesConfig['format']
    from?: import('@originjs/vite-plugin-federation').RemotesConfig['from']
  }
  function __federation_method_getRemote(remoteName: string, componentName: string): Promise<import('vue').Component>
  function __federation_method_setRemote(remoteName: string, remoteConfig: RemoteConfig): void
  function __federation_method_ensure(remoteId: string): Promise<unknown>
  function __federation_method_unwrapDefault(module: import('vue').Component): import('vue').Component
  function __federation_method_wrapDefault(module: Module, need: boolean): Module
}

