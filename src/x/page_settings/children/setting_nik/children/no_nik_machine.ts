import {api_user_update_nik} from '@/api/api_user_update_nik'
import {get_access_token} from '@/local_storage/persistent.tokens'
import {api_to_fetch_logic} from '@/x/utils/api_to_fetch_logic'
import {use_xstore} from '@/x/xstore'
import {assertEvent, sendParent, setup} from 'xstate'

export const no_nik_machine = setup({
  types: {
    events: {} as x.page_settings.setting_nik.Ev,
    context: {} as x.page_settings.setting_nik.Ctx,
  },
  actions: {
    api_update_nik: ({event, self, system}) => {
      assertEvent(event, 'page_settings.add_nik')
      api_to_fetch_logic(
        () =>
          api_user_update_nik({
            nik: event.payload,
            access_token: get_access_token()!,
          }),
        {
          is_access_token_required: true,
          self,
          system,
          emit_on_success: res =>
            ({
              type: 'page_settings.add_nik.success',
              payload: res.nik,
            }) satisfies x.page_settings.setting_nik.Ev,
        },
      )
    },
    send_parent_nik_success: sendParent(({event}) => {
      assertEvent(event, 'page_settings.add_nik.success')

      return {
        type: 'page_settings.add_nik.success',
        payload: event.payload,
      } satisfies x.page_settings.setting_nik.Ev
    }),
  },
}).createMachine({
  initial: 'Idle',
  context: {
    xstore: use_xstore(),
  },
  states: {
    Idle: {
      on: {
        'page_settings.add_nik': {
          target: 'Adding_nik',
          actions: 'api_update_nik',
        },
      },
    },
    Adding_nik: {
      on: {
        'page_settings.add_nik.success': {
          actions: 'send_parent_nik_success',
        },
        'page_settings.add_nik.fail': {
          target: 'Adding_nik_err_showing',
        },
      },
    },
    Adding_nik_err_showing: {
      on: {
        'page_settings.adding_nik_error_showing.cancel': {
          target: 'Idle',
        },
        'page_settings.adding_nik.again': {
          target: 'Adding_nik',
        },
      },
    },
  },
})
