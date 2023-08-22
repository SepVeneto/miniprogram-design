<template>
  <FreeScene
    ref="sceneRef"
    :width="width"
    :height="height"
    :style="sceneStyle"
    :min-height="10"
    :scale="['rb']"
    @contextmenu="handleContextmenu"
  >
    <CanvasNode
      v-for="(node, index) in nodeList"
      :key="node._uuid"
      :model-value="node"
      :preview="preview"
      :active="node._uuid === selected?._uuid"
      @click.stop="selected = node"
      @update:model-value="nodeList[index] = $event"
      @contextmenu="handleContextmenu($event, node)"
    />
  </FreeScene>
  <CanvasContext
    :selected="selected"
    style="position: fixed"
  />
</template>

<script lang="ts">
import CanvasContext from '@/components/CanvasContext.vue'
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
  components: {
    CanvasNode,
    FreeScene,
    CanvasContext,
  },
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
    const sceneRef = ref()
    const width = ref()
    const height = ref()
    const selected = ref()

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
      console.log(evt)
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
      showMenu,
      menuStyle,
      nodeList,
      width,
      height,
      sceneStyle,
      sceneRef,
      menuRef,
      selected,
      handleAdd,
      handleContextmenu,
    }
  },
})
</script>

<style scoped lang="scss">
.canvas-wrap {
  position: relative;
  min-height: 50px;
  &::before {
    content: '拖拽至此区域';
    color: #ddd;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
  }
}
</style>
