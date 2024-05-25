import type {
  ContextFrom,
  EventFromLogic,
  InputFrom,
} from 'xstate'
import type {page_profiles_machine} from './page_profiles_machine'

declare global {
  namespace x.page_profiles {
    export type logic = typeof page_profiles_machine
    export type Ctx = ContextFrom<logic>
    export type Ev = EventFromLogic<logic>
    export type Input = InputFrom<logic>
  }
}

export {}
