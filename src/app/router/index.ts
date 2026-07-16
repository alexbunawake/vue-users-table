import {createRouter, createWebHistory} from 'vue-router'
import UsersPage from "@/pages/users/ui/UsersPage.vue";
import EditUser from "@/pages/users/edit-user/ui/EditUser.vue";
import CreateUser from "@/pages/users/create-user/ui/CreateUser.vue";
import NotFound from "@/pages/not-found/ui/NotFound.vue";

const routes = [
  {
    path: '/',
    redirect: '/users'
  },
  {
    path: '/users',
    component: UsersPage,
  },
  {
    path: '/users/:id',
    component: EditUser
  },
  {
    path: '/users/new',
    component: CreateUser
  },
  {
    path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFound
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
