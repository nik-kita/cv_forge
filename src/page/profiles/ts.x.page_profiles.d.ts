import type {
  AnyActorRef,
  ContextFrom,
  EventFromLogic,
  InputFrom,
} from 'xstate'
import type {PageProfiles_machine} from './PageProfiles.x'

declare global {
  namespace x.page_profiles {
    export type logic = typeof PageProfiles_machine
    export type Ctx = {
      explored_public_profiles?: ApiRes<
        'get',
        '/profiles/public/{nik}'
      >
      my_profiles?: ApiRes<'get', '/profiles/'>
    }
    export type Ev =
      | {
          type: 'page_profiles.item.display'
        }
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
        }
    export type Input = {}
    export type Children = {
      single_profile: 'single_profile'
    }
  }
}

export {}
