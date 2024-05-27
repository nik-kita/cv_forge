import {setup, spawnChild} from 'xstate'
import {use_xstore} from '../../common_xstate/xstore'
import {SettingNik_machine} from './lib/setting_nik/SettingNik.x'

export const page_settings_machine = setup({
  types: {
    children: {} as x.PageSettings.Children,
  },
  actors: {
    setting_nik: SettingNik_machine,
  },
}).createMachine({
  id: 'page_settings_machine',
  context: {
    xstore: use_xstore(),
  },
  entry: spawnChild('setting_nik', {
    id: 'setting_nik',
    systemId: 'setting_nik',
  }),
})
