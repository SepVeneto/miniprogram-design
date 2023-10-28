import { ref } from 'vue'

type RemoteState = 'init' | 'finish' | 'error' | undefined
let init = false
let element: HTMLScriptElement | null
export function useDynamicScript(url: string) {
  const ready = ref(false)
  const errorLoading = ref(false)

  let state: RemoteState
  if (element) {
    state = element.dataset.remote as RemoteState
  } else {
    element = document.createElement('script')
    element.src = url
    element.type = 'text/javascript'
    element.async = true
    element.dataset.remote = 'init'
    // 添加节点是异步的，初始化的时候不能保证第二次触发时能从dom上获得
    if (!init) {
      document.head.appendChild(element)
    } else {
      init = true
    }
  }

  switch (state) {
    case 'finish':
      ready.value = true
      errorLoading.value = false
      break
    case 'error':
      ready.value = false
      errorLoading.value = true
      break
    case 'init':
    default:
      element.addEventListener('load', () => {
        element!.dataset.remote = 'finish'
        ready.value = true
      })
      element.addEventListener('error', () => {
        element!.dataset.remote = 'error'
        ready.value = false
        errorLoading.value = true
      })
  }

  return { ready, errorLoading }
}
