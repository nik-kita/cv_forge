import {use_xstore} from '@/common_xstate/xstore'
import {setup} from 'xstate'

export const PageSingleProfile_machine = setup({
  guards: {
    is_own_profile() {
      const {is_user, nik, nik_curr_route_param} =
        use_xstore()

      return (
        is_user.value &&
        (!nik_curr_route_param.value ||
          nik_curr_route_param.value === nik.value)
      )
    },
  },
}).createMachine({
  id: 'page_single_profile_machine',
  initial: 'Init',
  states: {
    Init: {
      always: [
        {
          target: 'Own',
          guard: 'is_own_profile',
        },
        {
          target: 'Public',
        },
      ],
    },
    Public: {},
    Own: {},
  },
})
