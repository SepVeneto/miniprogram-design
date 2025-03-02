<template>
  <div style="position: relative; width: 375px; height: 884px;">
    <div
      v-for="item in layout.elements"
      :key="item.i"
      :style="{
        display: item.visible === false ? 'none' : 'block',
        width: `${item.w}px`,
        height: `${item.h}px`,
        position: 'absolute',
        top: `${item.y}px`,
        left: `${item.x}px`,
        background: randomColor(),
      }"
    >
      {{ item }}
    </div>
  </div>

  <div
    v-for="item in originLayout"
    :key="item.i"
  >
    <label>{{ item.i }}</label>
    <input
      v-model="item.visible"
      type="checkbox"
    >
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { normalize } from '../../src/utils'
import { ForceDirectedLayout } from './ForceDirectedLayout'

const originLayout = ref([
  { i: 0, x: 0, y: 0, w: 375, h: 350, visible: true },
  { i: 1, x: 12, y: 302, w: 351, h: 85, visible: true },
  { i: 2, x: 12, y: 412, w: 171, h: 165, visible: true },
  { i: 3, x: 192, y: 412, w: 162, h: 78, visible: true },
  { i: 4, x: 192, y: 499, w: 171, h: 78, visible: true },
  { i: 5, x: 12, y: 592, w: 351, h: 23, visible: true },
  { i: 6, x: 12, y: 624, w: 111, h: 128, visible: true },
  { i: 7, x: 132, y: 624, w: 111, h: 128, visible: true },
  { i: 8, x: 252, y: 624, w: 111, h: 128, visible: true },
])

// const layout = computed(() => normalize(originLayout.value))

const layout = new ForceDirectedLayout(originLayout.value)
layout.stabilize()

function randomColor() {
  return `rgb(${255 * Math.random()}, ${255 * Math.random()}, ${255 * Math.random()})`
}
</script>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
