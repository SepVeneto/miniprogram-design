export class Emitter {
  private listeners = new Map<string, Array<(...args: any[]) => void>>()
  on(name: string, fn: any) {
    if (this.listeners.has(name)) {
      const list = this.listeners.get(name)!
      list.push(fn)
      this.listeners.set(name, list)
    } else {
      this.listeners.set(name, [fn])
    }
  }

  emit(name: string, ...args: any[]) {
    const list = this.listeners.get(name)
    if (!list) {
      return
    }
    list.forEach(fn => fn.apply(this, args))
  }

  off(name: string) {
    this.listeners.delete(name)
  }
}
