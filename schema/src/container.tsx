import { defineComponent } from 'vue'
import ossUpload from '@/components/ossUpload.vue'
// import rInput from './input.vue'
// import rCheckbox from './'
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
      type: Array,
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
    function renderCheckbox(schema) {
      const { type, label, key, ...args } = schema
      return (
        <el-checkbox
          model-value={getData(prop.modelValue, key)}
          onUpdate:modelValue={(val: string) => updateData(key, val)}
          {...args}
        />
      )
    }
    return {
      updateData,
      getData,

      renderCheckbox,
    }
  },
  render() {
    const wrapper = (schema) => {
      let node
      switch (schema.type) {
        case 'input':
          node = <el-input
            model-value={this.getData(this.modelValue, schema.key)}
            onUpdate:modelValue={(val: string) => this.updateData(schema.key, val)}
          />
          break;
        case 'number':
          node = <el-input
            model-value={this.getData(this.modelValue, schema.key)}
            type="number"
            onUpdate:modelValue={(val: string) => this.updateData(schema.key, Number(val))}
          />
          break;
        case 'checkbox':
          node = this.renderCheckbox(schema)
          break;
        case 'image':
          node = <oss-upload
            model-value={this.getData(this.modelValue, schema.key)}
            onUpdate:modelValue={(val: string) => this.updateData(schema.key, val)}
          />
          break;
        case 'colorPicker':
          node = <el-color-picker
            model-value={this.getData(this.modelValue, schema.key)}
            onUpdate:modelValue={(val: string) => this.updateData(schema.key, val)}
          />
          break;
        default:
          node = <div>{schema.type}</div>
      }
      return (
        <el-form-item label={schema.label}>{node}</el-form-item>
      )
    }
    console.log(this.schema)
    return (
      <el-form label-width="100px">
        {this.schema.map(item => {
          return wrapper(item)
        })}
      </el-form>
    )
  }
})