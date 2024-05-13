import {assertEvent, setup} from 'xstate'
import {use_xstore} from '../xstore'
import {
  action_logout,
  action_sign_in_success,
} from './actions'
import {update_tokens} from '@/local_storage/persistent.tokens'

export const auth_machine = setup({
  types: {
    context: {} as x.auth.Ctx,
    events: {} as x.auth.Ev,
  },
  actions: {
    api_logout: function ({context, event}) {
      // TODO api call
      context.xstore.clean_auth()
    },
    api_auth_success: function ({context, event}) {
      assertEvent(event, 'auth.processing_sign-in.success')
      context.xstore.update_auth(event.payload)
    },
  },
  guards: {
    is_prev_session: function ({context, event}) {
      return context.xstore.is_user.value
    },
  },
}).createMachine({
  context: () => {
    return {
      xstore: use_xstore(),
    }
  },
  id: 'auth',
  initial: 'Start',
  states: {
    Start: {
      always: [
        {
          target: 'User',
          guard: {
            type: 'is_prev_session',
          },
        },
        {
          target: 'Guest',
        },
      ],
    },
    User: {
      on: {
        'auth.user.logout': {
          target: 'Guest',
          actions: 'api_logout',
        },
        'auth.user.unauthorized': {
          target: 'Guest',
          actions: 'api_logout',
        },
      },
    },
    Guest: {
      initial: 'Idle',
      on: {
        'auth.guest.sign-in': {
          target: '#auth.Guest.Processing_sign-in',
        },
      },
      states: {
        Idle: {},
        'Processing_sign-in': {
          on: {
            'auth.processing_sign-in.success': {
              target: '#auth.User',
              actions: 'api_auth_success',
            },
            'auth.processing_sign-in.fail': {
              target: 'Idle',
            },
          },
        },
      },
    },
  },
})
