import {api_user_update_nik} from '@/api/api_user_update_nik'
import {get_access_token} from '@/local_storage/persistent.tokens'
import {assertEvent, setup} from 'xstate'
import {api_to_fetch_logic} from '../utils/api_to_fetch_logic'
import {use_xstore} from '../xstore'

export const page_settings_machine = setup({
  types: {
    context: {} as x.Xstore,
    events: {} as x.page_settings.Ev,
  },
  guards: {
    has_nik: function ({context, event}) {
      return !!context.xstore.nik.value
    },
  },
  actions: {
    update_nik_in_xstore: function ({context, event}) {
      assertEvent(event, [
        'page_settings.update_nik.success',
        'page_settings.add_nik.success',
      ])
      context.xstore.nik.value = event.payload
    },
    api_update_nik: function ({
      context,
      event,
      system,
      self,
    }) {
      assertEvent(event, [
        'page_settings.update_nik',
        'page_settings.add_nik',
      ])
      console.log('event.payload', event.payload)
      api_to_fetch_logic(
        () => {
          return api_user_update_nik({
            nik: event.payload,
            access_token: get_access_token()!,
          })
        },
        {
          system,
          self,
          is_access_token_required: true,
          emit_on_success: res => ({
            type:
              event.type === 'page_settings.add_nik' ?
                'page_settings.add_nik.success'
              : 'page_settings.update_nik.success',
            payload: res.nik,
          }),
        },
      )
    },
  },
}).createMachine({
  context: {
    xstore: use_xstore(),
  },
  id: 'page_settings',
  type: 'parallel',
  states: {
    Setting_nik: {
      initial: 'Init',
      states: {
        Init: {
          always: [
            {
              target: 'With_nik',
              guard: {
                type: 'has_nik',
              },
            },
            {
              target: 'No_nik',
            },
          ],
        },
        With_nik: {
          initial: 'Idle',
          states: {
            Idle: {
              on: {
                'page_settings.rm_nik': {
                  target: 'Deleting_nik',
                },
                'page_settings.update_nik': {
                  target: 'Updating_nik',
                },
              },
            },
            Deleting_nik: {
              on: {
                'page_settings.rm_nik.success': {
                  target:
                    '#page_settings.Setting_nik.No_nik',
                },
                'page_settings.rm_nik.fail': {
                  target: 'Idle',
                },
              },
            },
            Updating_nik: {
              on: {
                'page_settings.update_nik.success': {
                  target: 'Idle',
                },
                'page_settings.udpate_nik.fail': {
                  target: 'Update_nik_err_showing',
                },
              },
            },
            Update_nik_err_showing: {
              on: {
                'page_settings.update_nik_err_showing.cancel':
                  {
                    target: 'Idle',
                  },
                'page_settings.update_nik.again': {
                  target: 'Updating_nik',
                },
              },
            },
          },
        },
        No_nik: {
          initial: 'Idle',
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
                  target:
                    '#page_settings.Setting_nik.With_nik',
                  actions: 'update_nik_in_xstore',
                },
                'page_settings.add_nik.fail': {
                  target: 'Adding_nik_err_showing',
                },
              },
            },
            Adding_nik_err_showing: {
              on: {
                'page_settings.adding_nik_error_showing.cancel':
                  {
                    target: 'Idle',
                  },
                'page_settings.adding_nik.again': {
                  target: 'Adding_nik',
                },
              },
            },
          },
        },
      },
    },
  },
})
