import {api_delete_nik} from '@/api/api_delete_nik'
import {api_user_update_nik} from '@/api/api_user_update_nik'
import {get_access_token} from '@/local_storage/persistent.tokens'
import {api_to_fetch_logic} from '@/x/utils/api_to_fetch_logic'
import {use_xstore} from '@/x/xstore'
import {assertEvent, sendParent, setup} from 'xstate'

export const with_nik_machine = setup({
  types: {
    events: {} as x.page_settings.setting_nik.Ev,
    context: {} as x.page_settings.setting_nik.Ctx,
  },
  actions: {
    send_parent_rm_nik_success: sendParent(
      ({event, system}) => {
        assertEvent(event, 'page_settings.rm_nik.success')
        return {
          type: 'page_settings.rm_nik.success',
        } satisfies x.page_settings.setting_nik.Ev
      },
    ),
    send_parent_rm_nik_fail: sendParent(({event}) => {
      assertEvent(event, 'page_settings.rm_nik.fail')

      return {
        type: 'page_settings.rm_nik.fail',
      } satisfies x.page_settings.setting_nik.Ev
    }),
    api_delete_nik: function ({
      context,
      event,
      system,
      self,
    }) {
      assertEvent(event, 'page_settings.rm_nik')
      api_to_fetch_logic(
        () =>
          api_delete_nik({
            access_token: get_access_token()!,
          }),
        {
          is_access_token_required: true,
          self,
          system,
          emit_on_success: () => {
            return {
              type: 'page_settings.rm_nik.success',
            }
          },
          emit_on_fail: () => ({
            type: 'page_settings.rm_nik.fail',
          }),
        },
      )
    },
    api_update_nik: function ({
      context,
      event,
      system,
      self,
    }) {
      assertEvent(event, 'page_settings.update_nik')
      api_to_fetch_logic(
        () => {
          return api_user_update_nik({
            access_token: get_access_token()!,
            nik: event.payload,
          })
        },
        {
          system,
          self,
          is_access_token_required: true,

          emit_on_success: res => {
            return {
              type: 'page_settings.update_nik.success',
              payload: res.nik!,
            }
          },
          emit_on_fail: (
            err: ApiErr<'put', '/user/nik/{nik}', 400>,
          ) => {
            return {
              type: 'page_settings.update_nik.fail',
              payload: err.beauty_message || err.message,
            }
          },
        },
      )
    },
    send_parent_update_nik_success: sendParent(
      ({event, system}) => {
        assertEvent(
          event,
          'page_settings.update_nik.success',
        )
        return {
          type: 'page_settings.update_nik.success',
          payload: event.payload,
        } satisfies x.page_settings.setting_nik.Ev
      },
    ),
  },
}).createMachine({
  id: 'with_nik',
  context: {
    xstore: use_xstore(),
  },
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
      entry: 'api_delete_nik',
      on: {
        'page_settings.rm_nik.success': {
          actions: 'send_parent_rm_nik_success',
        },
        'page_settings.rm_nik.fail': {
          actions: 'send_parent_rm_nik_fail',
          target: 'Idle',
        },
      },
    },
    Updating_nik: {
      entry: 'api_update_nik',
      on: {
        'page_settings.update_nik.success': {
          actions: 'send_parent_update_nik_success',
          target: 'Idle',
        },
        'page_settings.update_nik.fail': {
          target: 'Update_nik_err_showing',
        },
      },
    },
    Update_nik_err_showing: {
      on: {
        'page_settings.update_nik_err_showing.cancel': {
          target: 'Idle',
        },
        'page_settings.update_nik.again': {
          target: 'Updating_nik',
        },
      },
    },
  },
})
