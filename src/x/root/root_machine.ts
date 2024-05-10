import {setup} from 'xstate'
import {auth_machine} from '../auth/auth_machine'
import {nav_machine} from '../nav/nav_machine'

export const root_machine = setup({
  types: {
    children: {} as x.root.Children,
  },
  actors: {
    auth: auth_machine,
    nav: nav_machine,
  },
}).createMachine({
  context({spawn}) {
    spawn('auth', {id: 'auth'})
    spawn('nav', {id: 'nav'})
    return {}
  },
})
