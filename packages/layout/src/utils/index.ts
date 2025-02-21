import type { LayoutItem } from '@/type'

// 假定x轴上的范围是[0, 375]
export const K_Y = 375
export const K_X = 10
const CAL_ERROR = 2
const layoutMap = {
  x: new Map(),
  y: new Map(),
}

export function getRowPrev(item: LayoutItem, layout: LayoutItem[]) {
  const ymin = Math.min(0, item.y - CAL_ERROR)
  const ymax = item.y + CAL_ERROR

  const res = layoutMap.x.get(item.x)
  console.log(res)

  // for (let i = 0; i < item.x; ++i) {
  //   for (let j = ymin; j < ymax; ++j) {
  //     console.log('check pos: ', i, j)
  //   }
  // }
}

//   const zmax = pair(0, ymax)
//   const zmin = pair(0, )
// }

export function genId(x: number, y: number) {
  return x * K_X + y * K_Y
}

// // Szudzik 配对函数
// export function pair(x: number, y: number) {
//   if (x > y) {
//     return x * x + x + y
//   } else if (x < y) {
//     return y * y + x
//   } else {
//     return x * x + 2 * x
//   }
// }

// export function unpair(z: number) {
//   const x = Math.floor(Math.sqrt(z)) // 计算平方根，得到 x

//   const compare = x * x + x
//   // 如果 z >= x^2 + x，则说明是通过 x^2 + y 配对的
//   if (z === x * x + 2 * x) {
//     const y = x
//     return [x, y]
//   } else if (z >= compare) {
//     const y = z - x * x - x
//     return [x, y] // x >= y
//   } else {
//     return [z - x * x, x] // x < y
//   }
// }
// 计算当前元素在x和y轴上的投影
function getProjection(item: LayoutItem) {
  return {
    x: [item.x, item.x + item.w],
    y: [item.y, item.y + item.h],
  }
}

function checkContainX(item: LayoutItem, projection: number[]) {
  const { x } = getProjection(item)
  const [x1, x2] = x
  const [x3, x4] = projection
  const res = Math.max(x1, x3) <= Math.min(x2, x4)
  console.log('check: ', x1, x2, x3, x4, res)
  return res
}

function checkContainY(item: LayoutItem, projection: number[]) {
  const { y } = getProjection(item)
  const [y1, y2] = y
  const [y3, y4] = projection
  const res = Math.max(y1, y3) <= Math.min(y2, y4)
  console.log('check: ', y1, y2, y3, y4, res)
  return res
}

function checkContainYFromAll(item: LayoutItem)

const projectionXMap = new Map()
const projectionYMap = new Map()

const projectionX: { proj: number[], id: number }[] = []
const projectionY: { proj: number[], id: number }[] = []

function getCollsion(item: LayoutItem) {
  let collsionX
  let collsionY
  for (let i = projectionX.length - 1; i >= 0; --i) {
    const pendingX = projectionX[i]
    const pendingY = projectionY[i]
    if (!collsionX && checkContainX(item, pendingX.proj)) {
      collsionX = item
    }
    if (!collsionY && checkContainY(item, pendingY.proj)) {
      collsionY = item
    }
  }
  return {
    x: collsionX,
    y: collsionY,
  }
}
export function normalize(layout: LayoutItem[]) {
  const nLayout = layout.map(item => {
    const id = genId(item.x, item.y)
    const config = {
      ...item,
      id,
    }
    // const projection = getProjection(config)
    // insertToProjectionMap(projectionXMap, projection.x, config)
    // insertToProjectionMap(projectionYMap, projection.y, config)
    return config
  })

  nLayout.sort((a, b) => a.id - b.id)

  for (let i = 0; i < nLayout.length; ++i) {
    const item = nLayout[i]
    const projection = getProjection(item)
    projectionX.push({ proj: projection.x, id: item.id })
    projectionY.push({ proj: projection.y, id: item.id })

    if (item.visible === false) {
      // const proj = getProjection(item)
      for (let j = i; j < nLayout.length; ++j) {
        console.log('start', j)
        const each = nLayout[j]
        // if (checkContainY(each, proj.y)) {
        //   const offset = each.x - item.x
        //   each.x -= offset
        // }
        const res = getCollsion(each)
        console.log('collsion', each, res)
        // if (checkContainX(each, proj.x)) {
        //   const offset = each.y - item.y
        //   each.y -= offset
        // }
      }
    }
  }
  return nLayout
}

function insertToProjectionMap(
  map: Map<number[], LayoutItem[]>,
  key: number[],
  value: LayoutItem,
) {
  const list = map.get(key)
  if (list) {
    list.push(value)
    map.set(key, list)
  } else {
    map.set(key, [value])
  }
}
