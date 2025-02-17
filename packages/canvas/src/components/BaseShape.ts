import type { Canvas, Color } from 'canvaskit-wasm'
import { CanvasKit } from '../libs'

export class BaseShape {
  size = 10
  paint = new CanvasKit.Paint()
  private left?: number
  private top?: number
  private right?: number
  private bottom?: number
  schema: any

  pos: [number, number][] = []
  constructor(schema: any) {
    const { x, y, width, height } = schema.frame
    this.left = x
    this.top = y
    this.right = x + width
    this.bottom = y + height
    this.schema = schema

    this.setPos(x, y, width, height)
  }

  setPos(x: number, y: number, w: number, h: number) {
    this.left = x
    this.top = y
    this.right = x + w
    this.bottom = y + h

    this.pos = [
      [this.left, this.top],
      [this.right, this.top],
      [this.right, this.bottom],
      [this.left, this.bottom],
    ]
  }

  async setStroke() {
    this.paint.setStyle(CanvasKit.PaintStyle.Stroke)
  }

  setFill() {
    this.paint.setStyle(CanvasKit.PaintStyle.Fill)
  }

  setColor(color: string | Color) {
    if (typeof color === 'string') {
      this.paint.setColor(CanvasKit.parseColorString(color))
    } else {
      this.paint.setColor(color)
    }
  }

  draw(canvas: Canvas) {
    this.pos.forEach(item => {
      const [x, y] = item
      canvas.drawCircle(x, y, this.size, this.paint)
    })
  }
}
