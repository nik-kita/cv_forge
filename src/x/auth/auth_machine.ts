import {setup} from 'xstate'
import {action_sign_in_success} from './action.sign-in.success'
import {action_logout} from './action.logout'

export const auth_machine = setup({
  types: {
    context: {} as x.auth.Ctx,
    events: {} as x.auth.Ev,
  },
  actions: {
    action_sign_in_success,
    action_logout,
  },
}).createMachine({
  id: 'auth',
  context() {
    return {}
  },
  initial: 'Start',
  states: {
    Start: {
      always: {
        target: 'Guest',
      },
    },
    Guest: {
      on: {
        'auth.sign_in.success': {
          target: 'User',
        },
      },
      entry: 'action_logout',
    },
    User: {
      on: {
        'auth.logout': {
          target: 'Guest',
        },
      },
      entry: 'action_sign_in_success',
    },
  },
})
