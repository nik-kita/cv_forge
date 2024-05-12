import type {
  Router,
  RouteLocationNormalized,
} from 'vue-router'
import type {nav_machine} from '@/x/nav/nav_machine'
import type {ActionArgs} from 'xstate'

declare global {
  namespace x.nav {
    export type logic = ActorRefFrom<typeof nav_machine>
    export type Ctx = {
      router: Router
      nav_toggle_guard: {
        allow: boolean
      }
    } & x.Xstore
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
      | {
          type: 'nav.to.Profiles'
          path: string
        }

    export type Args = ActionArgs<Ctx, Ev, Ev>
  }
}

export {}
