import { ref } from 'vue'

type RemoteState = 'init' | 'finish' | 'error' | undefined

export function useDynamicScript(url: string) {
  const ready = ref(false)
  const errorLoading = ref(false)

  let element: HTMLScriptElement | null = window.document.querySelector('[data-remote]')
  let state: RemoteState
  if (element) {
    state = element.dataset.remote as RemoteState
  } else {
    element = window.document.createElement('script')
    element.src = url
    element.type = 'text/javascript'
    element.async = true
    element.dataset.remote = 'init'
    document.head.appendChild(element)
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
