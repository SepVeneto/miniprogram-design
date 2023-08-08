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
import draggableWrapper from '@/components/draggableWrapper.vue';
import { useFederatedComponent, useNormalizeStyle } from '@sepveneto/mpd-hooks';
import { useElementBounding } from '@vueuse/core';
import { useHoverActive } from './useHoverActive';
import { useSortable } from '@vueuse/integrations/useSortable';

export default defineComponent({
  components: {
    FreeDom,
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
        item.style.height = item.style.height || undefined;
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

    useSortable(draggableRef, configComp.value.list, {
      handle: '.operate',
      animation: 200,
      ghostClass: 'ghost',
      group: { name: 'widgets', pull: true, put: onPut },
      onAdd (evt) {
        // @ts-expect-error: extend field
        const element = evt.item._underlying_vm_;
        if (!element) return;

        evt.item.parentElement?.removeChild(evt.item);
        configComp.value.list.splice(evt.newIndex, 0, element);
      },
    });

    function onPut (_1: any, _2: any, dom: any) {
      // TODO: 应该在这里把所有容器内不适用的属性全部剔除
      // const { _inContainer } = dom.__draggable_context.element;
      // return !_inContainer || _inContainer === 'inner';
      return true;
    }
    function handleSelect (data: any) {
      // 不能使用运算展开符，需要确保selected与editor指向同一地址
      // 否则选择后的配置结果无法反应到编辑器和store里
      app.selected = data;
      app.selected._fromContainer = true;
      // app.updateConfig();
    }
    function reOffsetAll () {
      configComp.value.list.forEach(reOffset);
      // configComp.value = props.config;
    }
    function reOffset (item: any) {
      if (!item.style.width) {
        item.style.width = cellWidth.value;
        return;
      }
      const cellNum = Math.round(normalizeSize(item.style.width, 'width') / cellWidth.value);
      const { columnGap = 0 } = props.config.style;
      const offset = (cellNum - 1 ? cellNum - 1 : 0) * columnGap;
      item.style.width = cellNum * cellWidth.value + offset;
    }
    function wrapResizable (node: any, element: any) {
      return (
        <FreeDom
          width={normalizeSize(element.style.width, 'width')}
          height={normalizeSize(element.style.height, 'height')}
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
          onUpdate:width={(val: number) => { element.style.width = normalizeSize(val, 'width'); reOffsetAll(); }}
          onUpdate:height={(val: number) => { element.style.height = normalizeSize(val, 'height'); }}
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
    function normalizeSize (val: number | string, type: 'width' | 'height'): number {
      if (typeof val === 'string') {
        if (type === 'width') {
          return containerRect.width.value * parseFloat(val) * (val.endsWith('%') ? 0.01 : 1);
        } else {
          return containerRect.height.value * parseFloat(val) * (val.endsWith('%') ? 0.01 : 1);
        }
      } else {
        return val;
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
    const content = (element: any) => {
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
      <div
        ref="draggableRef"
        class={[
          'draggable-group',
          { 'is-preview': this.previewComp },
        ]}
        style={this.viewStyle}
      >
        {this.configComp.list.map(item => content(item))}
      </div>
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
