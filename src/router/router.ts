import {createRouter, createWebHistory} from 'vue-router'
import PageHome from '../page/home/PageHome.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/home',
      component: PageHome,
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: '/home',
    },
  ],
  linkActiveClass: 'link-active',
  linkExactActiveClass: 'link-exact-active',
})

export default router
