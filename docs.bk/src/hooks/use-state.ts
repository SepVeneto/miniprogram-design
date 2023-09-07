import {
  inject,
  customRef,
  ref,
  getCurrentInstance,
  watch,
  InjectionKey,
} from 'vue';

const editorContextKey: InjectionKey<{
  updateConfig: (_data: Record<string, any>) => { /** empty */ }
}> = Symbol('Editor');

export function useState<T extends Record<string, any>> (data: T, key: string) {
  const inst = getCurrentInstance();
  const _data = ref();
  const editorContext = inject(editorContextKey, undefined);

  watch(() => data, () => {
    _data.value = data[key];
  }, { deep: true, immediate: true });

  return customRef((track, trigger) => ({
    get () {
      track();
      return _data.value;
    },
    set (val) {
      // console.log('set', val)
      trigger();
      // @ts-expect-error: normal
      data[key] = val;
      // console.log(data === inst?.props.config)
      // // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // // @ts-ignore
      // console.log('info', data.style, inst?.props.config.style)
      inst && editorContext?.updateConfig(data);
    },
  }));
}
