import { useSortable as sortable } from '@vueuse/integrations/useSortable';
import { toValue } from '@vueuse/core';
import type { MaybeRefOrGetter } from '@vueuse/core';
import type { UseSortableOptions as SortableOptions } from '@vueuse/integrations/useSortable';

export type UseSortableOptions = SortableOptions & { clone?: (original: any) => any}

function defaultClone (original: any) {
  return original;
}

export function useSortable<T> (
  el: MaybeRefOrGetter<HTMLElement | null | undefined>,
  list: MaybeRefOrGetter<T[]>,
  options: UseSortableOptions,
) {
  const { clone = defaultClone, ...restOptions } = options;
  const defaultOptions: UseSortableOptions = {
    animation: 200,
    ghostClass: 'ghost',
    handle: '.operate',
    onUpdate (e) {
      // optimize
      // vueuse中由于移动项是在nextTick后插入的，会导致移动项触发重绘
      const data = toValue(list);
      const ele = data.splice(e.oldIndex!, 1)[0];
      data.splice(e.newIndex!, 0, ele);
    },
    onStart: (evt: any) => {
      const data = toValue(list);
      const index = evt.item.dataset.index;
      evt.item._underlying_vm_ = clone(data[index]);
    },
    onAdd (evt) {
      const data = toValue(list);
      // @ts-expect-error: extend field
      const element = evt.item._underlying_vm_;
      if (!element) return;

      removeNode(evt.item);
      data.splice(evt.newIndex!, 0, element);
    },
  };
  return sortable(el, list, { ...defaultOptions, ...restOptions });
}

function removeNode (dom: Element) {
  dom.parentElement?.removeChild(dom);
}
