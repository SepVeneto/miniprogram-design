import { computed, CSSProperties } from 'vue';
type Style = Partial<Record<keyof CSSProperties, string | number>>
export function useNormalizeStyle(
  style: Style
) {
  return computed(() => {
    const _style = Object.entries(style).reduce<Partial<CSSProperties>>(
    (obj, _style) => {
      const [key, value] = _style;
      if (typeof value === 'number') {
        obj[key] = `${value}px`;
      } else {
        obj[key] = value;
      }
      return obj;
    }, {} as Partial<CSSProperties>)

    return {
      transition: 'inherit',
      ..._style,
    }
  });
}
