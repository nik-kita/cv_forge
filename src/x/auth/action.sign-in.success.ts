import {use_xstore} from '../xstore'

const {is_user} = use_xstore()

export const action_sign_in_success = () => {
  is_user.value = true
}
