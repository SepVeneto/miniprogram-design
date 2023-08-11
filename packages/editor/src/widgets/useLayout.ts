import { h, withModifiers } from 'vue'
import { freeDom as FreeDom } from '@sepveneto/free-dom'
import draggableWrapper from '@/components/draggableWrapper.vue'

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
          ), element)
    }

export function useLayout(type: 'grid' | 'swiper', options) {


  function genGrid() {
    function wrapResizable(node: any, element: any) {
      return h(FreeDom, {
        width: normalizeSize(element.style.width, 'width'),
        height: normalizeSize(element.style.height, 'height'),
        x: 0,
        y: 0,
        preview: options.preview,
        scale: ['rb'],
        absolute: true,
        diagonal: false,
        grid: [cellWidth.value, 1],
        hardler: 'mark',
        onDragStart,
        onDragEnd,
        onMouseenter: withModifiers(() => onEnter(element._uuid), ['stop']),
        onMouseleave: withModifiers(onLeave, ['stop']),
        onClick: withModifiers(() => handleSelect(element), ['stop'])
        'onUpdate:width': (val: number) => { element.style.width = normalizeSize(val, 'width'); reOffsetAll() }
        'onUpdate:height': (val: number) => { element.style.height = normalizeSize(val, 'height') }
      }, node)
    }
    function renderItem(element) {
      return options.preview
        ? h(DraggableWrapper, {
            dir: 'top',
            active: selected.value._uuid === element._uuid || activeUuid.value === element._uuid
            hide: element.isShow != null && !element.isShow
            mask: true,
          })
        : h('div"')
    }
    function getRenderContent(element: any) {
      switch (element._view) {
        case 'container':
          return
        default:
          return ViewRender.value
            ? <ViewRender.value
              type={element._view}
              config={element}
            />
            : null
      }
    }
    function renderWrap(slots) {
      return h('div', {
        ref: 'draggableRef',
        class: ['draggable-group', 'is-preview' && options.preview],
        style: options.style,
      }, slots)
    }
  }

  function renderGrid(list) {
    return renderWrap(list.map(item => renderItem(item)))
  }

  return {
  }
}

function normalizeSize(val: number | string, type: 'width' | 'height'): number {
  if (typeof val === 'string') {
    if (type === 'width') {
      return containerRect.width.value * parseFloat(val) * (val.endsWith('%') ? 0.01 : 1)
    } else {
      return containerRect.height.value * parseFloat(val) * (val.endsWith('%') ? 0.01 : 1)
    }
  } else {
    return val
  }
}
