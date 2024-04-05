<script lang="ts">
import { computed, defineComponent, h } from 'vue'
import { CloseBold, Hide, Rank as IconRank } from '@element-plus/icons-vue'
import { normalizeStyle } from '@/utils'
import { ElIcon } from 'element-plus'

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
    active: Boolean,
    mask: Boolean,
    disabled: Boolean,
    hide: Boolean,
    canDelete: Boolean,
  },
  emits: ['delete'],
  setup(props, { emit }) {
    const wrapStyle = computed(() => {
      return normalizeStyle(props.customStyle)
    })
    function handleDelete() {
      emit('delete')
    }
    return {
      wrapStyle,
      handleDelete,
    }
  },
  render() {
    const operate = () => {
      const iconRank = h(ElIcon, {
        class: 'operate-icon operate-move',
        color: '#fff',
        size: 18,
      }, () => h(IconRank))
      const iconClose = h(ElIcon, {
        class: 'operate-icon',
        color: '#fff',
        size: 18,
        onClick: this.handleDelete,
      }, () => h(CloseBold))
      return h('div', {
        class: 'operate',
      }, [iconRank, this.canDelete ? iconClose : null])
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
          { 'is-active': this.active },
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
.card {
  box-sizing: border-box;
  // &:first-child.is-container {
  //   margin-top: 18px;
  // }
  position: relative;
  padding-top: 18px;
  outline: 1px dashed #79bbff;
  &.is-container {
    outline: 1px dashed #eebe77;
    & > .operate {
      background: #eebe77;
    }
  }
  .operate {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 18px;
    cursor: move;
    background: #79bbff;
  }
  // &.is-active > .container {
  //   &::after {
  //     top: 0;
  //     left: 0;
  //     position: absolute;
  //     content: '';
  //     display: block;
  //     width: 100%;
  //     height: 100%;
  //     box-sizing: border-box;
  //     outline: 1px dashed #4089ef;
  //     z-index: 1;
  //     pointer-events: none;
  //   }
  // }
  // &.dir-top {
  //   .operate {
  //     top: 0;
  //     right: 0;
  //     left: 0;
  //     background: #a7c9f8;
  //     .operate-icon {
  //       background: transparent;
  //       color: #fff;
  //     }
  //   }
  // }
  // &.is-active > .operate, &:hover > .operate {
  //   display: flex;
  // }
  // &.is-container > .operate {
  //   outline: 1px dashed #E6A23C;
  //   background: #ffd089;
  //   border-bottom: none;
  // }
  // &.is-active.is-container > .container {
  //   &::after {
  //     top: 0;
  //     position: absolute;
  //     content: '';
  //     width: 100%;
  //     height: 100%;
  //     outline: 1px dashed #E6A23C;
  //     box-sizing: border-box;
  //     // z-index: 1;
  //     pointer-events: none;
  //   }
  // }
  // .operate {
  //   cursor: move;
  //   // display: none;
  //   position: absolute;
  //   flex-direction: column;
  //   justify-content: space-between;
  //   z-index: 1;
  //   .operate-icon {
  //     & > svg {
  //       z-index: 2;
  //     }
  //   }
  // }
  // .container {
  //   width: 100%;
  //   height: 100%;
  //   transition: all 0.3s;
  // }
  // &.dir-right:not(:last-child) {
  //   margin-bottom: 20px;
  // }
  // &.dir-right .container {
  //   display: block;
  //   padding: 10px;
  //   box-sizing: border-box;
  // }
  // &.has-mask {
  //   &::before {
  //     position: absolute;
  //     content: '';
  //     display: block;
  //     width: 100%;
  //     height: 100%;
  //     box-sizing: border-box;
  //   }
  // }
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
