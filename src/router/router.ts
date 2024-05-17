import {createRouter, createWebHistory} from 'vue-router'
import PageHome from '../page/home/PageHome.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: PageHome,
    },
  ],
})

export default router
