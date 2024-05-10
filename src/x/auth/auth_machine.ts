import {setup} from 'xstate'

export const auth_machine = setup({
  types: {
    context: {} as x.auth.Ctx,
    events: {} as x.auth.Ev,
  },
}).createMachine({
  id: 'auth',
  context() {
    return {}
  },
  initial: 'Start',
  states: {
    Start: {
      always: {
        target: 'Guest',
      },
    },
    Guest: {},
    User: {},
  },
})
