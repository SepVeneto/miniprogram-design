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
import VueDraggable from 'vuedraggable'

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

    function renderWrapper(item: any) {
      return h(DraggableWrapper, {
        key: item._uuid,
        dir: 'top',
        active: activeUuid.value === item._uuid || selected.value._uuid === item._uuid,
        hide: item.isShow != null && !item.isShow,
        container: ['container', 'swiper'].includes(item._view),
        mask: item._view !== 'container' && item._view !== 'swiper' && item._mask,
        customStyle: item.style,
        onMouseenter: withModifiers(() => onEnter(item._uuid), ['stop']),
        onMouseleave: withModifiers(onLeave, ['stop']),
        onClick: () => handleSelect(item),
      }, () => renderChild(item))
    }
    function renderChild(item: any) {
      switch (item._view) {
        case 'swiper':
          return h(ContainerView, { config: item, type: 'swiper' })
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
      onPut,
      mainRef,
    }
  },
  render() {
    return h(VueDraggable, {
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
      'onUpdate:modelValue': val => { this.data = val },
    }, {
      item: (item) => this.renderWrapper(item.element),
    })
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
