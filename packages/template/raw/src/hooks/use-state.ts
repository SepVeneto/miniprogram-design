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
      trigger()
      data[key] = val;
      inst && editorContext.updateConfig(inst.props.config as T)
    }
  }))
}