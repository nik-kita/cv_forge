import {api_get_all_profiles} from '@/api/api_get_all_profiles'
import {api_get_all_public_profiles_by_nik} from '@/api/api_get_all_public_profiles_by_nik'
import {get_access_token} from '@/local_storage/persistent.tokens'
import {watch} from 'vue'
import {assertEvent, assign, setup} from 'xstate'
import {api_to_fetch_logic} from '../utils/api_to_fetch_logic'
import {use_xstore} from '../xstore'

export const page_profiles_machine = setup({
  types: {
    context: {} as {
      explored_public_profiles?: ApiRes<
        'get',
        '/profiles/public/{nik}'
      >
      my_profiles?: ApiRes<'get', '/profiles/'>
    },
    events: {} as
      | {type: 'page_profiles.reset_machine'}
      | {type: 'page_profiles.public_nik.not_found'}
      | {type: 'page_profiles.toggle_select'}
      | {type: 'page_profiles.select.rm'}
      | {type: 'page_profiles.select.cancel'}
      | {type: 'page_profiles.config_rm_selected.yes'}
      | {type: 'page_profiles.config_rm_selected.no'}
      | {
          type: 'global.update_nik_route_param'
        }
      | {
          type: 'page_profiles.get_all_profiles.success'
          payload: ApiRes<'get', '/profiles/'>
        }
      | {
          type: 'page_profiles.get_all_public_profiles.success'
          payload: ApiRes<'get', '/profiles/public/{nik}'>
        },
  },
  actions: {
    success_get_all_public_profiles_by_nik: assign({
      explored_public_profiles: ({event}) => {
        assertEvent(
          event,
          'page_profiles.get_all_public_profiles.success',
        )

        return event.payload
      },
    }),
    api_get_all_public_profiles_by_nik: function ({
      context,
      event,
      self,
      system,
    }) {
      const {nik_curr_route_param} = use_xstore()
      if (!nik_curr_route_param.value) {
        self.send({
          type: 'page_profiles.public_nik.not_found',
        })

        return
      }
      api_to_fetch_logic(
        () => {
          return api_get_all_public_profiles_by_nik({
            nik: nik_curr_route_param.value!,
          })
        },
        {
          self,
          system,
          emit_on_success: res => {
            return {
              type: 'page_profiles.get_all_public_profiles.success',
              payload: res,
            }
          },
          emit_on_fail: err => {
            return {
              type: 'page_profiles.public_nik.not_found',
            }
          },
          is_access_token_required: false,
        },
      )
    },
    api_rm_profiles: function ({context, event}) {
      // Add your action code here
      // ...
    },
    success_get_all_profiles: assign({
      my_profiles: ({event}) => {
        assertEvent(
          event,
          'page_profiles.get_all_profiles.success',
        )

        return event.payload
      },
    }),
    api_get_all_profiles: function ({
      context,
      event,
      system,
      self,
    }) {
      console.warn('// TODO check always event type')
      api_to_fetch_logic(
        () =>
          api_get_all_profiles({
            access_token: get_access_token()!,
          }),
        {
          emit_on_success: res => {
            return {
              type: 'page_profiles.get_all_profiles.success',
              payload: res,
            }
          },
          is_access_token_required: true,
          system,
          self,
        },
      )
    },
  },
  guards: {
    is_owner: function ({context, event}) {
      const {viewer_role, is_user} = use_xstore()

      return is_user && viewer_role.value !== 'viewer'
    },
    is_some_select: function ({context, event}) {
      // Add your guard condition here
      return true
    },
  },
}).createMachine({
  /** @xstate-layout N4IgpgJg5mDOIC5QAcCGMD6yBOB7AZgJYA2cGAtqgMYAWhAdmAMRTG4BGqxAdAK7IRUAFzAZ6hANYY8vEVlTZU5ANoAGALqIUuWISGFc9LSAAeiALQBWVQDZuATkf2AHJYDMARgAstm5YA0IACeiH52HgDs9jbO9h62Hs5uNgC+KYFomDgEJGSUtAzMmaLZRKSw3DBCGFzEWHhlcNywvFRUcLBqmkggyDp6BkY9ZgiR8dxebhFuTvGq9l6BIQjmAEyT3BE2qjOWsfarq6qWaRnoJQ25sBTUdIzcAKL0IthMXcZ9uvqGxiMelpZVtwPAdLPYZhF5nElogwZYHO54qtoqt-jY3Kdeud6jlyjcCvcni83h5utovoNfohUR47JYvF5-m5LB5UQDFsFYfZ4dy3KofJNYhEIid0lispc8fk7mBuAARQiwNDEIIYXAAd3oOMasCYxW1V24QlwUFYolgYFIVCE7x6nwGP2G1NszmBoOcxzcXgObmcMJWvomTgiznWXhFrlFZwluLyt0K3AAypawNa9djSobjabSBgLVabRoPv1vkNQH8GV5uIDVB7Vr6pmD-asIlWbO2bIzou24vTMfrM1L4-dkwX0zGdUaTWa8ynrcpScWKY7y4hIpDuH5nFF+VsIqtYv74vCvHs+aoL24jnEMWKB5K4wTZaPU0JxxdYxV86-uNgVEW7RLSknQQTwqzBKYLxBVYwQvGx-TWTZa19ZxvBFWthVrfsMwfa5pQTF803vT9mjnIRuCoVB6HaYhbXJB0y1MRBwSBaCbHiDx-iRNx-WZeEkjcQTVFbesvAPCJsInK58RlbgAGFDCIP9pHIWcC0gA1ynfTSmioRTCCgFS1NfSBuCCOA6N6ICVyYhAfHhdDhJsewRWZdF4M5Oza2rUTWVWGJ-ijcUPx1GSEwU+glNU5Tv2tDTBzgbSEoqPTIoMozYpECBuHoXBLPtUsqTs7YJlpETUVcdFW14kFq0Zdj4hcRkjlvMVcogOAPhwz8wsYJcGKKqx6QcJxXDA3wAk88xWR5YN91pQ51lvaMQuk-DCWeMBsH6wqQNDCJuBbQS+I9RqPH9dxVG4VRWWiK9vDBfdJNWocn3lRVlVVDUtWSnbgNXUYxs3FzQ2scEI3sf1Jn4wTkWmFzO3rILiNC9bZQVJViFQVVkF4dhiEIKgdPgQDl0YkZUR8bhkgZZwxO5BYOWWKIeWRGx-IOexhNZZ7id658yL+myRicBxpmcdE2dPGCj3BCY9jhiJOJDGJUjvbrUeHWUIqijKyPi3ChfJiwQVdMFnAlmYGfrFwavsOraU4+Y6Z5tIUiAA */
  context: ({self}) => {
    const {nik_curr_route_param} = use_xstore()

    watch(nik_curr_route_param, () => {
      self.send({type: 'page_profiles.reset_machine'})
    })

    return {}
  },
  id: 'page_profiles_machine',
  initial: 'Enter',
  on: {
    'page_profiles.reset_machine': {
      target: '.Enter',
    },
    'global.update_nik_route_param': {
      target: '#page_profiles_machine.Enter',
    },
    'page_profiles.get_all_profiles.success': {
      actions: ({event}) => {},
    },
  },
  states: {
    Enter: {
      always: [
        {
          reenter: true,
          target: 'Dispaly_own_profiles',
          actions: {
            type: 'api_get_all_profiles',
          },
          guard: {
            type: 'is_owner',
          },
        },
        {
          reenter: true,
          target: 'Display_public_profiles',
          actions: {
            type: 'api_get_all_public_profiles_by_nik',
          },
        },
      ],
    },
    Dispaly_own_profiles: {
      on: {
        'page_profiles.get_all_profiles.success': {
          actions: 'success_get_all_profiles',
        },
        'page_profiles.toggle_select': {
          target: 'Select',
          guard: {
            type: 'is_some_select',
          },
        },
      },
    },
    Display_public_profiles: {
      on: {
        'page_profiles.public_nik.not_found': {
          target: '.Propose_to_explore',
        },
        'page_profiles.get_all_public_profiles.success': {
          target: '.Display',
          actions: 'success_get_all_public_profiles_by_nik',
        },
      },
      initial: 'Display',
      states: {
        Propose_to_explore: {},
        Display: {},
      },
    },
    Select: {
      on: {
        'page_profiles.toggle_select': [
          {
            target: 'Select',
            guard: {
              type: 'is_some_select',
            },
          },
          {
            target: 'Dispaly_own_profiles',
          },
        ],
        'page_profiles.select.rm': {
          target: 'Confirm_rm_selected_profiles',
        },
        'page_profiles.select.cancel': {
          target: 'Dispaly_own_profiles',
        },
      },
    },
    Confirm_rm_selected_profiles: {
      on: {
        'page_profiles.config_rm_selected.yes': {
          target: 'Dispaly_own_profiles',
          actions: [
            {
              type: 'api_rm_profiles',
            },
            {
              type: 'api_get_all_profiles',
            },
          ],
        },
        'page_profiles.config_rm_selected.no': {
          target: 'Select',
        },
      },
    },
  },
})
