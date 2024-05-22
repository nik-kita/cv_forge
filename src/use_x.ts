import {createActor} from 'xstate'
import {root_machine} from './x/root/root_machine'
import {createBrowserInspector} from '@statelyai/inspect'

const init_x = () => {
  const {inspect} = createBrowserInspector()
  const root = createActor(root_machine, {
    inspect,
  })
  const rsnapshot = root.getSnapshot()
  const auth = rsnapshot.children.auth!
  const nav = rsnapshot.children.nav!
  const fetcher = rsnapshot.children.fetcher!

  console.assert(!!auth, 'auth is not defined')
  console.assert(!!nav, 'nav is not defined')
  console.assert(!!fetcher, 'fetcher is not defined')
  root.start()

  return {
    nav,
    auth,
    root,
  }
}

let x: ReturnType<typeof init_x> | undefined

export const use_x = () => x ?? (x = init_x())
