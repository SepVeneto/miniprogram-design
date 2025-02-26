<script lang="ts">
import type { PropType, ShallowRef, VNode } from 'vue'
import { defineAsyncComponent, defineComponent, h, watch, withModifiers } from 'vue'
import OssUpload from './components/ossUpload.vue'
import { useFederatedComponent } from '@sepveneto/mpd-hooks'
import { QuestionFilled } from '@element-plus/icons-vue'
import SizeBox from './components/SizeBox.vue'
import {
  ElCheckbox,
  ElColorPicker,
  ElConfigProvider,
  ElForm,
  ElFormItem,
  ElIcon,
  ElInput,
  ElInputNumber,
  ElOption,
  ElRadio,
  ElRadioGroup,
  ElSelect,
  ElSwitch,
  ElTooltip,
} from 'element-plus'

// import ConfigRender from 'widgets_side/configRender';
// import rInput from './input.vue'
// import rCheckbox from './'
type WidgetType = 'input'
  | 'number'
  | 'checkbox'
  | 'image'
  | 'colorPicker'
  | 'select'
  | 'radioGroup'
  | 'editor'
  | 'box'
  | 'switch'
type BoxModel = 'marginLeft'
| 'marginTop'
| 'marginRight'
| 'marginBottom'
| 'paddingLeft'
| 'paddingTop'
| 'paddingRight'
| 'paddingBottom'
| 'borderLeft'
| 'borderTop'
| 'borderBottom'
| 'borderight'

type WidgetOther = {
  type: Exclude<WidgetType, 'box'>
  label?: string
  key: string
  tips?: string
  link?: Record<string, WidgetOther[]>
  _inContainer?: 'outer' | 'inner'
  onChange: (data: any) => void,
  [attr: string]: any
}
type WidgetBox = {
  type: Omit<WidgetType, 'box'>
  _inContainer?: 'outer' | 'inner'
  include?: BoxModel[]
  exclude?: BoxModel[]
}

export type ISchema = WidgetOther | WidgetBox

export default defineComponent({
  name: 'SchemaContainer',
  components: {
    // ConfigRender,
    QuestionFilled,
    OssUpload,
    ElForm,
    ElFormItem,
  },
  props: {
    modelValue: {
      type: Object,
      default: () => ({}),
    },
    schema: {
      type: Array as PropType<ISchema[]>,
      default: () => ([]),
    },
    remoteUrl: {
      type: String,
      required: true,
    },
    disabledWhenWithout: Boolean,
  },
  emits: ['update:modelValue'],
  setup(prop, { emit }) {
    let ConfigRender: ShallowRef<any>
    watch(() => prop.remoteUrl, (url) => {
      if (!url) return
      const { Component } = useFederatedComponent(
        url,
        'widgets',
        './configRender',
      )
      ConfigRender = Component
    }, { immediate: true })

    function updateData(key: string, val: unknown) {
      const path = key.split('.')
      const _path = path.slice(0, -1)
      const parent = path.length === 1
        ? prop.modelValue
        : _path.reduce((obj, curr) => {
          return obj[curr]
        }, prop.modelValue)
      parent[path.slice(-1)[0]] = val
      emit('update:modelValue', prop.modelValue)
    }
    function getData(data: Record<string, any>, key: string): any {
      const path = key.split('.')
      if (path.length === 1) {
        return data[key]
      }
      // 自动补全数据结构
      const res = path.reduce((obj, curr, index) => {
        if (!obj[curr] && index !== path.length - 1) {
          obj[curr] = {}
        }
        return obj[curr] == null ? '' : obj[curr]
      }, data)
      return res
    }
    function normalizeStyle(type: 'margin' | 'padding' | 'border', list: number[]) {
      const [top, right, bottom, left] = list
      updateData(`style.${type}Top`, top)
      updateData(`style.${type}Right`, right)
      updateData(`style.${type}Bottom`, bottom)
      updateData(`style.${type}Left`, left)
    }

    function renderSwitch(schema: WidgetOther) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { type, label, key, ...args } = schema
      return h(ElSwitch, {
        'model-value': getData(prop.modelValue, key),
        'onUpdate:modelValue': (val) => updateData(key, val),
        ...args,
      })
    }
    function renderCheckbox(schema: WidgetOther) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { type, label, key, ...args } = schema
      return h(ElCheckbox, {
        'model-value': getData(prop.modelValue, key),
        'onUpdate:modelValue': (val) => updateData(key, val),
        ...args,
      })
    }
    function renderInput(schema: WidgetOther) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { type, label, key, originType, onInput, ...args } = schema
      return h(ElInput, {
        'model-value': getData(prop.modelValue, key),
        onInput: (val: string) => {
          updateData(key, val)
        },
        type: originType,
        ...args,
      })
    }
    function renderNumber(schema: WidgetOther) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { type, label, key, unit, onChange, ...args } = schema
      return h(ElInputNumber, {
        modelValue: getData(prop.modelValue, key),
        valueOnClear: null,
        onChange: (val) => updateData(key, Number(val)),
        ...args,
      })
    }
    function renderImage(schema: WidgetOther) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { type, label, key, ...args } = schema
      return h(OssUpload, {
        'model-value': getData(prop.modelValue, key),
        'onUpdate:modelValue': (val: string) => updateData(key, val),
        ...args,
      })
    }
    function renderColorPicker(schema: WidgetOther) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { type, label, key, ...args } = schema
      return h(ElColorPicker, {
        'model-value': getData(prop.modelValue, key) as string,
        'onUpdate:modelValue': (val) => updateData(key, val),
        ...args,
      })
    }
    function renderSelect(schema: WidgetOther) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { type, label, key, options = [], ...args } = schema
      const optionList = options.map((option: any) => h(ElOption, {
        label: option.label,
        value: option.value,
      }))
      return h(ElSelect, {
        'model-value': getData(prop.modelValue, key),
        'onUpdate:modelValue': (val: string) => updateData(key, val),
        ...args,
      }, () => optionList)
    }
    function renderRadioGroup(schema: WidgetOther) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { type, label, key, options = [], ...args } = schema
      const optionList = options.map((option: any) => h(ElRadio, {
        value: option.value,
      }, () => option.label))
      return h(ElRadioGroup, {
        'model-value': getData(prop.modelValue, key),
        'onUpdate:modelValue': (val) => updateData(key, val),
        ...args,
      }, () => optionList)
    }
    function renderEditor(schema: WidgetOther) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { type, label, key, ...args } = schema
      const RichTextEditor = defineAsyncComponent(
        () => import(/* webpackChunkName: "richEditor" */ './components/editor.vue'),
      )
      return h(RichTextEditor, {
        'model-value': getData(prop.modelValue, key),
        'onUpdate:modelValue': (val: string) => updateData(key, val),
        ...args,
      })
    }
    function renderCustom(schema: WidgetOther) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { type, label, key, ...args } = schema
      return ConfigRender.value
        ? h(ConfigRender.value, {
          ...args,
          type,
          modelValue: getData(prop.modelValue, key),
          'onUpdate:modelValue': (val: unknown) => updateData(key, val),
          config: prop.modelValue,
        })
        : null
    }
    function renderLabel(schema: WidgetOther) {
      if (schema.tips) {
        return h('span', {
          style: 'display: flex; align-items: center;',
        }, [schema.label, h(ElTooltip, { content: schema.tips }, () => h(ElIcon, { style: 'margin-left: 6px;' }, () => h(QuestionFilled)))],
        )
      } else {
        return schema.label ? h('span', schema.label) : null
      }
    }
    function renderBox(schema: WidgetBox) {
      const { include, exclude } = schema
      if (!('style' in prop.modelValue)) {
        updateData('style', {})
      }
      const {
        marginLeft,
        marginTop,
        marginBottom,
        marginRight,
        paddingLeft,
        paddingTop,
        paddingBottom,
        paddingRight,
        borderLeft,
        borderTop,
        borderBottom,
        borderRight,
        width,
        height,
      } = getData(prop.modelValue, 'style')
      const _exclude = prop.modelValue._fromContainer ? ['width'] : []
      _exclude.push(...(exclude || []))
      return h(SizeBox, {
        include,
        exclude: _exclude,
        margin: [marginTop, marginRight, marginBottom, marginLeft],
        'onUpdate:margin': val => normalizeStyle('margin', val),
        padding: [paddingTop, paddingRight, paddingBottom, paddingLeft],
        'onUpdate:padding': val => normalizeStyle('padding', val),
        border: [borderTop, borderRight, borderBottom, borderLeft],
        'onUpdate:border': val => normalizeStyle('border', val),
        width,
        'onUpdate:width': val => updateData('style.width', val),
        height,
        'onUpdate:height': val => updateData('style.height', val),
      })
    }
    function allowContainer(item: ISchema) {
      const { _fromContainer } = prop.modelValue
      let flag
      if (_fromContainer) {
        flag = item._inContainer === 'inner' || !item._inContainer
      } else {
        flag = item._inContainer === 'outer' || !_fromContainer
      }
      return flag
    }
    return {
      // schemaList,
      updateData,
      getData,

      renderBox,
      renderInput,
      renderNumber,
      renderSwitch,
      renderCheckbox,
      renderImage,
      renderColorPicker,
      renderSelect,
      renderRadioGroup,
      renderEditor,
      renderCustom,
      renderLabel,
      allowContainer,
    }
  },
  render() {
    const wrapper = (schema: ISchema): VNode[] => {
      const form: VNode[] = []
      let node: VNode | null
      switch (schema.type) {
        case 'switch':
          node = this.renderSwitch(schema as WidgetOther)
          break
        case 'box':
          node = this.renderBox(schema)
          break
        case 'input':
          node = this.renderInput(schema as WidgetOther)
          break
        case 'number':
          node = this.renderNumber(schema as WidgetOther)
          break
        case 'checkbox':
          node = this.renderCheckbox(schema as WidgetOther)
          break
        case 'image':
          node = this.renderImage(schema as WidgetOther)
          break
        case 'colorPicker':
          node = this.renderColorPicker(schema as WidgetOther)
          break
        case 'select':
          node = this.renderSelect(schema as WidgetOther)
          break
        case 'radioGroup':
          node = this.renderRadioGroup(schema as WidgetOther)
          break
        case 'editor':
          node = this.renderEditor(schema as WidgetOther)
          break
        default:
          node = this.renderCustom(schema as WidgetOther)
          // node = <div>暂不支持</div>;
      }

      const _schema = schema as WidgetOther
      if (_schema.link) {
        const key = this.getData(this.modelValue, _schema.key)
        _schema.link[key]?.forEach(item => {
          form.push(...wrapper(item))
        })
      }
      return [
        h(ElFormItem, {
          'label-width': _schema.label ? '' : '0px',
          style: { display: _schema._hidden && 'none' },
        }, {
          default: () => node,
          label: () => this.renderLabel(schema as WidgetOther),
        }),
        ...form,
      ]
    }
    const formItem = () => h(ElForm, {
      'label-width': '100px',
      onSubmit: withModifiers(() => { /* pass */ }, ['prevent']),
    }, () => this.schema.filter(item => this.allowContainer(item)).map(item => {
      return wrapper(item)
    }),
    )
    return h(ElConfigProvider, { namespace: 'mpd' }, formItem)
  },
})
</script>
