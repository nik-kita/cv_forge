import type {ActionArgs} from 'xstate'

export const action_logout = ({context}: Args) => {
  context.xstore.user.value = undefined
}

export const action_sign_in_success = ({context}: Args) => {
  context.xstore.user.value = {
    nik: '123',
  }
}

type Args = ActionArgs<x.auth.Ctx, x.auth.Ev, x.auth.Ev>
