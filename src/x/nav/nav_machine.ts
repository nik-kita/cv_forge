import {router} from '@/router/router'
import {
  assign,
  raise,
  setup,
  stopChild,
  type ActorRefFrom,
} from 'xstate'
import {page_settings_machine} from '../page_settings/page_settings_machine'
import {use_xstore} from '../xstore'
import {
  integrate_router,
  navigate,
  raise_nav_ev,
} from './actions'

export const nav_machine = setup({
  types: {
    events: {} as x.nav.Ev,
    context: {} as x.nav.Ctx,
    children: {} as x.nav.Children,
  },
  actions: {
    navigate,
    integrate_router,
    unspawn_page_settings: stopChild(({event, system}) => {
      return system.get('page_settings')
    }),
    spawn_page_settings: assign(({spawn, system}) => {
      if (system.get('page_settings')) return {}

      spawn('page_settings', {
        id: 'page_settings',
        systemId: 'page_settings',
      })

      return {}
    }),
  },
  actors: {
    page_settings: page_settings_machine,
  },
  guards: {
    is_user: ({context}) => {
      return context.xstore.is_user.value
    },
  },
}).createMachine({
  /** @xstate-layout N4IgpgJg5mDOIC5QDsCGA3AxG9A6ATmAI4CucALgPrkD2lOAllKuWANoAMAuoqAA41YDcgxrJeIAB6IATAEZcAZgCsATkUB2ZQBoQAT0QaZAX2O6c2DLlq4ACqhgAJGgFt23CQKEixE6QgBaOVUANlwAFk0dfURw1WUIjhCZZVNzDEs8G1t8GgAzBgAbOE4eJBAvYVFxcv8ZZN0DBDiE8KSUtJALHGsaOwcwAGUwchFkKFhSz0Eq31rEAI5cZQ0ADjkUxsQQ8PDcOUUZdY7O5BoIOAkcae9qvwWZXYiorYQjjVwQjVDVrVOrexOVxgG6zGqgfxBEKqXCqeS-aJNcIyGT7b4hBH-PCAsA5fJFS7lSo+cFSWTJXAcNYbRGxFFon5-MxdAEDYajBjjeBEmYk+4IEKKT7ohGvZGouQipmmIA */
  id: 'nav',
  entry: 'integrate_router',
  on: {
    'nav.request_to_navigate': {
      actions: raise(raise_nav_ev),
    },

    'nav.to.PageHome': {
      target: '.PageHome',
      actions: 'navigate',
    },

    'nav.to.PageProfiles': {
      target: '.PageProfiles',
      actions: 'navigate',
    },

    'nav.to.PageSettings': {
      target: '.PageSettings',
      guard: 'is_user',
      actions: ['navigate', 'spawn_page_settings'],
    },
  },
  context() {
    return {
      xstore: use_xstore(),
      router,
      nav_toggle_guard: {
        allow: false,
      },
    }
  },
  initial: 'PageHome',
  states: {
    PageHome: {},
    PageProfiles: {},
    PageSettings: {},
  },
})
