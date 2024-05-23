import {setup} from 'xstate'

export const page_profiles_machine = setup({
  types: {
    context: {} as {},
    events: {} as
      | {type: 'page_profiles.toggle_select'}
      | {type: 'page_profiles.select.rm'}
      | {type: 'page_profiles.config_rm_selected.yes'}
      | {type: 'page_profiles.config_rm_selected.no'}
      | {type: 'page_profiles.select.cancel'}
      | {type: 'global.update_nik_route_param'},
  },
  actions: {
    api_get_all_profiles: function ({context, event}) {
      // Add your action code here
      // ...
    },
    api_rm_profiles: function ({context, event}) {
      // Add your action code here
      // ...
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
  },
  states: {
    Enter: {
      always: [
        {
          target: 'Dispaly_own_profiles',
          guard: {
            type: 'is_owner',
          },
        },
        {
          target: 'Display_public_profiles',
        },
      ],
      entry: 'api_get_all_profiles',
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
