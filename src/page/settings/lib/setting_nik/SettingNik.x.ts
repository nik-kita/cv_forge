import {assertEvent, setup, spawnChild} from 'xstate'
import {use_xstore} from '@/common_xstate/xstore'
import {NoNik_machine} from './no_nik/NoNik.x'
import {WithNik_machine} from './with_nik/WithNik.x'

export const SettingNik_machine = setup({
  types: {
    events: {} as x.PageSettings.setting_nik.Ev,
    context: {} as x.PageSettings.setting_nik.Ctx,
    children: {} as x.PageSettings.setting_nik.Children,
  },
  actors: {
    no_nik: NoNik_machine,
    with_nik: WithNik_machine,
  },
  actions: {
    update_nik_in_xstore: function ({context, event}) {
      assertEvent(event, [
        'page_settings.update_nik.success',
        'page_settings.add_nik.success',
        'page_settings.rm_nik.success',
      ])

      if (event.type === 'page_settings.rm_nik.success') {
        context.xstore.nik.value = undefined
      } else {
        context.xstore.nik.value = event.payload
      }
    },
  },
  guards: {
    has_nik: function ({context, event}) {
      return !!context.xstore.nik.value
    },
  },
}).createMachine({
  id: 'setting_nik',
  context: {
    xstore: use_xstore(),
  },
  on: {
    'page_settings.add_nik.success': {
      target: '.With_nik',
      actions: 'update_nik_in_xstore',
    },
    'page_settings.rm_nik.success': {
      target: '.No_nik',
      actions: 'update_nik_in_xstore',
    },
    'page_settings.reset_machine': {
      target: '.Init',
    },
    'page_settings.update_nik.success': {
      actions: 'update_nik_in_xstore',
    },
  },
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
      entry: spawnChild('with_nik', {id: 'with_nik'}),
    },
    No_nik: {
      entry: spawnChild('no_nik', {id: 'no_nik'}),
    },
  },
})
