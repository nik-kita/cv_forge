import {setup} from 'xstate'
import {use_xstore} from '../xstore'
import {
  action_logout,
  action_sign_in_success,
} from './actions'

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
    return {
      xstore: use_xstore(),
    }
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
