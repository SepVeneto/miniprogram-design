<script lang="ts">
import DraggableWrapper from '@/components/draggableWrapper.vue'
import type { VNode } from 'vue'
import {
  computed,
  defineComponent,
  h,
  provide,
  reactive,
  ref,
  shallowRef,
  toRefs,
  useTemplateRef,
  watch,
  watchEffect,
} from 'vue'
import { useApp, useHistory, useState } from '@/store'
import ContainerView from '@/widgets/container.view.vue'
// import viewRender from 'widgets_side/viewRender';
import { useFederatedComponent } from '@sepveneto/mpd-hooks'
import { normalizeStyle } from '@/utils'
import { useRoute } from 'vue-router'
import { useHoverActive } from '@/widgets/hooks'
import VueDraggable from 'vuedraggable'
import CanvasView from '@/widgets/canvas.view.vue'
import type { FreeScene } from '@sepveneto/free-dom'
import { GridLayout } from '@sepveneto/free-dom'
import { useContextMenu } from './useContextMenu'
import { useConfig } from '@/hooks'
import { ElDialog } from 'element-plus'

export default defineComponent({
  props: {
    preview: Boolean,
  },
  setup(props) {
    const route = useRoute()

    const state = useState()
    const app = useApp()
    const history = useHistory()
    const { activeUuid, onEnter, onLeave, onDragEnd, onDragStart } = useHoverActive()
    const config = useConfig('page')

    provide('Editor', reactive({
      ...toRefs(props),
      globalConfig: config,

      updateConfig,
    }))

    const mainRef = ref()

    const data = computed({
      get() {
        const val = app.config.body[route.name!] ?? []
        return val
      },
      set(val: any) {
        app.config.body[route.name!] = val
      },
    })

    const selected = computed(() => app.selected)

    const { Component: ViewRender, errorLoading } = useFederatedComponent(
      app.remoteUrl,
      'widgets',
      './viewRender',
    )

    function onPut(_1: any, _2: any, dom: HTMLElement) {
      // @ts-expect-error: vuedraggable extends dom
      const { _inContainer } = dom.__draggable_context.element
      return !_inContainer || _inContainer === 'outer'
    }
    function handleSelect(data: any) {
      // 不能使用运算展开符，需要确保selected与editor指向同一地址
      // 否则选择后的配置结果无法反应到编辑器和store里
      app.selected = data
      zIndex.select(data)
      app.selected._fromContainer = false
    }
    function updateConfig(data: any) {
      app.selected = data
      app.selected._fromContainer = false
      // app.updateConfig();
    }

    function renderWrapper(item: any) {
      const operate = h(DraggableWrapper, {
        key: item._uuid,
        dir: 'top',
        'data-type': item._custom ? 'custom' : 'node',
        name: item._name,
        active: activeUuid.value === item._uuid || selected.value._uuid === item._uuid,
        hide: item.isShow != null && !item.isShow,
        container: ['container', 'swiper'].includes(item._view),
        mask: item._view !== 'container' && item._view !== 'swiper' && item._mask,
        customStyle: item.style,
        onMouseenter: () => onEnter(item._uuid),
        onMouseleave: () => onLeave(),
        onMousedown: () => handleSelect(item),
      }, () => renderChild(item))
      return props.preview
        ? renderPreview(item)
        : layoutMode.value === 'free'
          ? h('div', {
            key: String(item._uuid),
            style: 'width: 100%; height: 100%;',
            'data-type': item._custom ? 'custom' : 'node',
            class: app.selected._uuid === item._uuid && 'grid-item',
            onMousedown: () => handleSelect(item),
          }, genRender(item, false))
          : operate
    }
    function renderPreview(item: any) {
      switch (item._view) {
        case 'swiper':
          return h(ContainerView, { config: item, type: 'swiper', style: normalizeStyle(item.style, layoutMode.value) })
        case 'container':
          return h(ContainerView, { config: item, style: normalizeStyle(item.style, layoutMode.value) })
        default:
          return genRender(item, true)
      }
    }
    function genRender(item: any, isPreview = false) {
      if (item._custom) {
        const options = {
          config: item,
          preview: isPreview,
          key: String(item._uuid),
        }
        return h(CanvasView, isPreview ? { ...options, style: normalizeStyle(item.style, layoutMode.value) } : options)
      } else {
        const options = {
          type: item._view,
          config: item,
          key: String(item._uuid),
          preview: isPreview,
          'onUpdate:config': updateConfig,
        }
        const style = normalizeStyle(item.style, 'grid')
        return ViewRender.value
          ? h(ViewRender.value, isPreview ? { ...options, style } : options)
          : h('div', errorLoading.value ? '加载失败!' : '加载中...')
      }
    }
    function renderChild(item: any) {
      switch (item._view) {
        case 'swiper':
          return h(ContainerView, { config: item, type: 'swiper' })
        case 'container':
          return h(ContainerView, { config: item })
        default:
          return genRender(item)
      }
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

    const layoutMode = computed(() => {
      return config.value.layoutMode || 'grid'
    })

    function onDrop(evt: DragEvent) {
      const { offsetX, offsetY } = evt

      const list = data.value
      state.currentElem.style.x = offsetX
      state.currentElem.style.y = offsetY
      list.push(state.currentElem)
      data.value = list
    }

    const canvasDialog = shallowRef()
    const sceneRef = useTemplateRef<InstanceType<typeof FreeScene>>('sceneRef')
    const zIndex = useContextMenu(data, {
      onEdit: (selected) => {
        canvasDialog.value = h(ElDialog, {
          title: '自定义模板',
          modelValue: true,
          appendToBody: true,
          closeOnClickModal: false,
          onClosed: () => {
            canvasDialog.value = null
          },
        })
      },
      onDelete: (selected) => {
        const currentConfig = app.config.body[route.name!]
        const index = currentConfig.findIndex(item => item._uuid === selected._uuid)
        currentConfig.splice(index, 1)
        history.create(`删除-${selected._name}`)
        app.selected = {}
      },
    })
    watchEffect(() => {
      if (layoutMode.value === 'free') {
        zIndex.init(sceneRef as any)
      } else {
        zIndex.init(mainRef)
      }
    }, { flush: 'post' })

    const layout = ref([])
    // TODO: layout同步到data中
    watch(data, (val) => {
      layout.value = val.map(item => ({
        i: String(item._uuid),
        x: item.style.x,
        y: item.style.y,
        w: item.style.width,
        h: item.style.height,
      }))
    }, { immediate: true })
    function renderScene(nodes: () => VNode[]) {
      return h(GridLayout, {
        ref: 'sceneRef',
        width: 375,
        cols: 375,
        disabledDrag: props.preview,
        disabledResize: props.preview,
        rowHeight: 1,
        margin: [0, 0],
        modelValue: layout.value,
        'onUpdate:modelValue': (val) => {
          layout.value = val
        },
        key: route.name,
        minW: 1,
        minH: 1,
      }, nodes)
    }

    return {
      sceneRef,
      layoutMode,
      renderWrapper,
      data,
      onPut,
      mainRef,
      state,
      onDragStart,
      onDragEnd,
      onDrop,
      onChange,
      renderScene,
      canvasDialog,
    }
  },
  render() {
    let comp
    if (this.layoutMode !== 'free') {
      comp = h(VueDraggable, {
        ref: 'mainRef',
        class: 'draggable-box',
        style: 'min-height: calc(667px - 60px); position: relative;',
        modelValue: this.data,
        group: { name: 'widgets', pull: true, put: true },
        componentData: {
          type: 'transition-group',
          name: 'flip-list',
        },
        animation: 200,
        handle: '.operate',
        itemKey: '_uuid',
        'onUpdate:modelValue': (val: any) => { this.data = val },
        onStart: () => { this.state.dragging = true; this.onDragStart() },
        onEnd: () => { this.state.dragging = false; this.onDragEnd() },
        onChange: this.onChange,
      }, {
        item: (item: any) => this.renderWrapper(item.element),
      })
    } else {
      comp = this.renderScene(() => this.data.map(item => this.renderWrapper(item)))
    }
    return [comp, this.canvasDialog]
  },
})
</script>

<style lang="scss" scoped>
.draggable-box {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: max-content;
}
.grid-item {
  cursor: move;
  outline: 1px dashed #4089EF;
  width: 100%;
  height: 100%;
}
</style>

<style>
.flip-list-move {
  transition: transform 0.5s;
}
.ghost {
  opacity: 0.5;
  background: #c8ebfb;
}
</style>
