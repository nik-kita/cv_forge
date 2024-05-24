import {api_get_all_profiles} from '@/api/api_get_all_profiles'
import {get_access_token} from '@/local_storage/persistent.tokens'
import {assertEvent, assign, setup} from 'xstate'
import {api_to_fetch_logic} from '../utils/api_to_fetch_logic'

export const page_profiles_machine = setup({
  types: {
    context: {} as {
      explored_public_profiles?: {}
      my_profiles?: ApiRes<'get', '/profiles/'>
    },
    events: {} as
      | {type: 'page_profiles.toggle_select'}
      | {type: 'page_profiles.select.rm'}
      | {type: 'page_profiles.select.cancel'}
      | {type: 'page_profiles.config_rm_selected.yes'}
      | {type: 'page_profiles.config_rm_selected.no'}
      | {
          type: 'global.update_nik_route_param'
          payload: ApiRes<'get', '/profiles/'>
        }
      | {
          type: 'page_profiles.get_all_profiles.success'
          payload: ApiRes<'get', '/profiles/'>
        },
  },
  actions: {
    success_get_all_public_profiles_by_nik: assign({}),
    api_get_all_public_profiles_by_nik: function ({
      context,
      event,
    }) {
      // Add your action code here
      // ...
    },
    api_rm_profiles: function ({context, event}) {
      // Add your action code here
      // ...
    },
    success_get_all_profiles: assign({}),
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
          emit_on_fail: err => {
            return {} as any
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
      // Add your guard condition here
      return true
    },
    is_some_select: function ({context, event}) {
      // Add your guard condition here
      return true
    },
  },
}).createMachine({
  context: {},
  id: 'page_profiles_machine',
  initial: 'Enter',
  on: {
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
          target: 'Dispaly_own_profiles',
          actions: {
            type: 'api_get_all_profiles',
          },
          guard: {
            type: 'is_owner',
          },
        },
        {
          target: 'Display_public_profiles',
          actions: {
            type: 'api_get_all_public_profiles_by_nik',
          },
        },
      ],
    },
    Dispaly_own_profiles: {
      on: {
        'page_profiles.toggle_select': {
          target: 'Select',
          guard: {
            type: 'is_some_select',
          },
        },
      },
    },
    Display_public_profiles: {},
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
