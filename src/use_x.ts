import {createActor} from 'xstate'
import {createBrowserInspector} from '@statelyai/inspect'
import {App_machine} from './App.x'

const init_x = () => {
  const {inspect} = createBrowserInspector()
  const App = createActor(App_machine, {
    inspect,
  })
  const rsnapshot = App.getSnapshot()
  const auth = rsnapshot.children.auth!
  const nav = rsnapshot.children.nav!
  const fetcher = rsnapshot.children.fetcher!

  console.assert(!!auth, 'auth is not defined')
  console.assert(!!nav, 'nav is not defined')
  console.assert(!!fetcher, 'fetcher is not defined')
  App.start()

  return {
    nav,
    auth,
    App,
  }
}

let x: ReturnType<typeof init_x> | undefined

export const use_x = () => x ?? (x = init_x())
