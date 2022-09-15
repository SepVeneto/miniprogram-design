import { inject, customRef, ref, watchEffect, getCurrentInstance, useAttrs, triggerRef, watch } from 'vue'

export function useState(data: any, key: string) {
  const inst = getCurrentInstance()
  const _data = ref()
  const editorContext = inject('Editor', { updateConfig: (data: any) => { return }})

  watch(() => data, (val) => {
    _data.value = data[key];
  },{ deep: true, immediate: true })
  // watchEffect(() => {
  //   console.log('effect', data)
  //   _data.value = data
  // })

  return customRef((track, trigger) => ({
    get() {
      track()
      return _data.value
    },
    set(val) {
      trigger()
      data[key] = val;
      inst && editorContext.updateConfig(inst.props.config)
      // attrs.config
      // console.log('trigger', data)
    }
  }))
}