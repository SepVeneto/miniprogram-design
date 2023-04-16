import { defineComponent, PropType, defineAsyncComponent, watch, ShallowRef } from 'vue';
import ossUpload from './components/ossUpload.vue';
import { useFederatedComponent } from '@sepveneto/mpd-hooks';
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
interface ISchema {
  type: WidgetType
  label: string
  key: string
  link?: Record<string, ISchema[]>
  [attr: string]: any
}

export default defineComponent({
  name: 'SchemaContainer',
  components: {
    // ConfigRender,
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
  setup (prop, { emit }) {
    let ConfigRender: ShallowRef<any>;
    watch(() => prop.remoteUrl, (url) => {
      if (!url) return;
      const { Component } = useFederatedComponent(
        url,
        'widgets_side',
        './configRender',
      );
      ConfigRender = Component;
    }, { immediate: true });

    function updateData (key: string, val: unknown) {
      const path = key.split('.');
      const _path = path.slice(0, -1);
      const parent = path.length === 1
        ? prop.modelValue
        : _path.reduce((obj, curr) => {
          return obj[curr];
        }, prop.modelValue);
      parent[path.slice(-1)[0]] = val;
      emit('update:modelValue', prop.modelValue);
    }
    function getData (data: Record<string, any>, key: string) {
      const path = key.split('.');
      return path.reduce((obj, curr) => {
        return obj[curr];
      }, data);
    }
    function renderCheckbox (schema: ISchema) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { type, label, key, ...args } = schema;
      return (
        <el-checkbox
          model-value={getData(prop.modelValue, key)}
          onUpdate:modelValue={(val: string) => updateData(key, val)}
          {...args}
        />
      );
    }
    function renderInput (schema: ISchema) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { type, label, key, originType, ...args } = schema;
      return (
        <el-input
          model-value={getData(prop.modelValue, key)}
          onUpdate:modelValue={(val: string) => updateData(key, val)}
          type={originType}
          {...args}
        />
      );
    }
    function renderNumber (schema: ISchema) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { type, label, key, unit, ...args } = schema;
      return (
        <el-input
          model-value={getData(prop.modelValue, key)}
          type="number"
          onUpdate:modelValue={(val: string) => updateData(key, Number(val))}
          v-slots={{ suffix: () => (<div>{unit || 'px'}</div>) }}
          {...args}
        />
      );
    }
    function renderImage (schema: ISchema) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { type, label, key, ...args } = schema;
      return (
        <oss-upload
          model-value={getData(prop.modelValue, key)}
          onUpdate:modelValue={(val: string) => updateData(key, val)}
          {...args}
        />
      );
    }
    function renderColorPicker (schema: ISchema) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { type, label, key, ...args } = schema;
      return (
        <el-color-picker
          model-value={getData(prop.modelValue, key)}
          onUpdate:modelValue={(val: string) => updateData(key, val)}
          {...args}
        />
      );
    }
    function renderSelect (schema: ISchema) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { type, label, key, options, ...args } = schema;
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
      );
    }
    function renderRadioGroup (schema: ISchema) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { type, label, key, options, ...args } = schema;
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
      );
    }
    function renderEditor (schema: ISchema) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { type, label, key, ...args } = schema;
      return (
        <rich-text-editor
          model-value={getData(prop.modelValue, key)}
          onUpdate:modelValue={(val: string) => updateData(key, val)}
          {...args}
        />
      );
    }
    function renderCustom (schema: ISchema) {
      const { type, key } = schema;
      return ConfigRender.value
        ? (
          <ConfigRender.value
            type={type}
            modelValue={getData(prop.modelValue, key)}
            onUpdate:modelValue={(val: unknown) => updateData(key, val)}
          />
          )
        : null;
    }
    return {
      // schemaList,
      updateData,
      getData,

      renderInput,
      renderNumber,
      renderCheckbox,
      renderImage,
      renderColorPicker,
      renderSelect,
      renderRadioGroup,
      renderEditor,
      renderCustom,
    };
  },
  render () {
    const wrapper = (schema: ISchema): JSX.Element[] => {
      const form: JSX.Element[] = [];
      let node;
      switch (schema.type) {
        case 'input':
          node = this.renderInput(schema);
          break;
        case 'number':
          node = this.renderNumber(schema);
          break;
        case 'checkbox':
          node = this.renderCheckbox(schema);
          break;
        case 'image':
          node = this.renderImage(schema);
          break;
        case 'colorPicker':
          node = this.renderColorPicker(schema);
          break;
        case 'select':
          node = this.renderSelect(schema);
          break;
        case 'radioGroup':
          node = this.renderRadioGroup(schema);
          break;
        case 'editor':
          node = this.renderEditor(schema);
          break;
        default:
          node = this.renderCustom(schema);
          // node = <div>暂不支持</div>;
      }
      if (schema.link) {
        schema.link[this.modelValue[schema.key]]?.forEach(item => {
          form.push(...wrapper(item));
        });
      }
      // console.log(schema._uuid)
      return [
        <el-form-item label={schema.label}>{node}</el-form-item>,
        ...form,
      ];
    };
    return (
      <el-form label-width="100px">
        {this.schema.map(item => {
          return wrapper(item);
        })}
      </el-form>
    );
  },
});
