import { defineComponent, h, onMounted, ref, watchEffect } from 'vue-demi'
import { type PropType } from 'vue-demi'
import type { EditorConfig, EditorData, EditorRoute, EditorSchema, EditorSettings, EditorWidgets } from '../index'
import { initEmitter } from '../helper'
import microApp, { renderApp } from '@micro-zoe/micro-app'

export default defineComponent({
  props: {
    name: {
      type: String,
      default: 'miniprogram-design',
    },
    url: {
      type: String,
      required: true,
    },
    inline: Boolean,
    modelValue: {
      type: Object as PropType<EditorConfig>,
      default: () => ({
        globalConfig: {},
        body: {},
      }),
    },
    upload: {
      type: Function as PropType<EditorData['upload']>,
      default: () => ({}),
    },
    remoteUrl: {
      type: String,
      required: true,
    },
    schema: {
      type: Object as PropType<EditorSchema>,
      default: () => ({}),
    },
    widgets: {
      type: Array as PropType<EditorWidgets>,
      default: () => ([]),
    },
    routes: {
      type: Array as PropType<EditorRoute[]>,
      default: () => ([{ name: 'Home', path: '/' }]),
    },
    settings: {
      type: Object as PropType<EditorSettings>,
      default: () => ({}),
    },
    extra: {
      type: Object as PropType<Record<string, any>>,
      default: () => ({}),
    },
  },
  emits: [
    'mounted',
    'delete',
    'change',
    'update:modelValue',
    'selected',
  ],
  expose: ['clearSelected'],
  setup(props, { emit, expose }) {
    const isPrepare = ref(false)
    microApp.addDataListener(props.name, (val: any) => {
      const { event } = val
      if (event === 'mounted') {
        emit('mounted')
        isPrepare.value = true
      }
    })
    onMounted(() => {
      renderApp({
        name: props.name,
        url: props.url,
        container: `#${props.name}`,
        inline: props.inline,
        'disable-patch-request': true, // 关闭对子应用请求的拦截
        'disable-memory-router': true, // 关闭虚拟路由
        data: {
          upload: props.upload,
          remoteUrl: props.remoteUrl,
          ...props.extra,
        },
      })
    })

    const { appEvent } = initEmitter({
      SET_CONFIG(val) {
        emit('update:modelValue', val)
        emit('change', val)
      },
      SET_SELECTED(val) {
        emit('selected', val)
      },
      SET_DELETE(val) {
        emit('delete', val)
      },
    })

    watchEffect(() => {
      isPrepare.value && setData('SET_WIDGETS', props.widgets)
    })
    watchEffect(() => {
      isPrepare.value && setData('SET_REMOTE_URL', props.remoteUrl)
    })

    watchEffect(() => {
      isPrepare.value && setData('SET_SETTINGS', props.settings)
    })

    watchEffect(() => {
      isPrepare.value && setData('SET_SCHEMA', props.schema)
    })
    watchEffect(() => {
      isPrepare.value && setData('SET_ROUTES', props.routes)
    })
    watchEffect(() => {
      isPrepare.value && setData('SET_CONFIG', props.modelValue)
    })

    async function setData(name: string, data?: any) {
      appEvent.emit(name, data)
    }

    expose({
      clearSelected() {
        setData('CLEAR_SELECTED')
      },
    })

    return () => h('div', { id: props.name })
  },
})
