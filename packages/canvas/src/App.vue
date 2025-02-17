<template>
  <canvas
    id="foo"
    ref="foo"
    width="300"
    height="300"
  />
</template>

<script setup lang="ts">
import type { Canvas, Paint } from 'canvaskit-wasm'
import CanvasKitInit from 'canvaskit-wasm'
import { onMounted, shallowRef, useTemplateRef } from 'vue'
import mock from './mock.json'
import { BaseShape } from './components/BaseShape'

const CanvasKitPromise = CanvasKitInit()
const canvasRef = useTemplateRef('foo')
const views = shallowRef<BaseShape[]>([])

init()
function init() {
  mock.forEach(item => {
    views.value.push(new BaseShape(item))
  })
}
onMounted(async () => {
  // canvasRef.value?.addEventListener('mousemove', (evt) => {

  // })

  const CanvasKit = await CanvasKitPromise

  const surface = CanvasKit.MakeWebGLCanvasSurface('foo')

  const paint = new CanvasKit.Paint()
  paint.setColor(CanvasKit.Color4f(0.9, 0, 0, 1.0))
  paint.setStyle(CanvasKit.PaintStyle.Stroke)
  paint.setAntiAlias(true)
  // const rr = CanvasKit.RRectXY(CanvasKit.LTRBRect(10, 60, 210, 260), 25, 15)

  const operatePaint = new CanvasKit.Paint()
  operatePaint.setColor(CanvasKit.parseColorString('#0000FF'))
  operatePaint.setStyle(CanvasKit.PaintStyle.Stroke)
  operatePaint.setAntiAlias(true)

  function draw(canvas: Canvas) {
    canvas.clear(CanvasKit.WHITE)
    views.value.forEach(view => view.draw(canvas))
    surface?.requestAnimationFrame(draw)
  }
  surface?.requestAnimationFrame(draw)
})

const OPERATE_SIZE = 10
function wrapScale(
  canvas: Canvas,
  paint: Paint,
  x: number,
  y: number,
  w: number,
  h: number,
) {
  const pos = [[x, y], [w, y], [w, h], [x, h]]
  canvas.drawRect4f(x, y, w, h, paint)
  pos.forEach(item => {
    canvas.drawCircle(item[0], item[1], OPERATE_SIZE, paint)
  })
}
</script>
