<template>
  <canvas ref="foo" />
</template>

<script lang="ts" setup>
import sketchJson from './mock.json'
import type { CanvasKit } from 'canvaskit-wasm'
import CanvasKitInit from 'canvaskit-wasm'
import { onMounted, useTemplateRef } from 'vue'

const CanvasKitPromise = CanvasKitInit()
const canvasRef = useTemplateRef('foo')

let canvasKit: CanvasKit
onMounted(async () => {
  canvasKit = await CanvasKitPromise
  renderSketch(sketchJson)
})

function genPath(frame: {x: number, y: number, width: number, height: number }, points: any[] = []) {
  const kitPath = new canvasKit.Path()
  kitPath.moveTo(frame.x, frame.y)
  points.forEach(item => {
    const { x, y } = item.point.match(/{(?<x>[0-9]), (?<y>[0-9])}/).groups
    const radius = item.cornerRadius
    if (radius) {
      kitPath.lineTo(x * frame.width - x * radius, y * frame.height - y * radius)
      // kitPath.arcToOval(canvasKit.LTRBRect(), item.cornerRadius, )
    }
    kitPath.lineTo(x * frame.width, y * frame.height)
  })
  kitPath.close()
  return kitPath
}

function renderSketch(jsonData: any) {
  const layer = sketchJson.layers[1]

  const canvas = canvasRef.value!
  const surface = canvasKit.MakeWebGLCanvasSurface(canvas)
  const paint = new canvasKit.Paint()
  paint.setAntiAlias(true)

  if (layer.style.fills.length === 0) {
    paint.setColor(canvasKit.Color(0, 0, 0, 0))
  } else {
    layer.style.fills.forEach(fill => {
      paint.setStyle(canvasKit.PaintStyle.Fill)
      const { red, blue, green, alpha } = fill.color
      paint.setColor(canvasKit.Color(red * 255, green * 255, blue * 255, alpha * 255))
    })
  }
  // paint.setStyle(canvasKit.PaintStyle.Fill)

  surface?.drawOnce(canvas => {
    const _path = genPath(layer.frame, layer.points)
    console.log(_path)
    canvas.drawPath(_path, paint)

    // paint.setStyle(canvasKit.PaintStyle.Stroke)
    // paint.setColor(canvasKit.RED)
    // paint.setStrokeWidth(3)
    // canvas.drawPath(path, paint)
  })

  // function drawLayer(layer: any) {
  //   if (layer._class === 'group') {
  //     layer.layers.forEach(subLayer => drawLayer(subLayer))
  //   } else if (layer._class === 'shapePath' || layer._class === 'rectangle') {
  //     const path = new canvasKit.Path()
  //     const points = layer.points.map(point => {
  //       const { x, y } = point.point.match(/{(?<x>[0-9]), (?<y>[0-9])}/).groups
  //       return [x, y]
  //     })

  //     // Add points to the path, assuming it's a polygon or rectangle
  //     console.log(points)
  //     // path.moveTo(points[0][0], points[0][1])
  //     // points.slice(1).forEach(([x, y]) => path.lineTo(x, y))
  //     // path.close()
  //     path.moveTo(100, 100) // 移动到 (100, 100) 的位置
  //     path.lineTo(200, 200) // 从当前位置画到 (200, 200)
  //     path.arc(200, 200, 50, 0, Math.PI / 2, false) // 绘制圆弧
  //     path.close() // 闭合路径

  //     paint.setColor(canvasKit.Color(0, 0, 0)) // Example: Black color

  //     surface?.drawOnce((canvas) => {
  //       debugger
  //       canvas.drawPath(path, paint)
  //     })
  //   } else if (layer._class === 'text') {
  //     const textPaint = new canvasKit.Paint()
  //     textPaint.setColor(canvasKit.Color(0, 0, 0)) // Black color for text
  //     // const textStyle = new canvasKit.TextStyle({ fontSize: 14})
  //     // surface?.getCanvas().drawText(layer.attributedString.string, layer.frame.x, layer.frame.y, textPaint)
  //   }
  // }

  // drawLayer(jsonData)
}

// Assuming the sketch JSON is in a variable
</script>
