import {router} from '@/router/router'
import {raise, setup} from 'xstate'
import {integrate_router, navigate} from './actions'
import {navigate_ev} from './raise.navigate_ev'

export const nav_machine = setup({
  types: {
    events: {} as x.nav.Ev,
    context: {} as x.nav.Ctx,
  },
  actions: {
    navigate,
    integrate_router,
  },
}).createMachine({
  id: 'nav',
  entry: {
    type: 'integrate_router',
  },
  on: {
    'nav.request_to_navigate': {
      actions: raise(navigate_ev),
    },
    'nav.to.PageHome': {
      target: '.PageHome',
      actions: 'navigate',
    },

    'nav.to.Profiles': {
      target: '.PageProfiles',
      actions: 'navigate',
    },
  },
  context() {
    return {
      router,
      nav_toggle_guard: {
        allow: false,
      },
    }
  },
  initial: 'PageHome',
  states: {
    PageHome: {},
    PageProfiles: {},
  },
})
