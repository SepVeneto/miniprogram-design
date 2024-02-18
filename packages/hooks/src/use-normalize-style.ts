import { computed } from 'vue'
import type { CSSProperties, ComputedRef } from 'vue'
type Style = Partial<Record<keyof CSSProperties, string | number>>
type ReturnStyle<T extends Style> = { transition: string } & T
export function useNormalizeStyle<T extends Style>(
  style: T,
): ComputedRef<ReturnStyle<T>> {
  return computed(() => {
    const _style = normalizeStyle(style)

    return {
      transition: 'inherit',
      ..._style,
    } as ReturnStyle<T>
  })
}

export function normalizeStyle(style: Style, excludes: string[] = []) {
  return Object.entries(style).reduce<Partial<CSSProperties>>(
    (obj, _style) => {
      const [key, value] = _style
      if (excludes.includes(key)) return obj
      if (typeof value === 'number') {
        // @ts-expect-error: value is not a number
        obj[key] = key === 'zIndex' ? value : `${value}px`
      } else if (value?.startsWith('http')) {
        // @ts-expect-error: value is not a number
        obj[key] = `url(${value})`
      } else {
        // @ts-expect-error: value is not a number
        obj[key] = value
      }
      return obj
    }, {} as Partial<CSSProperties>)
}
