export class ForceDirectedLayout {
  constructor(elements, containerWidth, containerHeight) {
    this.elements = elements.map(el => ({
      ...el,
      vx: 0,
      vy: 0,
    }))
    this.containerWidth = containerWidth
    this.containerHeight = containerHeight
    this.kRepel = 10000 // 斥力强度
    this.kCenter = 0.02 // 向心力强度
    this.damping = 0.85 // 阻尼系数
    this.maxSpeed = 10 // 最大速度限制
  }

  // 移除指定ID的元素
  removeElements(ids) {
    this.elements = this.elements.filter(el => !ids.includes(el.id))
  }

  // 计算两矩形间的最小距离
  getDistance(a, b) {
    const dx = a.x - b.x
    const dy = a.y - b.y
    return Math.sqrt(dx * dx + dy * dy)
  }

  // 迭代计算布局
  update() {
    const elements = this.elements

    // 计算斥力
    for (let i = 0; i < elements.length; i++) {
      for (let j = i + 1; j < elements.length; j++) {
        const a = elements[i]
        const b = elements[j]
        const dx = a.x - b.x
        const dy = a.y - b.y
        const distance = this.getDistance(a, b)
        const minDistance = 50 // 最小间距阈值

        if (distance < minDistance) {
          const force = this.kRepel / (distance * distance + 0.1)
          const fx = (dx / distance) * force
          const fy = (dy / distance) * force

          a.vx += fx
          a.vy += fy
          b.vx -= fx
          b.vy -= fy
        }
      }
    }

    // 计算向心力（拉向容器中心）
    const centerX = this.containerWidth / 2
    const centerY = this.containerHeight / 2
    elements.forEach(el => {
      const dx = centerX - el.x
      const dy = centerY - el.y
      el.vx += dx * this.kCenter
      el.vy += dy * this.kCenter
    })

    // 更新位置并应用阻尼
    elements.forEach(el => {
      el.vx *= this.damping
      el.vy *= this.damping

      // 限制最大速度
      el.vx = Math.max(-this.maxSpeed, Math.min(this.maxSpeed, el.vx))
      el.vy = Math.max(-this.maxSpeed, Math.min(this.maxSpeed, el.vy))

      el.x += el.vx
      el.y += el.vy
    })

    // 边界碰撞检测
    elements.forEach(el => {
      if (el.x < 0) el.x = 0
      if (el.x + el.w > this.containerWidth) el.x = this.containerWidth - el.w
      if (el.y < 0) el.y = 0
      if (el.y + el.h > this.containerHeight) el.y = this.containerHeight - el.h
    })
  }

  // 运行多轮迭代直到稳定
  stabilize(maxIterations = 100, threshold = 0.1) {
    for (let i = 0; i < maxIterations; i++) {
      const prevPositions = this.elements.map(el => ({ x: el.x, y: el.y }))
      this.update()
      // 检测是否稳定（位置变化小于阈值）
      const isStable = this.elements.every((el, idx) =>
        Math.abs(el.x - prevPositions[idx].x) < threshold &&
        Math.abs(el.y - prevPositions[idx].y) < threshold,
      )
      if (isStable) break
    }
  }
}
