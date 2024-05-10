import 'vue-router'

declare module 'vue-router' {
  interface RouteMeta {
    x_nav_ev_name: NavEventName
    maybe_nik_slug: boolean
  }
}

export {}
