import {api_user_update_nik} from '@/api/api_user_update_nik'
import {get_access_token} from '@/service/local_storage/persistent.tokens'
import {api_to_fetch_logic} from '@/common_xstate/utils/api_to_fetch_logic'
import {use_xstore} from '@/common_xstate/xstore'
import {
  assertEvent,
  assign,
  sendParent,
  setup,
} from 'xstate'

export const NoNik_machine = setup({
  types: {
    events: {} as x.PageSettings.setting_nik.Ev,
    context: {} as x.PageSettings.setting_nik.Ctx,
  },
  actions: {
    set_client_err_message: assign({
      client_err_message: ({event}) => {
        assertEvent(event, 'page_settings.add_nik.fail')

        return event.payload
      },
    }),
    unset_client_err_message: assign({
      client_err_message: undefined,
    }),
    api_update_nik: ({event, self, system}) => {
      assertEvent(event, [
        'page_settings.add_nik',
        'page_settings.adding_nik.again',
      ])
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
              payload: res.nik!,
            }) satisfies x.PageSettings.setting_nik.Ev,
          emit_on_fail: async (
            err: ApiErr<'put', '/user/nik/{nik}', 400>,
          ) => {
            return {
              type: 'page_settings.add_nik.fail',
              payload: await err.json().then(j => {
                return j.beauty_message || j.message
              }),
            }
          },
        },
      )
    },
    send_parent_nik_success: sendParent(({event}) => {
      assertEvent(event, 'page_settings.add_nik.success')

      return {
        type: 'page_settings.add_nik.success',
        payload: event.payload,
      } satisfies x.PageSettings.setting_nik.Ev
    }),
  },
}).createMachine({
  /** @xstate-layout N4IgpgJg5mDOIC5QDsD2B9ZBLA1ugtgIYDGAFlsmAHQCSEANmAMQAOhM6sYALtxVLCqEIETLgDaABgC6iUC1SwsfVMjkgAHogAcANgBMVAKwAWXdqOWAnDYDMARgA0IAJ6J9k+1QDs+q-d0HK21JSW9dAF8I5zQxPCIyCmoAQRF+ONZ2ME4ePmQBIRE4qlgAV2JiOFgpWSQQBSUVNTqtBHt2ySp7K1DvSStvI28Qk2c3NocfSSG-XSNde31tE1somIxseJJySipUiHTNzI4uXn5BYVFNqgAzQix6GvUG5SxVdVa9Q1NzSyMbKwOMY6Ly2fR+ey2EzBIz2Fb2NYgWKbAjbJJ7NL5OLoMAAJ1xnFIqAA7vxjtlTnkCpdDrgcfjUATYETSfkqMRCMhKo8ZM9FK93i1EGDtMZbLoTND9NDQoEjMCEOCTFQTEZpnCzJJbFZdAZEci6QkdilMVBsXimSyyWwTrlzoUDljrux7sgnnUXk0PsKlmKJVKZZI5Qrxd5jMN2qZwfphlYotEkagIHB1AatolKHzGm9mqBWgBaXQK-NGKgAgY9XSeSTafS6oz6jaGtG7OiMLMC3OaRDeEydebhQH9bwOGsKpVUBbdEcrEzaQHaRvYo3o-a0nAdr1Ctr2CxUOsBQZmKX6eWudyTHX9BxDYJDkxLlEr3Zrp10i2Ekn8Tc570IEz6Aq9ihFQ2iDBK8yzgYZjxhEQA */
  id: 'no_nik_machine',
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
          target: 'Adding_nik',
        },
        'page_settings.add_nik.fail': {
          target: 'Adding_nik_err_showing',
          actions: 'set_client_err_message',
        },
      },
    },
    Adding_nik_err_showing: {
      exit: 'unset_client_err_message',
      on: {
        'page_settings.adding_nik_error_showing.cancel': {
          target: 'Idle',
        },
        'page_settings.adding_nik.again': {
          target: 'Adding_nik',
          actions: 'api_update_nik',
        },
      },
    },
  },
})
