import { createRouter, createWebHistory } from 'vue-router'
import { ROUTES } from '@/shared/config'

const APP_NAME = 'User Management'

const routes = [
  {
    path: '/',
    redirect: ROUTES.usersList,
  },
  {
    path: ROUTES.usersList,
    meta: { title: 'Users' },
    component: () => import('@/pages/users').then((mount) => mount.UsersPage),
  },
  {
    path: ROUTES.userCreate,
    meta: { title: 'Create user' },
    component: () => import('@/pages/user-create').then((mount) => mount.CreateUserPage),
  },
  {
    path: ROUTES.userEdit(':id'),
    meta: { title: 'Edit user' },
    component: () => import('@/pages/user-edit').then((mount) => mount.EditUserPage),
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    meta: { title: 'Page not found' },
    component: () => import('@/pages/not-found').then((mount) => mount.NotFound),
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

router.afterEach((to) => {
  const title = to.meta.title as string | undefined
  document.title = title ? `${title} — ${APP_NAME}` : APP_NAME
})

export default router
