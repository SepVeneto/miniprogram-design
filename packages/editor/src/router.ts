import { createMemoryHistory, createRouter } from 'vue-router'
import { useApp } from '@/store'
// import Editor from '@/layout/editor.vue'

export const router = createRouter({
  history: createMemoryHistory(),
  routes: [
    // { name: 'default', path: '/', component: Editor },
  ],
})

router.beforeEach((to) => {
  const store = useApp()
  const routeName = to.name as string
  if (store.history.includes(routeName)) {
    store.history.pop()
  } else {
    routeName && store.history.push(routeName)
  }
})
