import {setup} from 'xstate'

export const PageSingleProfile_machine = setup(
  {},
).createMachine({
  context() {
    console.log('SINGLE PROFILE CONTEXT')
  },
})
