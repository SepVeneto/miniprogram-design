import { computed } from 'vue';
export function useNormalizeStyle( style) {
  return computed(() => {
    const _style = Object.entries(style).reduce(
    (obj, _style) => {
      const [key, value] = _style;
      if (typeof value === 'number') {
        obj[key] = `${value}px`;
      } else {
        obj[key] = value;
      }
      return obj;
    }, {})

    return {
      transition: 'inherit',
      ..._style,
    }
  });
}
