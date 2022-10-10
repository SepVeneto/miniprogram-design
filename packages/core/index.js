import microApp from '@micro-zoe/micro-app'
import { nextTick } from 'vue-demi'
import { onMounted, getCurrentInstance } from 'vue-demi'
export async function useDesign(dom, options) {
  const { url, name = 'miniprogram-design' } = options
  await new Promise((resolve, reject) => {
    tryOnMounted(() => {
      microApp.renderApp({
        name,
        url,
        container: dom,
        inline: true,
        'clear-data': true,
        'disable-patch-request': false, // 关闭对子应用请求的拦截
      }).then((result) => {
        if (result) {
          resolve()
        } else {
          reject(new Error('应用加载失败'))
        }
      })
    })
  })

  function set(data) {
    microApp.setData(name, data)
  }
  function get() {
    return microApp.getData(name)
  }
  return [get, set]
}

function tryOnMounted(fn) {
  if (getCurrentInstance()) {
    onMounted(fn)
  } else {
    nextTick(fn)
  }
}