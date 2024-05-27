import {api_delete_nik} from '@/api/api_delete_nik'
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

export const WithNik_machine = setup({
  types: {
    events: {} as x.PageSettings.setting_nik.Ev,
    context: {} as x.PageSettings.setting_nik.Ctx,
  },
  actions: {
    set_client_err_message: assign({
      client_err_message: ({event}) => {
        assertEvent(event, 'page_settings.update_nik.fail')

        return event.payload
      },
    }),
    unset_client_err_message: assign({
      client_err_message: undefined,
    }),
    send_parent_rm_nik_success: sendParent(
      ({event, system}) => {
        assertEvent(event, 'page_settings.rm_nik.success')
        return {
          type: 'page_settings.rm_nik.success',
        } satisfies x.PageSettings.setting_nik.Ev
      },
    ),
    send_parent_rm_nik_fail: sendParent(({event}) => {
      assertEvent(event, 'page_settings.rm_nik.fail')

      return {
        type: 'page_settings.rm_nik.fail',
      } satisfies x.PageSettings.setting_nik.Ev
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
      assertEvent(event, [
        'page_settings.update_nik',
        'page_settings.update_nik.again',
      ])
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
          emit_on_fail: async (
            err: ApiErr<'put', '/user/nik/{nik}', 400>,
          ) => {
            return {
              type: 'page_settings.update_nik.fail',
              payload: await err.json().then(j => {
                return j.beauty_message || j.message
              }),
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
        } satisfies x.PageSettings.setting_nik.Ev
      },
    ),
  },
}).createMachine({
  /** @xstate-layout N4IgpgJg5mDOIC5QHcCWAXAFgfQHaoGsA6ASQgBswBiABwEMZtYx11VcpYiAnAWz0IBtAAwBdRKBoB7WBlRTcEkAA9EADgDsAZiIAWAIwBOAExb9Z4xoBsuqwBoQAT0RXhGooeH7hWr2oCsxp7GAL4hDmhYAsRklLQMYEwsbBxcAK40EHToifgEIuJIINKybApKqgiaOgYmZhbWtg7OCFpW7v4aavrGVoZamhq6-mERGDh5RAAiYJQpUNHxjMys7Jw8-JOwaQDGO3CwBUolcuVFlfpGxkRaxv661hrGbsa6zYi6Wv5EfVpfaro1JZhCZRiBIhNCNNZiw1ot6MtkmsuHxokQAGZ0VDkI5FE5lRTnRCGT43YTPXTA55uLTvBD+Ho-YZAoFWfSBfxWMEQtEAVUy2TheSWiRW83SApyaO2ewOuMkMlOhNAlWqeiu9R6jXsTg++ncWk8Vl6fw01m8Wm54z5kqFhBFSVWqSIGSyUsmmOx8uKioJFWJlyZAPJzOE-iBdO6N2MQTuXn8whBhn0Vqik35btyhGwYG43CYmCkaA4DrFyJdkqzBBzeYLRbWRB2dFw+xxYmOvvkypUiFuaiI-jaul0JhHiasXzpA30RB6Ca8Wm0ZpjqchxAz2SrNfzsELxagpaRztdm7RDCxuG9+K7-taxn7g5sI9enmEE-8dNe7n1+kGphM3SmGE4QgLgUgQHASg8nkHalDeRIIAAtDqLTIauaKxGAsFKreTxWHoujjmo3ReMOKG9lG942K4WiAr0-ToZMMxzHaBDYX6CE9KYHgBBOrztCO-R0oO3wkrxwiETY2hqIxUIbvM0TsfBKqIFxOiGLxty2EMhhCbqCCmOp4Z-FYahmO0Gm6LJ66VtE251vuSlnCpCCUnS3jCEQmicp07K6eGwgycBQA */
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
          actions: 'set_client_err_message',
        },
      },
    },
    Update_nik_err_showing: {
      exit: 'unset_client_err_message',
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
