import PageHome from '@/pages/PageHome.vue'
import {createRouter, createWebHistory} from 'vue-router'

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/home',
    },
    {
      path: '/home',
      component: PageHome,
      meta: {
        x_nav_ev_name: 'nav.to.PageHome',
        maybe_nik_slug: true,
      },
    },
    {
      path: '/home/:nik',
      component: PageHome,
      meta: {
        x_nav_ev_name: 'nav.to.PageHome',
        maybe_nik_slug: true,
      },
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: '/home',
    },
  ],
})
