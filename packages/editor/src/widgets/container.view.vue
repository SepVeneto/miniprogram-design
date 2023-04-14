<script lang="tsx">
import { freeDom as FreeDom } from '@sepveneto/free-dom';
// eslint-disable-next-line import/no-named-as-default
import Swiper from 'swiper';
import 'swiper/css';
import {
  defineComponent,
  computed,
  inject,
  watch,
  nextTick,
  shallowRef,
  onMounted,
  onBeforeUnmount,
  withModifiers,
  ref,
} from 'vue';
import { useApp } from '@/store';
import draggable from 'vuedraggable';
import draggableWrapper from '@/components/draggableWrapper.vue';
import { useFederatedComponent, useNormalizeStyle } from '@sepveneto/mpd-hooks';
import { useElementBounding } from '@vueuse/core';

import canvasView from './canvas.view.vue';
// import viewRender from 'widgets_side/viewRender';

export default defineComponent({
  components: {
    FreeDom,
    Draggable: draggable,
    DraggableWrapper: draggableWrapper,
    CanvasView: canvasView,
    // ViewRender: viewRender,
  },
  props: {
    config: {
      type: Object,
      default: () => ({}),
    },
  },
  emits: ['update:modelValue'],
  setup (props, { emit }) {
    const app = useApp();
    const editorContext = inject('Editor', { preview: false });
    const draggableRef = ref();

    const previewComp = computed(() => editorContext.preview);
    const configComp = computed<any>({
      get () {
        return props.config;
      },
      set (val) {
        emit('update:modelValue', val);
      },
    });
    watch(() => props.config.list.length, () => {
      isSwiper.value && onUpdate();
    });
    const selected = computed(() => app.selected);
    const style = useNormalizeStyle(props.config.style);

    const isSwiper = computed(() => props.config.layout === 'swiper');
    const swiperRef = shallowRef();

    const viewStyle = computed(() => {
      return isSwiper.value
        ? style.value
        : {
            display: 'flex',
            flexWrap: 'wrap',
            ...style.value,
          };
    });
    const containerRect = useElementBounding(draggableRef);
    const cellWidth = computed(() => containerRect.width.value / props.config.grid);

    const swiper = shallowRef();
    watch(cellWidth, (newCell, oldCell) => {
      if (!oldCell) return;
      props.config.list.forEach((item: any) => {
        const rate = item.width / oldCell;
        item.width = rate * newCell;
      });
    });
    watch(isSwiper, (val) => {
      if (val) {
        nextTick().then(() => {
          swiper.value = new Swiper(swiperRef.value, {});
        });
      } else {
        swiper.value.destroy();
      }
    });
    watch(() => props.config.list.length, () => {
      props.config.list.forEach((item: any) => {
        item.width = item.width || cellWidth.value;
        item.height = item.height || 60;
      });
    }, { immediate: true });

    const { Component: ViewRender } = useFederatedComponent(
      app.remoteUrl,
      'widgets_side',
      './viewRender',
    );

    onMounted(() => {
      if (isSwiper.value) {
        swiper.value = new Swiper(swiperRef.value, {});
      }
    });
    onBeforeUnmount(() => {
      swiper.value?.destroy();
    });

    function onPut (_1: any, _2: any, dom: any) {
      const { _inContainer } = dom.__draggable_context.element;
      return !_inContainer || _inContainer === 'inner';
    }
    function handleSelect (data: any) {
      app.selected = data;
      // app.updateConfig();
    }
    function wrapResizable (node: any, element: any) {
      return (
        <FreeDom
          width={element.width}
          height={element.height}
          x={element.x}
          y={element.y}
          preview={previewComp.value}
          scale={['rb']}
          absolute={false}
          diagonal={false}
          grid={[cellWidth.value, 1]}
          handler="mark"
          onUpdate:width={(val: number) => { element.width = val; }}
          onUpdate:height={(val: number) => { element.height = val; }}
          onUpdate:x={(val: number) => { element.x = val; }}
          onUpdate:y={(val: number) => { element.y = val; }}
        >
          {node}
        </FreeDom>
      );
    }
    function getRenderContent (element: any) {
      switch (element._view) {
        case 'canvas':
          return <canvas-view config={element} />;
        case 'container':
          return;
        default:
          return ViewRender.value
            ? <ViewRender.value
              type={element._view}
              config={element}
            />
            : null
          ;
      }
    }
    async function onUpdate () {
      await nextTick();
      swiper.value?.update();
    }
    return {
      configComp,
      selected,
      previewComp,
      viewStyle,
      swiperRef,
      draggableRef,
      isSwiper,
      ViewRender,

      onPut,
      onUpdate,
      handleSelect,
      getRenderContent,
      wrapResizable,
    };
  },
  render () {
    const swiperWrap = (cont: any) => {
      return (
        <div data-type="swiper" ref="swiperRef" class="swiper">
          {cont}
        </div>
      );
    };
    const content = ({ element }: any) => {
      return this.wrapResizable(!this.previewComp
        ? (
            <draggable-wrapper
              dir="top"
              active={this.selected._uuid === element._uuid}
              hide={element.isShow != null && !element.isShow}
              mask
              onClick={withModifiers(() => this.handleSelect(element), ['stop'])}
            >
              {this.getRenderContent(element)}
            </draggable-wrapper>
          )
        : (
        <div>
          {this.getRenderContent(element)}
        </div>
          ), element);
    };
    const core = (
      <draggable
        ref="draggableRef"
        v-model={this.configComp.list}
        item-key="_uuid"
        handle=".operate"
        animation={200}
        ghost-class="ghost"
        component-data={{
          type: 'transition-group',
          name: 'flip-list',
        }}
        group={{ name: 'widgets', pull: true, put: this.onPut }}
        class={[
          'draggable-group',
          { 'is-preview': this.previewComp },
          { 'swiper-wrapper': this.isSwiper },
        ]}
        style={this.viewStyle}
        // onAdd={this.onUpdate}
        v-slots={{
          item: content,
        }}
      />
    );
    return this.isSwiper ? swiperWrap(core) : core;
  },
});
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
  &.is-preview::before {
    display: none;
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
}
.free-dom__widget-wrapper {
  position: relative;
  box-sizing: border-box;
  border: none !important;
  cursor: auto;
}
</style>
