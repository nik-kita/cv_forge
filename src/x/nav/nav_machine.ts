import {router} from '@/router/router'
import {raise, setup} from 'xstate'
import {nav_router_integration} from './nav_router_integration.fn'
import {navigate_ev} from './raise.navigate_ev'

const nav_toggle_guard = {
  allow: false,
}
export const nav_machine = setup({
  types: {
    events: {} as x.nav.Ev,
    context: {} as x.nav.Ctx,
  },
}).createMachine({
  id: 'nav',
  on: {
    'nav.request_to_navigate': {
      actions: raise(navigate_ev),
    },
  },
  context({self}) {
    nav_router_integration(router, nav_toggle_guard, self)

    return {
      router,
    }
  },
})
