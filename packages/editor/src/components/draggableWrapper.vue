<script lang="ts">
import { computed, defineComponent, h } from 'vue'
import { Hide, Rank as IconRank } from '@element-plus/icons-vue'
import { normalizeStyle } from '@/utils'
import { ElIcon } from 'element-plus'
import { WIDGET_TOP_BAR_HEIGHT } from '@/constants'
import { useState } from '@/store'

export default defineComponent({
  props: {
    customStyle: {
      type: Object,
      default: () => ({}),
    },
    container: Boolean,
    dir: {
      type: String,
      default: 'top',
    },
    name: {
      type: String,
      default: '',
    },
    active: Boolean,
    mask: Boolean,
    disabled: Boolean,
    hide: Boolean,
    canDelete: Boolean,
  },
  setup(props) {
    const state = useState()
    const isActive = computed(() => {
      return props.active || state.dragging
    })
    const wrapStyle = computed(() => {
      const { height, ...style } = props.customStyle
      // 为了保证编辑模式里高度能按照设定的正常显示，这里高度额外加上了操作栏的高度 18px
      const _height = height + (isActive.value ? WIDGET_TOP_BAR_HEIGHT : 0)
      return normalizeStyle({ ...style, height: typeof height === 'number' ? _height : 'auto' })
    })
    return {
      wrapStyle,
      isActive,
    }
  },
  render() {
    const operate = () => {
      const iconRank = h(ElIcon, {
        class: 'operate-icon operate-move',
        size: WIDGET_TOP_BAR_HEIGHT,
      }, () => h(IconRank))
      return h('div', {
        class: 'operate',
      }, [iconRank, h('span', this.name)])
    }
    const hidden = () => h(
      'div',
      { class: 'hide-mask' },
      () => h(ElIcon, {
        size: 40,
        color: '#fff',
      }, h(Hide)),
    )

    return h(
      'div',
      {
        class: [
          'card',
          { 'is-active': this.isActive },
          `dir-${this.dir}`,
          { 'has-mask': this.mask },
          { 'is-container': this.container },
        ],
        style: this.wrapStyle,
      }, [
        !this.disabled && operate(),
        this.$slots.default?.(),
        this.hide && hidden(),
      ],
    )
  },
})
</script>

<style lang="scss" scoped>
.card :deep(img) {
  vertical-align: top;
}

.card {
  --item-color: #79bbff;
  --container-color: #eebe77;
  --top: 0px;
  box-sizing: border-box;
  position: relative;
  padding-top: var(--top);
  transition: outline-color,padding-top 0.2s;
  outline: 1px dashed transparent;
  &:hover, &.is-active {
    --top: 18px;
  }
  .operate {
    font-size: 14px;
    display: flex;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 18px;
    color: #fff;
    transition: all 0.2s;
    opacity: 0;
    background: var(--item-color);
    cursor: move;
    &>span {
      margin-left: 10px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
  & ~ :deep(.vv-resize-dom--handler) {
    opacity: 0;
  }
  &.is-active ~ :deep(.vv-resize-dom--handler) {
    opacity: 1;
  }
  &.is-active > .operate {
    opacity: 1;
  }
  &:hover > .operate {
    opacity: 1;
  }
  &.is-active.is-container > .operate {
    background: var(--container-color);
  }
  &:hover.is-container > .operate {
    background: var(--container-color);
  }
  &:hover, &.is-active {
    outline-color: var(--item-color);
  }
  &:hover.is-container, &.is-active.is-container {
    outline-color: var(--container-color);
  }
}
.hide-mask {
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  background: rgb(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>

<style lang="scss">
.free-dom__widget-wrapper {
  > .card, .container {
    width: 100%;
    height: 100%;
  }

}
</style>
