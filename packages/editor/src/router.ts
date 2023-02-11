import { createRouter, createMemoryHistory } from 'vue-router';
import { useApp } from '@/store';

export const router = createRouter({
  history: createMemoryHistory(),
  routes: [],
});

router.beforeEach((to) => {
  // const config = app.getConfig(to.name);
  const app = useApp();
  app.currentRoute = to.name;
});
