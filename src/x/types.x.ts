import type {DoneActorEvent, ErrorActorEvent} from 'xstate'

namespace x {
  export type DoneActorEv<Id extends string, T> =
    | OmitReplace<
        DoneActorEvent<T>,
        {
          type: `xstate.done.actor.${Id}`
        }
      >
    | OmitReplace<
        ErrorActorEvent<T>,
        {
          type: `xstate.error.actor.${Id}`
        }
      >
}
