import { createRouter, createMemoryHistory } from 'vue-router';
import { useApp } from '@/store';
// import Editor from '@/layout/editor.vue';

export const router = createRouter({
  history: createMemoryHistory(),
  /**
   * TODO: add default route to clonse the warning message
   */
  routes: [],
});

router.beforeEach((to) => {
  const store = useApp();
  const routeName = to.name as string;
  if (store.history.includes(routeName)) {
    store.history.pop();
  } else {
    routeName && store.history.push(routeName);
  }
});
