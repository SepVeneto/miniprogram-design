<script lang="ts">
import '@sepveneto/free-dom/css'
import {
  computed,
  defineComponent,
  h,
  inject,
  reactive,
  shallowRef,
} from 'vue'
import { useApp } from '@/store'
import { useFederatedComponent, useNormalizeStyle } from '@sepveneto/mpd-hooks'
import { useSortable } from '@/layout/useSortable'
import { useContainer, useGrid, useHoverActive } from './hooks'
import type { PropType } from 'vue'
import VueDraggable from 'vuedraggable'

export default defineComponent({
  props: {
    config: {
      type: Object,
      default: () => ({}),
    },
    type: {
      type: String as PropType<'swiper' | 'grid'>,
      default: 'grid',
    },
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const editorContext = inject('Editor', { preview: false })
    const { activeUuid, onEnter, onLeave, onDragEnd, onDragStart } = useHoverActive()
    const app = useApp()
    const previewComp = computed(() => editorContext.preview)
    const selected = computed(() => app.selected)
    const itemList = computed(() => props.config.list)
    const type = computed(() => props.type)
    const configComp = computed<any>({
      get() {
        return props.config
      },
      set(val) {
        emit('update:modelValue', val)
      },
    })

    const draggableRef = shallowRef<HTMLElement>()
    const { cellWidth, containerRect } = useContainer(draggableRef, configComp, props.type)

    const { Component: ViewRender } = useFederatedComponent(
      app.remoteUrl,
      'widgets_side',
      './viewRender',
    )

    const options = reactive({
      list: itemList,
      preview: previewComp,
      selected,
      activeUuid,
      cellWidth,
      containerRect,
      ViewRender,
      type,
      onEnter,
      onLeave,
      onDragEnd,
      onDragStart,
      handleSelect,
    })
    const grid = useGrid(options)

    const style = useNormalizeStyle(props.config.style)

    const viewStyle = computed(() => {
      const { rowGap, columnGap } = style.value
      return type.value === 'swiper'
        ? {}
        : {
            display: 'flex',
            flexWrap: 'wrap',
            rowGap,
            columnGap,
          }
    })

    // useSortable(draggableRef, configComp.value.list, {
    //   group: { name: 'widgets', pull: true, put: onPut },
    // })

    function onPut(_1: any, _2: any, dom: HTMLElement) {
      const { container } = dom.dataset
      return !container || container === 'inner'
    }
    function handleSelect(data: any) {
      // 不能使用运算展开符，需要确保selected与editor指向同一地址
      // 否则选择后的配置结果无法反应到编辑器和store里
      app.selected = data
      app.selected._fromContainer = true
      // app.updateConfig();
    }

    return {
      itemList,
      configComp,
      previewComp,
      viewStyle,
      draggableRef,
      grid,
    }
  },
  render() {
    const core = h(VueDraggable, {
      class: [
        'draggable-group',
        { 'is-preview': this.previewComp },
        this.type === 'swiper' && 'swiper-wrapper',
      ],
      style: this.viewStyle,
      modelValue: this.configComp.list,
      'onUpdate:modelValue': (value) => { this.configComp.list = value },
      group: { name: 'widgets', pull: true, put: true },
      componentData: {
        type: 'transition-group',
        name: 'flip-list',
      },
      animation: 200,
      handle: '.operate',
      itemKey: '_uuid',
    }, {
      item: ({ element }) => this.grid.renderItem(element),
    })
    return this.type === 'swiper' ? this.grid.wrapSwiper(core) : core
  },
})
</script>

<style scoped lang="scss">
.draggable-group {
  width: 100%;
  min-height: 50px;
  position: relative;
  &::before {
    content: '拖拽至此区域';
    color: #ddd;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
  }
  &.is-preview {
    min-height: initial;
  }
  &.is-preview::before {
    display: none;
  }
  &:deep(.free-dom__widget-wrapper) {
    position: relative;
    box-sizing: border-box;
    border: none !important;
    cursor: auto;
  }
}
</style>

<style>
.flip-list-move {
  transition: transform 0.5s;
}
.ghost {
  opacity: 0.5;
  background: #c8ebfb;
  color: #153EBA
}
</style>
