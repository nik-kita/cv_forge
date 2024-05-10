import type {Router} from 'vue-router'
import type {ActorRefFrom} from 'xstate'
import type {nav_machine} from './nav_machine'

export const nav_router_integration = (
  router: Router,
  nav_toggle_guard: {
    allow: boolean
  },
  self: ActorRefFrom<typeof nav_machine>,
) => {
  router.beforeEach((to, from) => {
    if (nav_toggle_guard.allow) {
      return true
    }

    self.send({
      type: 'nav.request_to_navigate',
      to,
      from,
    } satisfies x.nav.Ev)

    return false
  })
}
