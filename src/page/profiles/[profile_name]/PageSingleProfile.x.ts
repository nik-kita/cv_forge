import {setup} from 'xstate'

export const PageSingleProfile_machine = setup(
  {},
).createMachine({
  initial: 'Idle',
  states: {
    Idle: {},
  },
})
