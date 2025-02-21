import { describe, expect, test } from 'vitest'
import { getRowPrev, normalize, pair, unpair } from '.'

function checkPair(x: number, y: number) {
  const z = pair(x, y)
  const [zx, zy] = unpair(z)
  console.log(`(${x}, ${y}): ${z}`)
  expect(zx).toBe(x)
  expect(zy).toBe(y)
}

describe('配对函数', { skip: true }, () => {
  test('(10, 100)', () => {
    checkPair(10, 100)
    checkPair(100, 10)
  })
  test('(98, 23)', () => {
    checkPair(98, 23)
    checkPair(23, 98)
  })
  test('(10, 10)', () => {
    checkPair(10, 10)
  })
  test('水平', () => {
    checkPair(10, 10)
    checkPair(20, 10)
    checkPair(30, 10)
  })
})

const layout = [
  { i: 'row-3', x: 252, y: 624, w: 111, h: 128 },
  { i: 'row-2', x: 132, y: 624, w: 111, h: 128, visible: false },
  { i: 'row-1', x: 12, y: 624, w: 111, h: 128, visible: true },
  // { i: 'grid-right-bottom', x: 192, y: 499, w: 171, h: 78 },
  // { i: 'grid-right-top', x: 192, y: 412, w: 162, h: 78 },
  // { i: 'grid-left', x: 12, y: 412, w: 171, h: 165, visible: false },
  // { i: 'row-title', x: 12, y: 592, w: 66, h: 23 },
  // { i: 'entry', x: 12, y: 302, w: 351, h: 85, visible: false },
  // { i: 'top', x: 0, y: 0, w: 375, h: 370 },
]
describe('响应式布局', () => {
  test('响应式', () => {
    const newLayout = normalize(layout)
    expect(newLayout).toMatchObject([
      // { i: 'top', x: 0, y: 0, w: 375, h: 370 },
      // { i: 'entry', x: 12, y: 302, w: 351, h: 85 },
      // { i: 'grid-left', x: 12, y: 302, w: 171, h: 165 },
      // { i: 'grid-right-top', x: 12, y: 302, w: 162, h: 78 },
      // { i: 'grid-right-bottom', x: 12, y: 389, w: 171, h: 78 },
      // { i: 'row-title', x: 12, y: 482, w: 66, h: 23 },
      { i: 'row-1', x: 12, y: 514, w: 111, h: 128 },
      { i: 'row-2', x: 132, y: 514, w: 111, h: 128 },
      { i: 'row-3', x: 132, y: 514, w: 111, h: 128 },
    ])
  })
})
