import type { LayoutItem } from '@/type'

// 假定x轴上的范围是[0, 375]
export const K_Y = 375
export const K_X = 10
const CAL_ERROR = 2
const layoutMap = {
  x: new Map(),
  y: new Map(),
}

const placeLayout: LayoutItem[] = []

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
  console.log('check', projectionX)
  for (let i = projectionX.length - 1; i >= 0; --i) {
    const pendingX = projectionX[i]
    const pendingY = projectionY[i]
    if (!collsionX && checkContainX(item, pendingX.proj)) {
      collsionX = pendingX.id
    }
    if (!collsionY && checkContainY(item, pendingY.proj)) {
      collsionY = pendingY.id
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
      _origin: { ...item },
      id,
    }
    if (item.visible !== false) {
      const projection = getProjection(item)
      projectionX.push({ proj: projection.x, id })
      projectionY.push({ proj: projection.y, id })
    }
    // const projection = getProjection(config)
    // insertToProjectionMap(projectionXMap, projection.x, config)
    // insertToProjectionMap(projectionYMap, projection.y, config)
    return config
  })

  nLayout.sort((a, b) => a.id - b.id)
  console.log('sort', projectionX, projectionY)

  for (let i = 0; i < nLayout.length; ++i) {
    const item = nLayout[i]
    const projection = getProjection(item)
    if (item.visible === false) {
      // const proj = getProjection(item)
      const start = i + 1
      let target = item
      for (let j = start; j < nLayout.length; ++j) {
        // console.log('start', j, projectionX, projectionY)
        const each = nLayout[j]
        if (checkContainY(each, projection.y)) {
          console.log('try', each)
          const success = tryPlace(each, target, nLayout)
          if (success) {
            target = each
          } else {
            // const end = j
            const offset = Math.abs(target._origin.x - each.x)
            each.x = target.x + offset
            // tryPlace(each, nLayout[start]._origin, nLayout)
            // console.log('fail', nLayout[start]._origin)
          }
        }
        if (checkContainX(each, projection.x)) {
          console.log('try', each)
          const success = tryPlace(each, target, nLayout)
          if (success) {
            target = each
          } else {
            // const end = j
            const offset = Math.abs(target._origin.y - each.y)
            each.y = target.y + offset
            // tryPlace(each, nLayout[start]._origin, nLayout)
            // console.log('fail', nLayout[start]._origin)
          }
        }
        // const res = getCollsion(each)
        // const collsionX = nLayout.find(item => item.id === res.x)
        // const collsionY = nLayout.find(item => item.id === res.y)
        // console.log('collsion', collsionX, collsionY)
        // if (collsionX) {
        //   const offset = collsionX.y - each.y
        //   each.y -= offset
        // }
        // if (collsionY) {
        //   const offset = Math.abs(collsionY.x - each.x)
        //   console.log('res', offset)
        //   each.x -= offset
        // }
        // if (checkContainX(each, proj.x)) {
        //   const offset = each.y - item.y
        //   each.y -= offset
        // }
      }
    }
  }
  return nLayout
}

function tryPlace(place: LayoutItem, hiddenItem: LayoutItem, layout: LayoutItem[]) {
  if (checkCollsion(place, hiddenItem)) {
    console.log('collsion', place)
    return false
  } else {
    const offsetX = place.x - hiddenItem.x
    place.x -= offsetX

    const offsetY = place.y - hiddenItem.y
    place.y -= offsetY
    return true
  }
  if (checkCollsion(place, layout)) {
    // TODO: 判断投影决定实际移动的位置
    const res = getCollsion(place)
    const collsionX = layout.find(item => item.id === res.x)
    const collsionY = layout.find(item => item.id === res.y)
    console.log('try place', collsionX, collsionY)

    if (collsionY) {
      const offset = Math.abs(collsionY.x - place.x)
      console.log('res', offset)
      place.x -= offset
    }
    // console.log('collsion', res)
  }
}

function checkCollsion(item: LayoutItem & { _origin: LayoutItem }, target: (LayoutItem & { _origin: LayoutItem })) {
  if (item.id === target.id || target.visible === false) return false
  const x1 = target.x
  const y1 = target.y
  const x2 = item.x
  const y2 = item.y
  const collsion = Math.max(x1, x2) <= Math.min(y1, y2)
  if (collsion) return true
  return false
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
