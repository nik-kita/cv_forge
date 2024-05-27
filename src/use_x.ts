import {createActor} from 'xstate'
import {createBrowserInspector} from '@statelyai/inspect'
import {App_machine} from './App.x'
import {ref} from 'vue'

const init_x = () => {
  const {inspect} = createBrowserInspector()
  const App = createActor(App_machine, {
    inspect,
  })
  const App_snap = App.getSnapshot()
  const App_state = ref(App_snap.value)
  App.subscribe(s => {
    App_state.value = s.value
  })
  const auth = App_snap.children.auth!
  const auth_snap = auth.getSnapshot()
  const auth_state = ref(auth_snap.value)
  auth.subscribe(s => {
    auth_state.value = s.value
  })
  const nav = App_snap.children.nav!
  const nav_snap = nav.getSnapshot()
  const nav_state = ref(nav_snap.value)
  const lazy_pages = {
    page_profiles: nav_snap.children.page_profiles,
  }
  nav.subscribe(s => {
    nav_state.value = s.value
    lazy_pages.page_profiles = s.children.page_profiles
  })
  const fetcher_actor = App_snap.children.fetcher!
  App.start()

  console.assert(!!auth, 'auth is not defined')
  console.assert(!!nav, 'nav is not defined')
  console.assert(!!fetcher_actor, 'fetcher is not defined')

  return {
    App,
    App_state,
    nav,
    nav_state,
    auth,
    auth_state,
    lazy_pages,
  }
}

let x: ReturnType<typeof init_x> | undefined

export const use_x = () => x ?? (x = init_x())
