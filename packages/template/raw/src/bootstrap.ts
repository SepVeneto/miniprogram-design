import microApp from '@micro-zoe/micro-app';
import { createApp } from 'vue';
import App from './App.vue';

createApp(App).mount('#app');

microApp.start({
  'disable-memory-router': true, // 关闭虚拟路由系统
  'disable-patch-request': true, // 关闭对子应用请求的拦截
});
