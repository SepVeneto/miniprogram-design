<script lang="tsx">
import { defineComponent } from 'vue';
import { Rank, CloseBold } from '@element-plus/icons-vue'

export default defineComponent({
  components: {
    Rank,
    CloseBold,
  },
  props: {
    dir: String,
    active: Boolean,
    mask: Boolean,
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
    return (
      <div
        class={['card', {'is-active': this.active}, `dir-${this.dir}`, {'has-mask': this.mask}]}
      >
        <div class='operate'>
          <el-icon class="operate-icon operate-move" color="#fff" size={20}><Rank /></el-icon>
          {this.$attrs.onDelete ? <el-icon
            class="operate-icon"
            color="#fff"
            size={20}
            onClick={this.handleDelete}
          ><close-bold /></el-icon> : null}
        </div>
        <div class="container">
          {this.$slots.default?.()}
        </div>
      </div>
    )
  }
})
</script>

<style lang="scss" scoped>
.card {
  position: relative;
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
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px dashed transparent;
    transition: all 0.3s;
    overflow: hidden;
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
</style>
