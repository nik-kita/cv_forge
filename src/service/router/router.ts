import PageHome from '@/page/PageHome.vue'
import PageSingleProfile from '@/page/profiles/[profile_name]/PageSingleProfile.vue'
import PageProfiles from '@/page/profiles/PageProfiles.vue'
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
      path: '/profile/:name',
      // component: PageSingleProfile,
      component: () =>
        import(
          '@/page/profiles/[profile_name]/PageSingleProfile.vue'
        ),
      meta: {
        x_nav_ev_name: 'nav.to.PageSingleProfile',
        maybe_nik_slug: true,
      },
    },
    {
      path: '/profile/:name/:nik',
      component: () =>
        import(
          '@/page/profiles/[profile_name]/PageSingleProfile.vue'
        ),
      props: true,
      meta: {
        x_nav_ev_name: 'nav.to.PageSingleProfile',
        maybe_nik_slug: true,
      },
    },
    {
      path: '/settings',
      component: () =>
        import('@/page/settings/PageSettings.vue'),
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
