import microApp from '@micro-zoe/micro-app'
import { onMounted } from 'vue-demi'
export async function useDesign(dom, options) {
  const { port = 8090, name = 'miniprogram-design' } = options
  await new Promise((resolve, reject) => {
    onMounted(() => {
      microApp.renderApp({
        name,
        url: `http://localhost:${port}/miniprogram-design`,
        container: dom,
        inline: true,
        'clear-data': true,
        'disable-patch-request': false, // 关闭对子应用请求的拦截
      }).then((result) => {
        if (result) {
          console.log('success')
          resolve()
        } else {
          console.error('faile')
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