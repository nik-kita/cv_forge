import {use_xstore} from '@/x/xstore'
import {assertEvent, sendParent, setup} from 'xstate'

export const with_nik_machine = setup({
  types: {
    events: {} as x.page_settings.setting_nik.Ev,
    context: {} as x.page_settings.setting_nik.Ctx,
  },
  actions: {
    send_parent_rm_nik_success: sendParent(({event}) => {
      assertEvent(event, 'page_settings.rm_nik.success')

      return {
        type: 'page_settings.rm_nik.success',
      } satisfies x.page_settings.setting_nik.Ev
    }),
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
      on: {
        'page_settings.rm_nik.success': {
          actions: 'send_parent_rm_nik_success',
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
