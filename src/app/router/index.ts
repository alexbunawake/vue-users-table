import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    redirect: '/users',
  },
  {
    path: '/users',
    component: () => import('@/pages/users').then((mount) => mount.UsersPage),
  },
  {
    path: '/users/new',
    component: () => import('@/pages/users/create-user').then((mount) => mount.CreateUser),
  },
  {
    path: '/users/:id',
    component: () => import('@/pages/users/edit-user').then((mount) => mount.EditUser),
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('@/pages/not-found').then((mount) => mount.NotFound),
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
