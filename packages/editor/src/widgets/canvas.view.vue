<script lang="ts">
import CanvasToolbar from '@/components/CanvasContext.vue'
import CanvasNode from '@/components/CanvasNode.vue'
import { FreeScene } from '@sepveneto/free-dom'
import '@sepveneto/free-dom/css'
// import viewRender from 'widgets_side/viewRender';
import { computed, defineComponent, h, ref, watchEffect } from 'vue'
import { useApp } from '@/store'
import { onClickOutside, useResizeObserver } from '@vueuse/core'
import { v4 as uuidv4 } from 'uuid'
import '@imengyu/vue3-context-menu/lib/vue3-context-menu.css'
import ContextMenu from '@imengyu/vue3-context-menu'

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
    const app = useApp()
    const menuRef = ref()
    const showMenu = ref(false)
    const menuStyle = ref({})
    const sceneRef = ref<InstanceType<typeof FreeScene>>()
    const width = ref()
    const height = ref()
    const selected = ref()
    const pos = ref({ x: 0, y: 0 })
    const isMoving = ref(false)
    const toolbarRef = ref<InstanceType<typeof CanvasToolbar>>()

    !props.preview && useResizeObserver(sceneRef, (entries) => {
      const entry = entries[0]
      const { width: w, height: h } = entry.contentRect
      width.value = w
      height.value = h
      configComp.value.style = {
        ...configComp.value.style,
        width: w,
        height: h,
      }
    })

    const sceneStyle = computed(() => {
      if (!props.preview) return { width: '100%', height: '100%' }
      return {
        width: `${width.value}px`,
        height: `${height.value}px`,
      }
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

    function handleAdd(type: 'text' | 'image') {
      const extra = type === 'text' ? { content: '请输入内容', style: { fontSize: 12 } } : { src: '' }
      configComp.value.template.list.push({
        _uuid: uuidv4(),
        type,
        ...extra,
      })
      showMenu.value = false
    }
    function handleContextmenu(evt: PointerEvent, data?: any) {
      evt.preventDefault()
      selected.value = data
      const type = data?.type
      const nodeOptions = [
        { label: '文本', onClick: () => handleAdd('text') },
        { label: '图片', onClick: () => handleAdd('image') },
      ]
      const baseOptions = [
        { type: 'top', label: '置于顶部' },
        { type: 'bottom', label: '置于底部' },
        { type: 'next', label: '下一层' },
        { type: 'prev', label: '上一层' },
      ]
      const options = type ? baseOptions : nodeOptions
      ContextMenu.showContextMenu({
        x: evt.x,
        y: evt.y,
        items: options,
      })
    }

    return {
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
          evt.stopPropagation()
          this.selected = node
        },
        onClickOutside: () => {
          this.selected = undefined
        },
        'onUpdate:modelValue': (val: any) => {
          this.nodeList[index] = val
        },
        onContextmenu: (evt: PointerEvent) => {
          evt.stopPropagation()
          this.handleContextmenu(evt)
        },
        onMoveStart: () => {
          this.isMoving = true
        },
        onMoveStop: (pos?: any) => {
          pos && (this.pos = pos)
          this.isMoving = false
        },
      },
    )
    const genScene = () => h(
      FreeScene,
      {
        ref: 'sceneRef',
        width: this.width,
        height: this.height,
        style: this.sceneStyle,
        minHeight: 10,
        scale: ['rb'],
        onContextmenu: this.handleContextmenu,
      },
      () => this.nodeList.map(genNode),
    )
    const genToolbar = () => h(
      CanvasToolbar,
      {
        ref: 'toolbarRef',
        modelValue: this.selected,
        style: {
          position: 'absolute',
          top: `${this.pos.y + this.pos.h}px`,
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
