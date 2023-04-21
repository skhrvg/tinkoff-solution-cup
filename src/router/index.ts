import { createRouter, createWebHistory } from 'vue-router'
import routes from './routes'
import titleGuard from '@/router/title.guard'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

router.beforeEach(titleGuard)

export default router
