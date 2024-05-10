import type {
  DoneActorEvent as origin_DoneActorEvent,
  ErrorActorEvent as origin_ErrorActorEvent,
} from 'xstate'

namespace x {
  export type DoneActorEvent<Id extends string, T> =
    | OmitReplace<
        origin_DoneActorEvent<T>,
        {
          type: `xstate.done.actor.${Id}`
        }
      >
    | OmitReplace<
        origin_ErrorActorEvent<T>,
        {
          type: `xstate.error.actor.${Id}`
        }
      >
}
