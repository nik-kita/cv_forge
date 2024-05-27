import type {
  Router,
  RouteLocationNormalized,
} from 'vue-router'
import type {nav_machine} from '@/service/router/x/nav_machine'
import type {ActionArgs} from 'xstate'

declare global {
  namespace x.nav {
    export type logic = ActorRefFrom<typeof nav_machine>
    export type Children = {
      page_settings?: 'page_settings'
      page_profiles?: 'page_profiles'
    }
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
          type: 'nav.to.PageProfiles'
          path: string
        }
      | {
          type: 'nav.to.PageSettings'
          path: string
        }
      | {
          type: 'nav.to.PageSingleProfile'
          path: string
        }

    export type Args = ActionArgs<Ctx, Ev, Ev>
  }
}

export {}
