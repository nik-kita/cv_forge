import {createActor} from 'xstate'
import {root_machine} from './x/root/root_machine'

const init_x = () => {
  const root = createActor(root_machine)
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
  }
}

let x: ReturnType<typeof init_x> | undefined

export const use_x = () => x ?? (x = init_x())
