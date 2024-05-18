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
      path: '/sign-in',
      component: () =>
        import('@/page/sign-in/PageSignIn.vue'),
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: '/home',
    },
  ],
})

export default router
