<script lang="tsx">
import { PropType, defineComponent, ref, computed } from 'vue';
import { ElTooltip, ElIcon } from 'element-plus';
import {
  Edit as IconEdit,
  Iphone as IconIphone,
} from '@element-plus/icons-vue';

export type Mode = 'edit' | 'preview';

export default defineComponent({
  props: {
    modelValue: {
      type: String as PropType<Mode>,
      required: true,
    },
  },
  emits: ['update:modelValue'],
  // ['update:modelValue'],
  setup (props) {
    const operateList = ref([]);
    const isPreview = computed(() => props.modelValue === 'preview');
    const isEdit = computed(() => props.modelValue === 'edit');
    return {
      operateList,
      isPreview,
      isEdit,
    };
  },
  render () {
    const preview = () => {
      return (
        <ElTooltip
          effect="dark"
          content="预览"
          placement="right"
        >
          <ElIcon
            class={['bar-operate', { 'is-active': this.isPreview }]}
            onClick={() => this.$emit('update:modelValue', 'preview')}
          >
            <IconIphone />
          </ElIcon>
        </ElTooltip>
      );
    };
    const edit = () => (
      <ElTooltip
        effect="dark"
        content="编辑"
        placement="right"
      >
        <ElIcon
          class={['bar-operate', { 'is-active': this.isEdit }]}
          onClick={() => this.$emit('update:modelValue', 'edit')}
        >
          <IconEdit />
        </ElIcon>
      </ElTooltip>
    );
    return (
      <div class="operate-container">
        {edit()}
        {preview()}
      </div>
    );
  },
});
</script>

<style lang="scss">
.operate-container {
  margin-top: 92px;
  font-size: 28px;
  display: flex;
  flex-direction: column;
  border: 1px solid #ccc;
  float: left;
  border-radius: 10px;
  overflow: hidden;
}
.bar-operate {
  padding: 10px;
  cursor: pointer;
  position: relative;
  transition: all 0.3s;
  &.is-active {
    background: #4089ef;
    color: #fff;
  }
  &:not(:last-child) {
    // padding-bottom: 10px;
    &::after {
      content: '';
      position: absolute;
      width: 100%;
      height: 1px;
      background-color: #ccc;
      bottom: 0;
    }
  }
}
</style>
