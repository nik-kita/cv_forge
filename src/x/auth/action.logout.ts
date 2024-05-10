import {use_xstore} from '../xstore'

const {is_user} = use_xstore()

export const action_logout = () => {
  is_user.value = false
}
