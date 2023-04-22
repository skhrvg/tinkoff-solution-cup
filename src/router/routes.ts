import type { RouteRecordRaw } from 'vue-router'
import MainLayout from '@/layouts/MainLayout.vue'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'dashboard',
    component: () => import('../views/DashboardView.vue'),
    meta: {
      title: 'Мои расходы',
      layout: MainLayout,
    },
  },
  {
    path: '/new',
    name: 'new-expense',
    component: () => import('../views/NewExpenseView.vue'),
    meta: {
      title: 'Добавить расход',
      layout: MainLayout,
    },
  },
  {
    path: '/history',
    name: 'history',
    component: () => import('../views/HistoryView.vue'),
    meta: {
      title: 'История',
      layout: MainLayout,
    },
  },
]

export default routes
