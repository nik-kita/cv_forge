import {router} from '@/router/router'
import {raise, setup} from 'xstate'
import {
  integrate_router,
  navigate,
  raise_nav_ev,
} from './actions'
import {use_xstore} from '../xstore'

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
  entry: 'integrate_router',
  on: {
    'nav.request_to_navigate': {
      actions: raise(raise_nav_ev),
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
      xstore: use_xstore(),
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
