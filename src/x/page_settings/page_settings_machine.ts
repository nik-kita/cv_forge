import {setup, spawnChild} from 'xstate'
import {use_xstore} from '../xstore'
import {setting_nik_machine} from './children/setting_nik/setting_nik_machine'

export const page_settings_machine = setup({
  types: {
    children: {} as x.page_settings.Children,
  },
  actors: {
    setting_nik: setting_nik_machine,
  },
}).createMachine({
  context: {
    xstore: use_xstore(),
  },
  entry: spawnChild('setting_nik', {id: 'setting_nik'}),
})
