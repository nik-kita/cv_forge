import type {
  ContextFrom,
  EventFromLogic,
  InputFrom,
} from 'xstate'
import type {PageProfiles_machine} from './PageProfiles.x'

declare global {
  namespace x.page_profiles {
    export type logic = typeof PageProfiles_machine
    export type Ctx = ContextFrom<logic>
    export type Ev = EventFromLogic<logic>
    export type Input = InputFrom<logic>
  }
}

export {}
