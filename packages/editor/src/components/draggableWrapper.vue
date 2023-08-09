<script lang="tsx">
import { defineComponent, computed } from 'vue';
import { Rank, CloseBold, Hide } from '@element-plus/icons-vue';
import { useNormalizeStyle } from '@sepveneto/mpd-hooks';

export default defineComponent({
  components: {
    Rank,
    CloseBold,
  },
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
  },
  emits: ['delete'],
  setup (props, { emit }) {
    const wrapStyle = useNormalizeStyle(props.customStyle);
    function handleDelete () {
      emit('delete');
    }
    return {
      wrapStyle,
      handleDelete,
    };
  },
  render () {
    const operate = () => (
      <div class='operate'>
        <el-icon class="operate-icon operate-move" color="#fff" size={18}><Rank /></el-icon>
        {this.$attrs.onDelete
          ? <el-icon
          class="operate-icon"
          color="#fff"
          size={18}
          onClick={this.handleDelete}
        ><close-bold /></el-icon>
          : null}
      </div>
    );
    const hidden = () => (
      <div class="hide-mask"><el-icon size={40} color="#fff"><Hide /></el-icon></div>
    );
    return (
      <div
        class={[
          'card',
          { 'is-active': this.active },
          `dir-${this.dir}`,
          { 'has-mask': this.mask },
          { 'is-container': this.container },
        ]}
        style={this.wrapStyle}
      >
        {!this.disabled && operate()}
        <div class="container">
          {this.$slots.default?.()}
        </div>
        {this.hide && hidden()}
      </div>
    );
  },
});
</script>

<style lang="scss" scoped>
.card {
  &:first-child.is-container {
    margin-top: 18px;
  }
  position: relative;
  &.is-active > .container {
    &::after {
      top: 0;
      left: 0;
      position: absolute;
      content: '';
      display: block;
      width: 100%;
      height: 100%;
      box-sizing: border-box;
      border: 1px dashed #4089ef;
      z-index: 1;
      pointer-events: none;
    }
  }
  &.dir-top {
    .operate {
      top: 0;
      left: 0;
      .operate-icon {
        color: #222;
      }
    }
  }
  &.dir-right > .operate {
    height: 50px;
    right: 0;
    transform: translateX(50%);
    .operate-icon {
      &:last-child {
        cursor: pointer;
      }
      &::before{
        content: '';
        display: block;
        width: 24px;
        height: 24px;
        border-radius: 50%;
        background: #999;
        position: absolute;
      }
    }
  }
  &.is-active > .operate, &:hover > .operate {
    display: flex;
  }
  &.is-container > .operate {
    border: 1px dashed #E6A23C;
    border-bottom: none;
    transform: translateY(-100%);
  }
  &.is-active.is-container > .container {
    &::after {
      top: 0;
      position: absolute;
      content: '';
      width: 100%;
      height: 100%;
      border: 1px dashed #E6A23C;
      box-sizing: border-box;
      // z-index: 1;
      pointer-events: none;
    }
  }
  .operate {
    display: none;
    position: absolute;
    flex-direction: column;
    justify-content: space-between;
    z-index: 1;
    .operate-icon {
      cursor: move;
      & > svg {
        z-index: 1;
      }
    }
  }
  .container {
    width: 100%;
    height: 100%;
    transition: all 0.3s;
  }
  &.dir-right:not(:last-child) {
    margin-bottom: 20px;
  }
  &.dir-right .container {
    display: block;
    padding: 10px;
  }
  &.has-mask {
    &::before {
      position: absolute;
      content: '';
      display: block;
      width: 100%;
      height: 100%;
      box-sizing: border-box;
    }
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
