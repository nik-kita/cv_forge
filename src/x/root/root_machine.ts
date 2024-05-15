import {fetcher_machine} from '@/x/fetcher/fetcher_machine'
import {assign, setup} from 'xstate'
import {auth_machine} from '../auth/auth_machine'
import {nav_machine} from '../nav/nav_machine'
import {page_settings_machine} from '../page_settings/page_settings_machine'

export const root_machine = setup({
  types: {
    children: {} as x.root.Children,
    events: {} as x.root.Ev,
  },
  actors: {
    auth: auth_machine,
    nav: nav_machine,
    fetcher: fetcher_machine,
    page_settings: page_settings_machine,
  },
}).createMachine({
  id: 'root',
  context({spawn}) {
    spawn('auth', {id: 'auth', systemId: 'auth'})
    spawn('nav', {id: 'nav', systemId: 'nav'})
    spawn('fetcher', {
      id: 'fetcher',
      systemId: 'fetcher',
      input: {},
    })
    return {}
  },
  on: {
    'root.spawn.page_settings': {
      actions: assign(({spawn, system}) => {
        if (system.get('page_settings')) return
        spawn('page_settings', {
          id: 'page_settings',
          systemId: 'page_settings',
          input: {},
        })
      }),
    },
  },
})
