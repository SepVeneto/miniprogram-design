export function useNormalizeStyle(style: Partial<Record<keyof CSSStyleDeclaration, string | number>>) {
  return Object.entries(style).reduce<CSSStyleDeclaration>((obj, _style) => {
    const [key, value] = _style
    if (typeof value === 'number') {
      obj[key] = `${value}px`
    } else {
      obj[key] = value
    }
    return obj
  }, {} as CSSStyleDeclaration)
}