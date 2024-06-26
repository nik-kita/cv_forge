import {api_sign_in} from '@/api/api_sign_in'
import {assertEvent, setup} from 'xstate'
import {api_to_fetch_logic} from '../utils/api_to_fetch_logic'
import {use_xstore} from '../xstore'

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
    api_sign_in: function ({context, event, system, self}) {
      assertEvent(event, 'auth.guest.sign-in')
      api_to_fetch_logic(() => api_sign_in(event.payload), {
        system,
        self,
        is_access_token_required: false,
        emit_on_success: res => ({
          type: 'auth.processing_sign-in.success',
          payload: res,
        }),
        emit_on_fail: err => ({
          type: 'auth.processing_sign-in.fail',
        }),
      })
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
          actions: 'api_sign_in',
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
