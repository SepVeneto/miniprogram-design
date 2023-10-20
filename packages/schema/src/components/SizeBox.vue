<script lang="ts">
import { computed, defineComponent, h } from 'vue'
import type { PropType, VNode } from 'vue'
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
    include: {
      type: Array as PropType<string[]>,
      default: () => ([]),
    },
    exclude: {
      type: Array as PropType<string[]>,
      default: () => ([]),
    },
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
    const boxHeight = computed<number | 'auto'>({
      get() {
        return props.height == null ? 'auto' : props.height
      },
      set(val) {
        emit('update:height', val)
      },
    })
    const marginTop = computed<number>({
      get() {
        return props.margin[DIRECT.TOP] ?? '-'
      },
      set(val) {
        const list = [...props.margin]
        list.splice(DIRECT.TOP, 1, val)
        emit('update:margin', list)
      },
    })
    const marginRight = computed<number>({
      get() {
        return props.margin[DIRECT.RIGHT] ?? '-'
      },
      set(val) {
        const list = [...props.margin]
        list.splice(DIRECT.RIGHT, 1, val)
        emit('update:margin', list)
      },
    })
    const marginBottom = computed<number>({
      get() {
        return props.margin[DIRECT.BOTTOM] ?? '-'
      },
      set(val) {
        const list = [...props.margin]
        list.splice(DIRECT.BOTTOM, 1, val)
        emit('update:margin', list)
      },
    })
    const marginLeft = computed<number>({
      get() {
        return props.margin[DIRECT.LEFT] ?? '-'
      },
      set(val) {
        const list = [...props.margin]
        list.splice(DIRECT.LEFT, 1, val)
        emit('update:margin', list)
      },
    })
    const paddingTop = computed<number>({
      get() {
        return props.padding[DIRECT.TOP] ?? '-'
      },
      set(val) {
        const list = [...props.padding]
        list.splice(DIRECT.TOP, 1, val)
        emit('update:padding', list)
      },
    })
    const paddingRight = computed<number>({
      get() {
        return props.padding[DIRECT.RIGHT] ?? '-'
      },
      set(val) {
        const list = [...props.padding]
        list.splice(DIRECT.RIGHT, 1, val)
        emit('update:padding', list)
      },
    })
    const paddingBottom = computed<number>({
      get() {
        return props.padding[DIRECT.BOTTOM] ?? '-'
      },
      set(val) {
        const list = [...props.padding]
        list.splice(DIRECT.BOTTOM, 1, val)
        emit('update:padding', list)
      },
    })
    const paddingLeft = computed<number>({
      get() {
        return props.padding[DIRECT.LEFT] ?? '-'
      },
      set(val) {
        const list = [...props.padding]
        list.splice(DIRECT.LEFT, 1, val)
        emit('update:padding', list)
      },
    })
    const borderTop = computed<number>({
      get() {
        return props.border[DIRECT.TOP] ?? '-'
      },
      set(val) {
        const list = [...props.border]
        list.splice(DIRECT.TOP, 1, val)
        emit('update:border', list)
      },
    })
    const borderRight = computed<number>({
      get() {
        return props.border[DIRECT.RIGHT] ?? '-'
      },
      set(val) {
        const list = [...props.border]
        list.splice(DIRECT.RIGHT, 1, val)
        emit('update:border', list)
      },
    })
    const borderBottom = computed<number>({
      get() {
        return props.border[DIRECT.BOTTOM] ?? '-'
      },
      set(val) {
        const list = [...props.border]
        list.splice(DIRECT.BOTTOM, 1, val)
        emit('update:border', list)
      },
    })
    const borderLeft = computed<number>({
      get() {
        return props.border[DIRECT.LEFT] ?? '-'
      },
      set(val) {
        const list = [...props.border]
        list.splice(DIRECT.LEFT, 1, val)
        emit('update:border', list)
      },
    })
    const DIR = ['top', 'right', 'bottom', 'left'] as const
    function filterDir(type: 'padding' | 'margin' | 'border') {
      return DIR.filter(item => {
        const name = `${type}${item[0].toUpperCase()}${item.slice(1)}`
        return (!props.exclude.includes(type) && !props.exclude.includes(name)) &&
        (props.include.length === 0 ||
        props.include.includes(type) ||
        props.include.includes(name))
      })
    }
    const marginDir = computed(() => filterDir('margin'))
    const paddingDir = computed(() => filterDir('padding'))
    const borderDir = computed(() => filterDir('border'))
    return {
      DIR,
      filterDir,
      marginDir,
      paddingDir,
      borderDir,
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

  render() {
    const genInput = (
      type: 'margin' | 'padding' | 'border',
      dir: 'top' | 'right' | 'bottom' | 'left',
      enable = true,
    ) => {
      const name = `${type}${dir[0].toUpperCase()}${dir.slice(1)}`
      return h(SizeBoxInput, {
        key: name,
        modelValue: this[name],
        'onUpdate:modelValue': (val: number) => { this[name] = val },
        placeholder: '-',
        disabled: !enable,
      })
    }
    const marginBox = (node: VNode) => h('div', {
      class: ['box-model', 'margin-box'],
      key: 'margin',
    }, [
      h('span', { class: 'box-label' }, '外边距'),
      this.DIR.map((item, index) => h('span', {
        class: ['box-num', `box-num--${item}`],
        key: index,
      }, genInput('margin', item, this.marginDir.includes(item)))),
      node,
    ])
    const paddingBox = (node: VNode) => h('div', {
      class: ['box-model', 'padding-box'],
    }, [
      h('span', { class: 'box-label' }, '内边距'),
      this.DIR.map((item, index) => h('span', {
        class: ['box-num', `box-num--${item}`],
        key: index,
      }, genInput('padding', item, this.paddingDir.includes(item)))),
      node,
    ])
    const borderBox = (node: VNode) => h('div', {
      class: ['box-model', 'border-box'],
    }, [
      h('span', { class: 'box-label' }, '边框'),
      this.DIR.map((item, index) => h('span', {
        class: ['box-num', `box-num--${item}`],
        key: index,
      }, genInput('border', item, this.borderDir.includes(item)))),
      node,
    ])
    const sizeBox = () => h('div', {
      class: ['box-model', 'size-box'],
    },
    [
      h(SizeBoxInput, {
        modelValue: this.boxWidth,
        'onUpdate:modelValue': (val: number) => { this.boxWidth = val },
        title: '宽度 = 边框 + 内边距 + 内容的宽度',
      }),
      h('span', 'x'),
      h(SizeBoxInput, {
        modelValue: this.boxHeight,
        'onUpdate:modelValue': (val: number) => { this.boxHeight = val },
        title: '高度 = 边框 + 内边距 + 内容的高度',
      }),
    ],
    )
    return marginBox(borderBox(paddingBox(sizeBox())))
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
