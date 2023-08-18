<template>
  <div class="box-model margin-box">
    <span class="box-label">外边距</span>
    <span class="box-num box-num--top">
      <SizeBoxInput
        v-model="marginTop"
        placeholder="-"
      />
    </span>
    <span class="box-num box-num--right">
      <SizeBoxInput
        v-model="marginRight"
        placeholder="-"
      />
    </span>
    <span class="box-num box-num--bottom">
      <SizeBoxInput
        v-model="marginBottom"
        placeholder="-"
      />
    </span>
    <span class="box-num box-num--left">
      <SizeBoxInput
        v-model="marginLeft"
        placeholder="-"
      />
    </span>
    <div class="box-model border-box">
      <span class="box-label">边框</span>
      <span class="box-num box-num--top">
        <SizeBoxInput
          v-model="borderTop"
          placeholder="-"
        />
      </span>
      <span class="box-num box-num--right">
        <SizeBoxInput
          v-model="borderRight"
          placeholder="-"
        />
      </span>
      <span class="box-num box-num--bottom">
        <SizeBoxInput
          v-model="borderBottom"
          placeholder="-"
        />
      </span>
      <span class="box-num box-num--left">
        <SizeBoxInput
          v-model="borderLeft"
          placeholder="-"
        />
      </span>
      <div class="box-model padding-box">
        <span class="box-label">内边距</span>
        <span class="box-num box-num--top">
          <SizeBoxInput
            v-model="paddingTop"
            placeholder="-"
          />
        </span>
        <span class="box-num box-num--right">
          <SizeBoxInput
            v-model="paddingRight"
            placeholder="-"
          />
        </span>
        <span class="box-num box-num--bottom">
          <SizeBoxInput
            v-model="paddingBottom"
            placeholder="-"
          />
        </span>
        <span class="box-num box-num--left">
          <SizeBoxInput
            v-model="paddingLeft"
            placeholder="-"
          />
        </span>
        <div class="box-model size-box">
          <SizeBoxInput v-model="boxWidth" />
          <span>x</span>
          <SizeBoxInput v-model="boxHeight" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import type { PropType } from 'vue'
import SizeBoxInput from './SizeBox.input.vue'

const numberType = {
  type: Number,
  default: undefined,
}
enum DIRECT {
  TOP,
  RIGHT,
  BOTTOM,
  LEFT,
}
export default defineComponent({
  components: {
    SizeBoxInput,
  },
  directives: {
    focus: {
      mounted: (el) => el.focus(),
    },
  },
  props: {
    margin: {
      type: Array as PropType<number[]>,
      default: () => ([]),
    },
    border: {
      type: Array as PropType<number[]>,
      default: () => ([]),
    },
    padding: {
      type: Array as PropType<number[]>,
      default: () => ([]),
    },
    width: numberType,
    height: numberType,
  },
  emits: ['update:margin', 'update:padding', 'update:width', 'update:height', 'update:border'],
  setup(props, { emit }) {
    const boxWidth = computed<number>({
      get() {
        return props.width || 0
      },
      set(val) {
        emit('update:width', val)
      },
    })
    const boxHeight = computed<number>({
      get() {
        return props.height || 0
      },
      set(val) {
        emit('update:height', val)
      },
    })
    const marginTop = computed<number>({
      get() {
        return props.margin[DIRECT.TOP] || 0
      },
      set(val) {
        const list = [...props.margin]
        list.splice(DIRECT.TOP, 1, val)
        emit('update:margin', list)
      },
    })
    const marginRight = computed<number>({
      get() {
        return props.margin[DIRECT.RIGHT] || 0
      },
      set(val) {
        const list = [...props.margin]
        list.splice(DIRECT.RIGHT, 1, val)
        emit('update:margin', list)
      },
    })
    const marginBottom = computed<number>({
      get() {
        return props.margin[DIRECT.BOTTOM] || 0
      },
      set(val) {
        const list = [...props.margin]
        list.splice(DIRECT.BOTTOM, 1, val)
        emit('update:margin', list)
      },
    })
    const marginLeft = computed<number>({
      get() {
        return props.margin[DIRECT.LEFT] || 0
      },
      set(val) {
        const list = [...props.margin]
        list.splice(DIRECT.LEFT, 1, val)
        emit('update:margin', list)
      },
    })
    const paddingTop = computed<number>({
      get() {
        return props.padding[DIRECT.TOP] || 0
      },
      set(val) {
        const list = [...props.padding]
        list.splice(DIRECT.TOP, 1, val)
        emit('update:padding', list)
      },
    })
    const paddingRight = computed<number>({
      get() {
        return props.padding[DIRECT.RIGHT] || 0
      },
      set(val) {
        const list = [...props.padding]
        list.splice(DIRECT.RIGHT, 1, val)
        emit('update:padding', list)
      },
    })
    const paddingBottom = computed<number>({
      get() {
        return props.padding[DIRECT.BOTTOM] || 0
      },
      set(val) {
        const list = [...props.padding]
        list.splice(DIRECT.BOTTOM, 1, val)
        emit('update:padding', list)
      },
    })
    const paddingLeft = computed<number>({
      get() {
        return props.padding[DIRECT.LEFT] || 0
      },
      set(val) {
        const list = [...props.padding]
        list.splice(DIRECT.LEFT, 1, val)
        emit('update:padding', list)
      },
    })
    const borderTop = computed<number>({
      get() {
        return props.border[DIRECT.TOP] || 0
      },
      set(val) {
        const list = [...props.border]
        list.splice(DIRECT.TOP, 1, val)
        emit('update:border', list)
      },
    })
    const borderRight = computed<number>({
      get() {
        return props.border[DIRECT.RIGHT] || 0
      },
      set(val) {
        const list = [...props.border]
        list.splice(DIRECT.RIGHT, 1, val)
        emit('update:border', list)
      },
    })
    const borderBottom = computed<number>({
      get() {
        return props.border[DIRECT.BOTTOM] || 0
      },
      set(val) {
        const list = [...props.border]
        list.splice(DIRECT.BOTTOM, 1, val)
        emit('update:border', list)
      },
    })
    const borderLeft = computed<number>({
      get() {
        return props.border[DIRECT.LEFT] || 0
      },
      set(val) {
        const list = [...props.border]
        list.splice(DIRECT.LEFT, 1, val)
        emit('update:border', list)
      },
    })
    return {
      boxWidth,
      boxHeight,
      marginTop,
      marginRight,
      marginBottom,
      marginLeft,
      paddingTop,
      paddingRight,
      paddingBottom,
      paddingLeft,
      borderTop,
      borderRight,
      borderBottom,
      borderLeft,
      DIRECT,
    }
  },
})
</script>

<style lang="scss" setup>
.box-model {
  position: relative;
  padding: 30px;
  user-select: none;
  .box-label {
    position: absolute;
    top: 0;
    left: 4px;
  }
  .box-num {
    position: absolute;
    text-align: center;
    line-height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    &.box-num--top {
      left: 0;
      right: 0;
      top: 0;
    }
    &.box-num--right {
      right: 0;
      top: 0;
      bottom: 0;
      width: 30px;
    }
    &.box-num--bottom {
      left: 0;
      right: 0;
      bottom: 0;
    }
    &.box-num--left {
      left: 0;
      top: 0;
      bottom: 0;
      width: 30px;
    }
  }
  &.margin-box {
    border: 1px dashed;
    background: rgb(249,204,157);
  }
  &.border-box {
    border: 1px solid;
    background: rgb(253,221,155);
  }
  &.padding-box {
    border: 1px dashed;
    background: rgb(195,208,139);
  }
  &.size-box {
    display: flex;
    justify-content: center;
    align-items: center;
    border: 2px solid;
    background: rgb(140,182,192);
    min-width: 120px;
    min-height: 30px;
    padding: 0;
  }
}
</style>
