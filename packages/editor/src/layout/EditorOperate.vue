<script lang="ts">
import ComponentTree from '@/components/ComponentTree.vue'
import type { PropType, VNode } from 'vue'
import { computed, defineComponent, h, ref } from 'vue'
import { ElIcon, ElTooltip } from 'element-plus'
import {
  Edit as IconEdit,
  Iphone as IconIphone,
} from '@element-plus/icons-vue'
import IconTreeTable from '@/assets/tree-table.vue'

export type Mode = 'edit' | 'preview' | 'tree'

export default defineComponent({
  props: {
    modelValue: {
      type: String as PropType<Mode>,
      required: true,
    },
    tree: {
      type: Boolean,
    },
  },
  emits: ['update:modelValue', 'update:tree'],
  // ['update:modelValue'],
  setup(props) {
    const operateList = ref([])
    const isPreview = computed(() => props.modelValue === 'preview')
    const isEdit = computed(() => props.modelValue === 'edit')
    const showTree = ref(true)
    return {
      operateList,
      isPreview,
      isEdit,
      showTree,
    }
  },
  render() {
    const map = {
      edit: '编辑',
      preview: '预览',
      tree: '组件树',
    }
    const tooltip = (content: string, node: VNode) => {
      return h(ElTooltip, {
        effect: 'dark',
        content,
        placement: 'right',
      }, () => node)
    }
    const iconIphone = () => h(ElIcon, {
      class: ['bar-operate', { 'is-active': this.isPreview }],
      onClick: () => this.$emit('update:modelValue', 'preview'),
    }, () => h(IconIphone))
    const iconEdit = () => h(ElIcon, {
      class: ['bar-operate', { 'is-active': this.isEdit }],
      onClick: () => this.$emit('update:modelValue', 'edit'),
    }, () => h(IconEdit))
    const iconTree = () => h(ElIcon, {
      class: ['bar-operate', { 'is-active': this.showTree }],
      onClick: () => { this.showTree = !this.showTree },
    }, () => h(IconTreeTable))

    return h(
      'section',
      { style: 'float: left; position: relative;' },
      [
        h('div', { class: 'operate-container' }, [
          tooltip(map.edit, iconEdit()),
          tooltip(map.preview, iconIphone()),
          tooltip(map.tree, iconTree()),
        ]),
        this.showTree && h(ComponentTree),
      ])
  },
})
</script>

<style lang="scss">
.operate-container {
  margin-top: 92px;
  font-size: 28px;
  display: flex;
  flex-direction: column;
  border: 1px solid #ccc;
  border-radius: 10px;
  overflow: hidden;
}
.bar-operate {
  padding: 10px;
  cursor: pointer;
  position: relative;
  transition: all 0.3s;
  box-sizing: content-box;
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
