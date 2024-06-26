import PageHome from '@/pages/PageHome.vue'
import PageProfiles from '@/pages/PageProfiles.vue'
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
      path: '/profiles',
      component: PageProfiles,
      meta: {
        x_nav_ev_name: 'nav.to.PageProfiles',
        maybe_nik_slug: true,
      },
    },
    {
      path: '/profiles/:nik',
      component: PageProfiles,
      meta: {
        x_nav_ev_name: 'nav.to.PageProfiles',
        maybe_nik_slug: true,
      },
    },
    {
      path: '/settings',
      component: () =>
        import('@/pages/settings/PageSettings.vue'),
      meta: {
        x_nav_ev_name: 'nav.to.PageSettings',
        maybe_nik_slug: false,
      },
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: '/home',
    },
  ],
})
