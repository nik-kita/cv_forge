import type {ActorRefFrom, AnyActorRef} from 'xstate'
import type {fetcher_machine} from './fetcher_machine'

declare global {
  namespace x.fetcher {
    export type logic = typeof fetcher_machine
    export type Input = {}
    export type Ctx = {
      spawned_fetches: ActorRefFrom<x.fetch.logic>[]
      is_refresh_processing: boolean
    }
    export type Ev =
      | {
          type: 'fetcher.please_kill_me_because_i_am_done'
          i_am: AnyActorRef
        }
      | {type: 'fetcher.refresh.fail'}
      | {
          type: 'fetcher.refresh.success'
        }
      | {type: 'fetcher.refresh.start'}
      | {
          type: 'fetcher.api'
          payload: Partial<
            Pick<
              x.fetch.Ctx,
              | 'emit_on_fail'
              | 'emit_on_success'
              | 'consumer_ref'
            >
          > &
            Pick<
              x.fetch.Ctx,
              'api_call' | 'is_access_token_required'
            >
        }
  }
}

export {}
