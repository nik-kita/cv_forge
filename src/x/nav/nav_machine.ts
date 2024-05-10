import {router} from '@/router/router'
import {raise, setup} from 'xstate'

export const nav_machine = setup({
  types: {
    events: {} as x.nav.Ev,
    context: {} as x.nav.Ctx,
  },
}).createMachine({
  id: 'nav',
  on: {
    'nav.request_to_navigate': {
      actions: raise(({event}) => {
        return event
      }),
    },
  },
  context() {
    return {
      router,
    }
  },
})
