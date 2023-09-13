import type { PropType, ShallowRef } from 'vue'
import { defineAsyncComponent, defineComponent, watch } from 'vue'
import ossUpload from './components/ossUpload.vue'
import { useFederatedComponent } from '@sepveneto/mpd-hooks'
import { QuestionFilled } from '@element-plus/icons-vue'
import SizeBox from './components/SizeBox.vue'

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
    OssUpload: ossUpload,
    RichTextEditor: defineAsyncComponent(
      () => import('./components/editor.vue'),
    ),
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
  },
  emits: ['update:modelValue'],
  setup(prop, { emit }) {
    let ConfigRender: ShallowRef<any>
    watch(() => prop.remoteUrl, (url) => {
      if (!url) return
      const { Component } = useFederatedComponent(
        url,
        'widgets_side',
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
    function getData(data: Record<string, any>, key: string) {
      const path = key.split('.')
      return path.reduce((obj, curr) => {
        return obj[curr]
      }, data)
    }
    function normalizeStyle(type: 'margin' | 'padding' | 'border', list: number[]) {
      const [top, right, bottom, left] = list
      updateData(`style.${type}Top`, top)
      updateData(`style.${type}Right`, right)
      updateData(`style.${type}Bottom`, bottom)
      updateData(`style.${type}Left`, left)
    }
    function renderCheckbox(schema: WidgetOther) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { type, label, key, ...args } = schema
      return (
        <el-checkbox
          model-value={getData(prop.modelValue, key)}
          onUpdate:modelValue={(val: string) => updateData(key, val)}
          {...args}
        />
      )
    }
    function renderInput(schema: WidgetOther) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { type, label, key, originType, ...args } = schema
      return (
        <el-input
          model-value={getData(prop.modelValue, key)}
          onUpdate:modelValue={(val: string) => updateData(key, val)}
          type={originType}
          {...args}
        />
      )
    }
    function renderNumber(schema: WidgetOther) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { type, label, key, unit, ...args } = schema
      return (
        <el-input-number
          model-value={getData(prop.modelValue, key)}
          value-on-clear={null}
          onUpdate:modelValue={(val: string) => updateData(key, Number(val))}
          {...args}
        />
      )
    }
    function renderImage(schema: WidgetOther) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { type, label, key, ...args } = schema
      return (
        <oss-upload
          model-value={getData(prop.modelValue, key)}
          onUpdate:modelValue={(val: string) => updateData(key, val)}
          {...args}
        />
      )
    }
    function renderColorPicker(schema: WidgetOther) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { type, label, key, ...args } = schema
      return (
        <el-color-picker
          model-value={getData(prop.modelValue, key)}
          onUpdate:modelValue={(val: string) => updateData(key, val)}
          {...args}
        />
      )
    }
    function renderSelect(schema: WidgetOther) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { type, label, key, options = [], ...args } = schema
      return (
        <el-select
          model-value={getData(prop.modelValue, key)}
          onUpdate:modelValue={(val: string) => updateData(key, val)}
          {...args}
        >
          {options.map((option: any) => (
            <el-option label={option.label} value={option.value} />
          ))}
        </el-select>
      )
    }
    function renderRadioGroup(schema: WidgetOther) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { type, label, key, options = [], ...args } = schema
      return (
        <el-radio-group
          model-value={getData(prop.modelValue, key)}
          onUpdate:modelValue={(val: string) => updateData(key, val)}
          {...args}
        >
          {options.map((option: any) => (
            <el-radio label={option.value}>{option.label}</el-radio>
          ))}
        </el-radio-group>
      )
    }
    function renderEditor(schema: WidgetOther) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { type, label, key, ...args } = schema
      return (
        <rich-text-editor
          model-value={getData(prop.modelValue, key)}
          onUpdate:modelValue={(val: string) => updateData(key, val)}
          {...args}
        />
      )
    }
    function renderCustom(schema: WidgetOther) {
      const { type, key } = schema
      return ConfigRender.value
        ? (
          <ConfigRender.value
            type={type}
            modelValue={getData(prop.modelValue, key)}
            onUpdate:modelValue={(val: unknown) => updateData(key, val)}
          />
          )
        : null
    }
    function renderLabel(schema: WidgetOther) {
      if (schema.tips) {
        return (
          <span style="display: flex; align-items: center;">{schema.label}
            <el-tooltip content={schema.tips}>
              <el-icon style="margin-left: 6px;"><QuestionFilled /></el-icon>
            </el-tooltip>
          </span>
        )
      } else {
        return schema.label ? <span>{schema.label}</span> : null
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
      return (
        <SizeBox
          include={include}
          exclude={exclude}
          margin={[marginTop, marginRight, marginBottom, marginLeft]}
          onUpdate:margin={val => normalizeStyle('margin', val)}
          padding={[paddingTop, paddingRight, paddingBottom, paddingLeft]}
          onUpdate:padding={val => normalizeStyle('padding', val)}
          border={[borderTop, borderRight, borderBottom, borderLeft]}
          onUpdate:border={val => normalizeStyle('border', val)}
          width={width}
          onUpdate:width={val => updateData('style.width', val)}
          height={height}
          onUpdate:height={val => updateData('style.height', val)}
        />
      )
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
    const wrapper = (schema: ISchema): JSX.Element[] => {
      const form: JSX.Element[] = []
      let node
      switch (schema.type) {
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
        _schema.link[this.modelValue[_schema.key]]?.forEach(item => {
          form.push(...wrapper(item))
        })
      }
      // console.log(schema._uuid)
      return [
        <el-form-item
          label-width={_schema.label ? undefined : '0px'}
          v-slots={{
            label: () => this.renderLabel(schema),
          }}
        >{node}</el-form-item>,
        ...form,
      ]
    }
    return (
      <el-form label-width="100px">
        {this.schema.filter(item => this.allowContainer(item)).map(item => {
          return wrapper(item)
        })}
      </el-form>
    )
  },
})
