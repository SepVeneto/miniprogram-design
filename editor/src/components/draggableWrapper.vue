<script lang="tsx">
import { defineComponent } from 'vue';
import { Rank, CloseBold, Hide } from '@element-plus/icons-vue'

export default defineComponent({
  components: {
    Rank,
    CloseBold,
  },
  props: {
    container: Boolean,
    dir: String,
    active: Boolean,
    mask: Boolean,
    disabled: Boolean,
    hide: Boolean,
  },
  setup(props, { emit }) {
    function handleDelete() {
      emit('delete')
    }
    return {
      handleDelete,
    }
  },
  render() {
    const operate = () => (
      <div class='operate'>
        <el-icon class="operate-icon operate-move" color="#fff" size={20}><Rank /></el-icon>
        {this.$attrs.onDelete ? <el-icon
          class="operate-icon"
          color="#fff"
          size={20}
          onClick={this.handleDelete}
        ><close-bold /></el-icon> : null}
      </div>
    )
    const hidden = () => (
      <div class="hide-mask"><el-icon size={40} color="#fff"><Hide /></el-icon></div>
    )
    return (
      <div
        class={[
          'card',
          {'is-active': this.active},
          `dir-${this.dir}`,
          {'has-mask': this.mask},
          {'is-container': this.container}
        ]}
      >
        {!this.disabled && operate()}
        <div class="container">
          {this.$slots.default?.()}
        </div>
        {this.hide && hidden()}
      </div>
    )
  }
})
</script>

<style lang="scss" scoped>
.card {
  position: relative;
  &.is-container > .container {
    padding: 10px;
  }
  &.dir-top {
    overflow: hidden;
    .operate {
      top: 0;
      left: 50%;
      transform: translateX(-50%);
      .operate-icon {
        color: #222;
        &::before {
          content: '';
          display: block;
          width: 40px;
          height: 32px;
          border-radius: 50%;
          box-shadow: 0 0 4px;
          background: #fff;
          position: absolute;
          top: -50%;
          left: 50%;
          transform: translateX(-50%);
        }
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
  &.is-active > .container, &:hover > .container{
    border: 1px dashed #4089ef;
  }
  &.is-active.is-container > .container, &.is-container:hover > .container {
    border: 1px dashed #E6A23C;
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
    // right: -50%;
  }
  .container {
    // display: flex;
    // justify-content: center;
    // align-items: center;
    border: 1px dashed transparent;
    transition: all 0.3s;
    overflow: hidden;
    // &.is-container {
    //   display: grid;
    // }
  }
  &.dir-right:not(:last-child) {
    margin-bottom: 20px;
  }
  &.dir-right .container {
    display: block;
    padding: 10px;
  }
  &.has-mask {
    .container::before {
      position: absolute;
      content: '';
      display: block;
      width: 100%;
      height: 100%;
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
