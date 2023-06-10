<script lang="tsx">
import { freeDom as FreeDom } from '@sepveneto/free-dom';
import {
  defineComponent,
  computed,
  inject,
  watch,
  withModifiers,
  ref,
} from 'vue';
import { useApp } from '@/store';
import draggable from 'vuedraggable';
import draggableWrapper from '@/components/draggableWrapper.vue';
import { useFederatedComponent, useNormalizeStyle } from '@sepveneto/mpd-hooks';
import { useElementBounding } from '@vueuse/core';
import { useHoverActive } from './useHoverActive';

export default defineComponent({
  components: {
    FreeDom,
    Draggable: draggable,
    DraggableWrapper: draggableWrapper,
  },
  props: {
    config: {
      type: Object,
      default: () => ({}),
    },
  },
  emits: ['update:modelValue'],
  setup (props, { emit }) {
    const { activeUuid, onEnter, onLeave, onDragEnd, onDragStart } = useHoverActive();
    const app = useApp();
    const editorContext = inject('Editor', { preview: false });
    const draggableRef = ref<InstanceType<typeof draggable>>();

    const previewComp = computed(() => editorContext.preview);
    const configComp = computed<any>({
      get () {
        return props.config;
      },
      set (val) {
        emit('update:modelValue', val);
      },
    });
    const selected = computed(() => app.selected);
    const style = useNormalizeStyle(props.config.style);

    const viewStyle = computed(() => {
      const styles = {
        display: 'flex',
        flexWrap: 'wrap',
        rowGap: 0,
        columnGap: 0,
        ...style.value,
      };
      if (props.config.image?.startsWith('http')) {
        styles.background = `url(${props.config.image})`;
        styles.backgroundSize = '100%';
        styles.backgroundRepeat = 'no-repeat';
      }
      return styles;
    });
    const containerRect = useElementBounding(draggableRef);
    const containerWidth = computed(() => {
      const { paddingLeft = 0, paddingRight = 0, columnGap = 0 } = props.config.style;
      if (!containerRect.width.value) return 0;
      return containerRect.width.value - paddingLeft - paddingRight - columnGap * (props.config.grid - 1);
    });
    const cellWidth = computed(() => containerWidth.value / props.config.grid);

    // watch(cellWidth, (newCell, oldCell) => {
    //   if (!oldCell) return;
    //   props.config.list.forEach((item: any) => {
    //     reOffset(item);
    //     const rate = item.width / oldCell;
    //     item.width = rate * newCell;
    //     console.log(item.width);
    //   });
    // });
    watch([() => props.config.list.length, cellWidth], () => {
      props.config.list.forEach((item: any) => {
        item.height = item.height || undefined;
        if (!cellWidth.value) {
          return;
        }
        reOffset(item);
      });
    }, { immediate: true });

    const { Component: ViewRender } = useFederatedComponent(
      app.remoteUrl,
      'widgets_side',
      './viewRender',
    );

    function onPut (_1: any, _2: any, dom: any) {
      const { _inContainer } = dom.__draggable_context.element;
      return !_inContainer || _inContainer === 'inner';
    }
    function handleSelect (data: any) {
      app.selected = { ...data, _fromContainer: true };
      // app.updateConfig();
    }
    function reOffsetAll () {
      configComp.value.list.forEach(reOffset);
      // configComp.value = props.config;
    }
    function reOffset (item: any) {
      if (!item.width) {
        item.width = cellWidth.value;
        return;
      }
      const cellNum = Math.round(item.width / cellWidth.value);
      const { columnGap = 0 } = props.config.style;
      const offset = (cellNum - 1 ? cellNum - 1 : 0) * columnGap;
      item.width = cellNum * cellWidth.value + offset;
    }
    function wrapResizable (node: any, element: any) {
      return (
        <FreeDom
          width={element.width}
          height={element.height}
          x={0}
          y={0}
          preview={previewComp.value}
          scale={['rb']}
          absolute={false}
          diagonal={false}
          grid={[cellWidth.value, 1]}
          handler="mark"
          onDragStart={onDragStart}
          onDragEnd={() => onDragEnd()}
          onClick={withModifiers(() => handleSelect(element), ['stop'])}
          onUpdate:width={(val: number) => { element.width = val; reOffsetAll(); }}
          onUpdate:height={(val: number) => { element.height = val; }}
          onMouseenter={withModifiers(() => onEnter(element._uuid), ['stop'])}
          onMouseleave={withModifiers(() => onLeave(), ['stop'])}
        >
          {node}
        </FreeDom>
      );
    }
    function getRenderContent (element: any) {
      switch (element._view) {
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

    return {
      configComp,
      selected,
      previewComp,
      viewStyle,
      draggableRef,
      ViewRender,
      activeUuid,

      onEnter,
      onLeave,
      onPut,
      handleSelect,
      getRenderContent,
      wrapResizable,
    };
  },
  render () {
    const content = ({ element }: any) => {
      return this.wrapResizable(!this.previewComp
        ? (
            <draggable-wrapper
              dir="top"
              active={this.selected._uuid === element._uuid || this.activeUuid === element._uuid}
              hide={element.isShow != null && !element.isShow}
              mask
            >
              {this.getRenderContent(element)}
            </draggable-wrapper>
          )
        : (
        <div style="height: 100%;">
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
        ]}
        style={this.viewStyle}
        v-slots={{
          item: content,
        }}
      />
    );
    return core;
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
