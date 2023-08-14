<script lang="ts">
import DraggableWrapper from '@/components/draggableWrapper.vue'
import {
  computed,
  defineComponent,
  h,
  provide,
  reactive,
  ref,
  toRefs,
  withModifiers,
} from 'vue'
import { useApp } from '@/store'
import ContainerView from '@/widgets/container.view.vue'
// import viewRender from 'widgets_side/viewRender';
import { normalizeStyle, useFederatedComponent } from '@sepveneto/mpd-hooks'
import { useRoute } from 'vue-router'
import { useHoverActive } from '@/widgets/hooks'
import { useSortable } from './useSortable'

export default defineComponent({
  props: {
    preview: Boolean,
  },
  setup(props) {
    const route = useRoute()

    const app = useApp()
    const { activeUuid, onEnter, onLeave } = useHoverActive()

    provide('Editor', reactive({
      ...toRefs(props),
      globalConfig: computed(() => app.config.globalConfig),

      updateConfig,
    }))

    const mainRef = ref()

    const data = computed({
      get() {
        return app.config.body[route.name!] ?? []
      },
      set(val: any) {
        app.config.body[route.name!] = val
      },
    })
    useSortable(mainRef, data, {
      group: { name: 'widgets', pull: true, put: onPut },
    })

    // const selected = ref({} as any)
    const selected = computed(() => app.selected)

    const { Component: ViewRender } = useFederatedComponent(
      app.remoteUrl,
      'widgets_side',
      './viewRender',
    )

    function onPut(_1: any, _2: any, dom: HTMLElement) {
      const { container } = dom.dataset
      return !container || container === 'outer'
    }
    function handleSelect(data: any) {
      // 不能使用运算展开符，需要确保selected与editor指向同一地址
      // 否则选择后的配置结果无法反应到编辑器和store里
      app.selected = data
      app.selected._fromContainer = false
    }
    function updateConfig(data: any) {
      app.selected = data
      app.selected._fromContainer = false
      // app.updateConfig();
    }

    function renderWrapper(item: any, index: number) {
      return h(DraggableWrapper, {
        key: item._uuid,
        'data-index': index,
        dir: 'top',
        active: activeUuid.value === item._uuid || selected.value._uuid === item._uuid,
        hide: item.isShow != null && !item.isShow,
        container: item._view === 'container',
        mask: item._view !== 'container' && item._view !== 'canvas' && item._mask,
        customStyle: item.style,
        onMouseenter: withModifiers(() => onEnter(item._uuid), ['stop']),
        onMouseleave: withModifiers(onLeave, ['stop']),
        onClick: () => handleSelect(item),
      }, () => renderChild(item))
    }
    function renderChild(item: any) {
      switch (item._view) {
        case 'container':
          return h(ContainerView, { config: item })
        default:
          return ViewRender.value
            ? h(ViewRender.value, {
              type: item._view,
              config: item,
              'onUpdate:config': updateConfig,
            })
            : h('div', 'loading...')
      }
    }

    return {
      renderWrapper,
      data,
      mainRef,
    }
  },
  render() {
    return h('main', {
      ref: 'mainRef',
      class: 'draggable-box',
      style: 'min-height: calc(667px - 60px); position: relative;',
    }, this.data.map((item, index) => {
      const node = this.renderWrapper(item, index)
      return node
    }))
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
