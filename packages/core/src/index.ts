import microApp, { renderApp } from '@micro-zoe/micro-app';
import { nextTick, onMounted, getCurrentInstance } from 'vue-demi';

export * from './upgrade';
export type DesignOptions = {
  url: string
  name: string
  inline: boolean
  data?: Record<PropertyKey, unknown>
}
export async function useDesign (
  dom: string | Element,
  options: DesignOptions,
) {
  const { url, inline, data, name = 'miniprogram-design' } = options;
  await new Promise((resolve, reject) => {
    tryOnMounted(() => {
      renderApp({
        name,
        url,
        container: dom,
        inline,
        data,
        'clear-data': true,
        'disable-patch-request': false, // 关闭对子应用请求的拦截
      }).then((result) => {
        if (result) {
          resolve(result);
        } else {
          reject(new Error('[@sepveneto/mpd-core] 应用加载失败'));
        }
      });
    });
  });

  function set (data: Record<PropertyKey, unknown>) {
    microApp.setData(name, data);
  }
  function get () {
    return microApp.getData(name);
  }
  return [get, set];
}

function tryOnMounted (fn: () => void) {
  if (getCurrentInstance()) {
    onMounted(fn);
  } else {
    nextTick().then(fn);
  }
}
