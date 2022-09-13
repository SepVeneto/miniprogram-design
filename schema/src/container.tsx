import { defineComponent, PropType } from 'vue'
import ossUpload from '@/components/ossUpload.vue'
// import rInput from './input.vue'
// import rCheckbox from './'
type WidgetType = 'input' | 'number' | 'checkbox' | 'image' | 'colorPicker'
interface ISchema {
  type: WidgetType
  label: string
  key: string
  [attr: string]: any
}

export default defineComponent({
  components: {
    ossUpload
  },
  emits: ['update:modelValue'],
  props: {
    modelValue: {
      type: Object,
      default: () => ({})
    },
    schema: {
      type: Array as PropType<ISchema[]>,
      default: () => ([])
    }
  },
  setup(prop, { emit }) {
    function updateData(key: string, val: string | number) {
      const path = key.split('.')
      const _path = path.slice(0, -1)
      const parent = path.length === 1 ? prop.modelValue : _path.reduce((obj, curr) => {
        return obj[curr]
      }, prop.modelValue)
      parent[path.slice(-1)[0]] = val
      console.log(parent, prop.modelValue)
      emit('update:modelValue', { ...prop.modelValue })
    }
    function getData(data: Record<string, any>, key: string) {
      const path = key.split('.')
      return path.reduce((obj, curr) => {
        return obj[curr]
      }, data)
    }
    function renderCheckbox(schema: ISchema) {
      const { type, label, key, ...args } = schema
      return (
        <el-checkbox
          model-value={getData(prop.modelValue, key)}
          onUpdate:modelValue={(val: string) => updateData(key, val)}
          {...args}
        />
      )
    }
    function renderInput(schema: ISchema) {
      const { type, label, key, ...args } = schema
      return (
        <el-input
          model-value={getData(prop.modelValue, key)}
          onUpdate:modelValue={(val: string) => updateData(key, val)}
          {...args}
        />
      )
    }
    function renderNumber(schema: ISchema) {
      const { type, label, key, ...args } = schema
      return (
        <el-input
          model-value={getData(prop.modelValue, key)}
          type="number"
          onUpdate:modelValue={(val: string) => updateData(key, Number(val))}
          {...args}
        />
      )
    }
    function renderImage(schema: ISchema) {
      const { type, label, key, ...args } = schema
      return (
        <oss-upload
          model-value={getData(prop.modelValue, key)}
          onUpdate:modelValue={(val: string) => updateData(key, val)}
          {...args}
        />
      )
    }
    function renderColorPicker(schema: ISchema) {
      const { type, label, key, ...args } = schema
      return (
        <el-color-picker
          model-value={getData(prop.modelValue, key)}
          onUpdate:modelValue={(val: string) => updateData(key, val)}
          {...args}
        />
      )
    }
    return {
      updateData,
      getData,

      renderInput,
      renderNumber,
      renderCheckbox,
      renderImage,
      renderColorPicker,
    }
  },
  render() {
    const wrapper = (schema: ISchema) => {
      let node
      switch (schema.type) {
        case 'input':
          node = this.renderInput(schema)
          break;
        case 'number':
          node = this.renderNumber(schema)
          break;
        case 'checkbox':
          node = this.renderCheckbox(schema)
          break;
        case 'image':
          node = this.renderImage(schema)
          break;
        case 'colorPicker':
          node = this.renderColorPicker(schema)
          break;
        default:
          node = <div>{schema.type}</div>
      }
      return (
        <el-form-item label={schema.label}>{node}</el-form-item>
      )
    }
    return (
      <el-form label-width="100px">
        {this.schema.map(item => {
          return wrapper(item)
        })}
      </el-form>
    )
  }
})