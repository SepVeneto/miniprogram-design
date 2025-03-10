import { defineComponent, h } from 'vue-demi'
import { type PropType, watch } from 'vue-demi'
import type { EditorConfig, EditorData, EditorRoute, EditorSchema, EditorSettings, EditorWidgets } from '../index'
import { useDesign } from '../index'
import { initEmitter } from '../helper'

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
  },
  emits: [
    'mounted',
    'delete',
    'change',
    'update:modelValue',
    'selected',
  ],
  setup(props, { emit }) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [_get, _set, prepare] = useDesign(`#${props.name}`, {
      name: props.name,
      url: props.url,
      inline: props.inline,
      data: {
        upload: props.upload,
        remoteUrl: props.remoteUrl,
        config: props.modelValue,
        schema: props.schema,
        widgets: props.widgets,
        routes: props.routes,
        settings: props.settings,
      },
      mounted() {
        emit('mounted')
      },
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

    async function setData(name: string, data: any) {
      await prepare
      appEvent.emit(name, data)
    }

    watch(() => props.widgets, (val) => {
      setData('SET_WIDGETS', val)
    }, { immediate: true })

    watch(() => props.remoteUrl, (val) => {
      setData('SET_REMOTE_URL', val)
    }, { immediate: true })

    watch(() => props.settings, (val) => {
      setData('SET_SETTINGS', val)
    }, { immediate: true })

    watch(() => props.schema, (val) => {
      setData('SET_SCHEMA', val)
    }, { immediate: true })

    watch(() => props.routes, (val) => {
      setData('SET_ROUTES', val)
    }, { immediate: true })

    watch(() => props.modelValue, (val) => {
      setData('SET_CONFIG', val)
    }, { immediate: true })
  },
  render() {
    return h('div', { id: this.name })
  },
})
