import type {DoneActorEvent, ErrorActorEvent} from 'xstate'
import type {use_xstore} from './xstore'

declare global {
  namespace x {
    export type Ev =
      | x.auth.Ev
      | x.fetcher.Ev
      | x.fetch.Ev
      | x.nav.Ev
      | x.page_settings.setting_nik.Ev
      | x.page_profiles.Ev
    export type Xstore = {
      xstore: ReturnType<typeof use_xstore>
    }
    export type SuccessDoneActorEv<
      Id extends string,
      T,
    > = OmitReplace<
      DoneActorEvent<T>,
      {
        type: `xstate.done.actor.${Id}`
      }
    >
    export type FailDoneActorEv<
      Id extends string,
      T,
    > = OmitReplace<
      ErrorActorEvent<T>,
      {
        type: `xstate.error.actor.${Id}`
      }
    >
    export type DoneActorEv<Id extends string, T> =
      | SuccessDoneActorEv<Id, T>
      | FailDoneActorEv<Id, T>
  }
}

export {}
