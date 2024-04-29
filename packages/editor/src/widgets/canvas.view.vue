<script lang="ts">
import CanvasToolbar from '@/components/CanvasToolbar.vue'
import CanvasNode from '@/components/CanvasNode.vue'
import { FreeScene } from '@sepveneto/free-dom'
import '@sepveneto/free-dom/css'
// import viewRender from 'widgets_side/viewRender';
import { computed, defineComponent, h, ref, shallowRef, watchEffect } from 'vue'
import {
  onKeyDown,
  // useResizeObserver
} from '@vueuse/core'
import { v4 as uuidv4 } from 'uuid'
import '@imengyu/vue3-context-menu/lib/vue3-context-menu.css'
import ContextMenu from '@imengyu/vue3-context-menu'
import { toFixed } from '@/utils'
import { WIDGET_TOP_BAR_HEIGHT } from '@/constants'
import { useHistory } from '@/store'

export default defineComponent({
  props: {
    config: {
      type: Object,
      default: () => ({}),
    },
    preview: Boolean,
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const history = useHistory()
    const menuRef = ref()
    const showMenu = ref(false)
    const menuStyle = ref({})
    const sceneRef = ref<InstanceType<typeof FreeScene>>()
    const width = ref()
    const height = ref()
    const selected = ref()
    const pos = ref({ x: 0, y: 0, h: 0 })
    const isMoving = ref(false)
    const toolbarRef = ref<InstanceType<typeof CanvasToolbar> | undefined>()
    const diff = ref(0)

    // !props.preview && useResizeObserver(sceneRef, (entries) => {
    //   const entry = entries[0]
    //   const { width: w, height: h } = entry.contentRect
    //   width.value = w
    //   height.value = h
    //   configComp.value.style = {
    //     ...configComp.value.style,
    //     width: w,
    //     height: h,
    //   }
    // })

    const sceneStyle = computed(() => {
      return { width: '100%', height: '100%' }
    })
    const configComp = computed<any>({
      get() {
        return props.config
      },
      set(val) {
        emit('update:modelValue', val)
      },
    })
    const showToolbar = computed(() => {
      return (selected.value && !isMoving.value) ? 'flex' : 'none'
    })

    const nodeList = ref<any[]>([])
    watchEffect(() => {
      nodeList.value = configComp.value.template.list
    })
    const listener = shallowRef(function () { /* empty */ })

    function listenKeyboard() {
      const stopDown = onKeyDown('ArrowDown', (evt) => {
        evt.preventDefault()
        selected.value.style.y += 1
      })
      const stopUp = onKeyDown('ArrowUp', (evt) => {
        evt.preventDefault()
        selected.value.style.y -= 1
      })
      const stopLeft = onKeyDown('ArrowLeft', (evt) => {
        evt.preventDefault()
        selected.value.style.x -= 1
      })
      const stopRight = onKeyDown('ArrowRight', (evt) => {
        evt.preventDefault()
        selected.value.style.x += 1
      })
      return () => {
        stopDown()
        stopUp()
        stopLeft()
        stopRight()
      }
    }
    function handleAdd(type: 'text' | 'image', pos: { x: number, y: number }) {
      const text = { content: '双击输入内容', style: { fontSize: 12, ...pos } }
      const image = { src: '', style: { ...pos } }
      const extra = type === 'text' ? text : image
      configComp.value.template.list.push({
        _uuid: uuidv4(),
        type,
        ...extra,
      })
      showMenu.value = false
      history.create('添加元素')
    }
    function handleContextmenu(evt: PointerEvent, data?: any) {
      evt.preventDefault()
      const { offsetX, offsetY } = evt
      selected.value = data
      const type = data?.type
      const nodeOptions = [
        { label: '文本', onClick: () => handleAdd('text', { x: toFixed(offsetX), y: toFixed(offsetY) }) },
        { label: '图片', onClick: () => handleAdd('image', { x: toFixed(offsetX), y: toFixed(offsetY) }) },
      ]
      const baseOptions = [
        {
          type: 'delete',
          label: '删除',
          onClick: () => {
            const { list } = configComp.value.template
            const index = list.findIndex(item => item._uuid === data._uuid)
            list.splice(index, 1)
            history.create('删除元素')
          },
        },
        {
          type: 'copy',
          label: '复制',
          divided: true,
          onClick: () => {
            const { list } = configComp.value.template
            list.push({
              ...data,
              _uuid: uuidv4(),
            })
            history.create('复制元素')
          },
        },

        { type: 'prev', label: '上一层', onClick: () => setZIndex('prev', data) },
        { type: 'next', label: '下一层', onClick: () => setZIndex('next', data) },
        { type: 'top', label: '置于顶部', onClick: () => setZIndex('top', data) },
        { type: 'bottom', label: '置于底部', onClick: () => setZIndex('bottom', data) },
      ]
      const options = type ? baseOptions : nodeOptions
      ContextMenu.showContextMenu({
        x: evt.x,
        y: evt.y,
        items: options,
      })
    }

    function setZIndex(action: 'top' | 'bottom' | 'next' | 'prev', data: any) {
      // TODO: optimize
      let currentIndex = data.style.zIndex
      const hasIndex = currentIndex != null
      if (!hasIndex) {
        currentIndex = 0
      }
      switch (action) {
        case 'top':
          currentIndex = 999
          break
        case 'bottom':
          currentIndex = 0
          break
        case 'next':
          currentIndex -= 1
          break
        case 'prev':
          currentIndex += 1
          break
      }
      currentIndex = Math.max(currentIndex, 0)
      data.style.zIndex = currentIndex
    }

    return {
      listener,
      listenKeyboard,
      diff,
      pos,
      showMenu,
      menuStyle,
      nodeList,
      width,
      height,
      sceneStyle,
      sceneRef,
      menuRef,
      selected,
      isMoving,
      showToolbar,
      toolbarRef,
      history,
      handleAdd,
      handleContextmenu,
    }
  },
  render() {
    const genNode = (node: any, index: number) => h(
      CanvasNode,
      {
        key: node._uuid,
        modelValue: node,
        preview: this.preview,
        active: node._uuid === this.selected?._uuid,
        toolbar: this.toolbarRef,
        onClick: (evt: Event) => {
          if (this.preview) return
          evt.stopPropagation()
          this.pos = node.style
          this.selected = node
        },
        onClickOutside: () => {
          this.listener()
          this.selected = undefined
        },
        'onUpdate:modelValue': (val: any) => {
          this.nodeList[index] = val
        },
        onContextmenu: (evt: PointerEvent) => {
          evt.stopPropagation()
          this.handleContextmenu(evt, node)
        },
        onMove: () => {
          this.diff = 2
          this.isMoving = true
        },
        onMoveStop: (pos?: any) => {
          this.diff = 0
          pos && (this.pos = pos)
          this.isMoving = false
        },
      },
    )
    const genScene = () => h(
      FreeScene,
      {
        ref: 'sceneRef',
        diff: this.diff,
        scale: ['rb', 'b', 'r'],
        width: this.width,
        height: this.height,
        style: this.sceneStyle,
        minHeight: 24,
        onContextmenu: this.handleContextmenu,
      },
      () => this.nodeList.map(genNode),
    )
    const genToolbar = () => h(
      CanvasToolbar,
      {
        ref: (vm) => { vm && (this.toolbarRef = vm) },
        modelValue: this.selected,
        style: {
          position: 'absolute',
          top: `${this.pos.y + this.pos.h + WIDGET_TOP_BAR_HEIGHT + 2}px`,
          left: `${this.pos.x}px`,
          display: this.showToolbar,
        },
      },
    )
    return this.preview
      ? genScene()
      : h('fragment', [genScene(), genToolbar()])
  },
})
</script>

<style scoped lang="scss">

</style>
