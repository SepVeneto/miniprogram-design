import { inject, customRef, ref, getCurrentInstance, watch } from 'vue'

export function useState<T>(data: T, key: string) {
  const inst = getCurrentInstance()
  const _data = ref()
  const editorContext = inject('Editor', { updateConfig: (data: T) => { return }})

  watch(() => data, () => {
    _data.value = data[key];
  },{ deep: true, immediate: true })

  return customRef((track, trigger) => ({
    get() {
      track()
      return _data.value
    },
    set(val) {
      // console.log('set', val)
      trigger()
      data[key] = val;
      // console.log(data === inst?.props.config)
      // // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // // @ts-ignore
      // console.log('info', data.style, inst?.props.config.style)
      inst && editorContext.updateConfig(data)
    }
  }))
}