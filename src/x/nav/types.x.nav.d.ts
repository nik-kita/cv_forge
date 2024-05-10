import type {Router} from 'vue-router'

declare global {
  namespace x.nav {
    export type Ctx = {
      router: Router
    }
    export type Ev =
      | {
          type: 'nav.request_to_navigate'
          to: RouteLocationNormalized
          from: RouteLocationNormalized
        }
      | {
          type: 'nav.to.PageHome'
          path: string
        }
  }
}

export {}
