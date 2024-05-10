import {nav_machine} from '@/x/nav/nav_machine'
import {createActor} from 'xstate'
import {auth_machine} from './x/auth/auth_machine'

const nav = createActor(nav_machine)
const auth = createActor(auth_machine)

export const use_x = () => {
  return {
    nav,
    auth,
  }
}
