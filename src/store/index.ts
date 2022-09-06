import { defineStore } from 'pinia';
import { ref, watchEffect, watch } from 'vue';
import mock from '@/mock.json'
import { v4 as uuidv4 } from 'uuid'

export const useApp = defineStore('app', () => {
  const config = ref<any>(normalizeLayout(mock));
  function setConfig(data: any) {
    console.log(data)
    config.value = normalizeLayout(data)
  }
  watch(config, (val) => {
    const res = restore(val)
    window.microApp?.dispatch(res)
  }, { deep: true })
  return {
    setConfig,
    selected: {} as any,
    config,
  };
})

function arrayLike<T>(data: T): T[] {
  if (Array.isArray(data)) {
    return data
  } else {
    return [data]
  }
}

function restore(data: any) {
  const theme = data.globalConfig
  const res = {}
  data.body.forEach((item: any, index: number) => {
    res[item.type] = {
      ...restoreStyle(item),
      order: index,
    }
  })
  const tabbars = data.tabbars.list
  return { theme, ...res, tabbars }
}

function restoreStyle(config: any) {
  const { style, ...args } = config
  return {
    ...style,
    ...args,
  }
}
function normalizeLayout(config: typeof mock) {
  const cards = arrayLike(config.card).map(normalizeCard)
  const menu = arrayLike(config.menu).map(item => {
    return {
      ...normalizeMenu(item)
    }
  })
  const shop = arrayLike(config.shop).map(normalizeShop)
  const explain = arrayLike(config.explain).map(normalizeExplain)

  const body = [
    ...cards,
    ...menu,
    ...shop,
    ...explain,
  ].sort((a, b) => a.order - b.order)
  return {
    globalConfig: normalizeTheme(config.theme),
    body,
    tabbars: normalizeTabbar(config.tabbars)
  }
}

function normalizeTheme(theme: typeof mock.theme) {
  return theme
}
function normalizeCard(config: typeof mock.card) {
  const { marginBottom, marginTop, borderRadius, width, height, ...args } = config
  const style = {
    marginBottom: marginBottom,
    marginTop: marginTop,
    width: width,
    height: height,
    borderRadius: borderRadius,
  }
  return {
    uuid: uuidv4(),
    style,
    ...args
  }
}
function normalizeMenu(menu: typeof mock.menu) {
  const { marginBottom, marginTop, backgroundColor, borderRadius, childrens, ...args } = menu
  const style = {
    marginBottom,
    marginTop,
    backgroundColor,
    borderRadius
  }
  return {
    uuid: uuidv4(),
    style,
    childrens: childrens.map(item => ({ ...item, uuid: uuidv4() })),
    ...args,
  }
}
function normalizeShop(shop: typeof mock.shop) {
  const { width, height, marginTop, marginBottom, ...args } = shop
  const style = {
    width,
    height,
    marginTop,
    marginBottom
  }
  return {
    uuid: uuidv4(),
    style,
    ...args,
  }
}
function normalizeExplain(explain: typeof mock.explain) {
  const {
    backgroundColor,
    borderRadius,
    width,
    height,
    marginBottom,
    marginTop,
    ...args
  } = explain
  const style = {
    backgroundColor,
    borderRadius,
    width,
    height,
    marginBottom,
    marginTop,
  }
  return {
    uuid: uuidv4(),
    style,
    ...args
  }
}
function normalizeTabbar(tabbar: typeof mock.tabbars) {
  return {
    uuid: uuidv4(),
    type: 'tabbar',
    list: tabbar
  }
}
