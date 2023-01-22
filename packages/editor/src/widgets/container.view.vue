<script lang="tsx">
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
} from 'vue';
import { useApp } from '@/store';
import draggable from 'vuedraggable';
import draggableWrapper from '@/components/draggableWrapper.vue';
import { useNormalizeStyle } from '@/hooks';

import canvasView from './canvas.view.vue';
// @ts-expect-error: from module federation
import viewRender from 'widgets_side/viewRender';

export default defineComponent({
  components: {
    draggable,
    draggableWrapper,
    canvasView,
    viewRender,
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
            display: 'grid',
            gridTemplateColumns: `repeat(${props.config.grid}, 1fr)`,
            ...style.value,
          };
    });

    const swiper = shallowRef();
    watch(isSwiper, (val) => {
      if (val) {
        nextTick().then(() => {
          swiper.value = new Swiper(swiperRef.value, {});
        });
      } else {
        swiper.value.destroy();
      }
    });

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
      app.updateConfig();
    }
    function getRenderContent (element: any) {
      switch (element._view) {
        case 'canvas':
          return <canvas-view config={element} />;
        case 'container':
          return;
        default:
          return <view-render type={element._view} config={element} />;
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
      isSwiper,

      onPut,
      onUpdate,
      handleSelect,
      getRenderContent,
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
      return !this.previewComp
        ? (
        <draggable-wrapper
          dir="top"
          active={this.selected._uuid === element._uuid}
          hide={element.isShow != null && !element.isShow}
          mask
          class={{ 'swiper-slide': this.isSwiper }}
          onClick={withModifiers(() => this.handleSelect(element), ['stop'])}
        >
          {this.getRenderContent(element)}
        </draggable-wrapper>
          )
        : (
        <div class={{ 'swiper-slide': this.isSwiper }}>
          {this.getRenderContent(element)}
        </div>
          );
    };
    const core = (
      <draggable
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
</style>
