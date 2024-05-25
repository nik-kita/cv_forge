import {api_sign_in} from '@/api/api_sign_in'
import {assertEvent, setup, type ActorRefFrom} from 'xstate'
import {api_to_fetch_logic} from '../utils/api_to_fetch_logic'
import {use_xstore} from '../xstore'

export const auth_machine = setup({
  types: {
    context: {} as x.auth.Ctx,
    events: {} as x.auth.Ev,
  },
  actions: {
    api_logout: function ({context, event, system}) {
      // TODO api call
      context.xstore.clean_auth()
    },
    on_auth_change: function ({system}) {
      const setting_nik = system.get('setting_nik') as
        | ActorRefFrom<x.page_settings.setting_nik.logic>
        | undefined
      if (setting_nik) {
        setting_nik.send({
          type: 'page_settings.reset_machine',
        })
      }
      const profiles_page = system.get('page_profiles') as
        | ActorRefFrom<x.page_profiles.logic>
        | undefined
      if (profiles_page) {
        profiles_page.send({
          type: 'page_profiles.reset_machine',
        })
      }
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
    api_auth_success: function ({context, event, system}) {
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
      entry: 'on_auth_change',
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
      entry: 'on_auth_change',
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
