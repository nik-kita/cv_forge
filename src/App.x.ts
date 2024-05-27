import {fetcher_machine} from '@/common_xstate/fetcher/fetcher_machine'
import {setup} from 'xstate'
import {auth_machine} from './common_xstate/auth/auth_machine'
import {nav_machine} from './service/router/x/nav_machine'

export const App_machine = setup({
  types: {
    children: {} as x.App.Children,
  },
  actors: {
    auth: auth_machine,
    nav: nav_machine,
    fetcher: fetcher_machine,
  },
}).createMachine({
  id: 'App',
  context({spawn}) {
    spawn('fetcher', {
      id: 'fetcher',
      systemId: 'fetcher',
      input: {},
    })
    spawn('auth', {id: 'auth', systemId: 'auth'})
    spawn('nav', {id: 'nav', systemId: 'nav'})
    return {}
  },
})
