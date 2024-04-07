<script lang="ts">
import '@sepveneto/free-dom/css'
import {
  computed,
  defineComponent,
  h,
  inject,
  reactive,
  shallowRef,
  watchEffect,
} from 'vue'
import { useApp, useHistory } from '@/store'
import { useFederatedComponent } from '@sepveneto/mpd-hooks'
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
    const history = useHistory()
    const previewComp = computed(() => editorContext.preview)
    const selected = computed(() => app.selected)
    const itemList = computed(() => props.config.list)
    const type = computed(() => props.type)
    const columnGap = computed(() => {
      console.log(props.config.style)
      return props.config.style.columnGap ?? 0
    })
    const configComp = computed<any>({
      get() {
        const config = props.config
        config.style = props.config.style || {}
        config.grid = props.config.grid || 1
        config.list = props.config.list || []

        return config
      },
      set(val) {
        emit('update:modelValue', val)
      },
    })

    const draggableRef = shallowRef<HTMLElement>()
    const { cellWidth, containerRect } = useContainer(
      draggableRef,
      configComp,
      props.type,
      previewComp,
    )

    const { Component: ViewRender, errorLoading } = useFederatedComponent(
      app.remoteUrl,
      'widgets',
      './viewRender',
    )

    const options = reactive({
      list: itemList,
      preview: previewComp,
      grid: configComp.value.grid,
      selected,
      activeUuid,
      cellWidth,
      containerRect,
      ViewRender,
      errorLoading,
      columnGap,
      type,
      onEnter,
      onLeave,
      onDragEnd,
      onDragStart,
      handleSelect,
    })
    const grid = useGrid(options)

    // const viewStyle = computed(() => {
    //   return {
    //     // margin: `-${rowGap.value}px -${columnGap.value}px`,
    //   }
    //   // return type.value === 'swiper'
    //   //   ? {}
    //   //   : {
    //   //       rowGap,
    //   //       columnGap,
    //   //     }
    // })

    function onPut(_1: any, _2: any, dom: HTMLElement) {
      // @ts-expect-error: vuedraggable extends dom
      const { _inContainer, _view } = dom.__draggable_context.element
      if (['swiper'].includes(_view)) return false
      return !_inContainer || _inContainer === 'inner'
    }
    function handleSelect(data: any) {
      // 不能使用运算展开符，需要确保selected与editor指向同一地址
      // 否则选择后的配置结果无法反应到编辑器和store里
      app.selected = data
      app.selected._fromContainer = true
      // app.updateConfig();
    }
    function onChange(evt: any) {
      const { added, moved } = evt
      if (added) {
        history.create(`添加-${added.element._name}`)
      }
      if (moved) {
        history.create(`移动-${moved.element._name}`)
      }
    }

    return {
      itemList,
      configComp,
      previewComp,
      // viewStyle,
      draggableRef,
      grid,
      onPut,
      onDragStart,
      onDragEnd,
      onChange,
    }
  },
  render() {
    const core = h(VueDraggable, {
      ref: 'draggableRef',
      class: [
        'draggable-group',
        { 'is-preview': this.previewComp },
        this.type === 'swiper' && 'swiper-wrapper',
      ],
      // style: this.viewStyle,
      modelValue: this.previewComp ? this.configComp.list.filter(item => item.isShow) : this.configComp.list,
      'onUpdate:modelValue': (value: any[]) => { this.configComp.list = value },
      group: { name: 'widgets', pull: true, put: this.onPut },
      componentData: {
        type: 'transition-group',
        name: 'flip-list',
      },
      animation: 200,
      handle: '.operate',
      itemKey: '_uuid',
      onStart: this.onDragStart,
      onEnd: () => this.onDragEnd(),
      onChange: this.onChange,
    }, {
      item: ({ element }: any) => this.grid.renderItem(element),
    })
    return this.type === 'swiper' ? this.grid.wrapSwiper(core) : core
  },
})
</script>

<style scoped lang="scss">
.draggable-group {
  box-sizing: border-box;
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  min-height: 50px;
  position: relative;
  height: 100%;
  align-content: flex-start;
  justify-content: space-between;
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

<style scoped lang="scss">
.flip-list-move {
  transition: transform 0.5s;
}
</style>
