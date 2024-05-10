import {createActor} from 'xstate'
import {root_machine} from './x/root/root_machine'

const root = createActor(root_machine)
const rsnapshot = root.getSnapshot()
const auth = rsnapshot.children.auth!
const nav = rsnapshot.children.nav!

root.start()
export const use_x = () => {
  return {
    nav,
    auth,
  }
}

console.assert(!!auth, 'auth is not defined')
console.assert(!!nav, 'nav is not defined')
