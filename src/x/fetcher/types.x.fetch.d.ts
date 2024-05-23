import type {fetch_machine} from './fetch_machine'

declare global {
  namespace x.fetch {
    export type logic = typeof fetch_machine
    export type Input = {
      is_access_token_required: boolean
      is_refresh_processing: boolean
      auth_actor: ActorRefFrom<x.auth.logic>
      api_call: () => Promise<any>
      emit_on_success?: (...args: any[]) => x.Ev
      emit_on_fail?: (
        ...args: any[]
      ) => x.Ev | Promise<x.Ev>
      consumer_ref?: AnyActorRef
    }
    export type Ctx = Input & x.Xstore & {}
    export type Ev =
      | {type: 'fetch.refresh.fail'}
      | {
          type: 'fetch.refresh.success'
        }
      | x.DoneActorEv<
          'api_refresh',
          ApiRes<'post', '/auth/refresh'>
        >
      | x.SuccessDoneActorEv<
          'req',
          {
            emit_on_success: () => void
          }
        >
      | x.FailDoneActorEv<
          'req',
          {
            err_container: [
              err: Response,
              emit_on_fail?: () => void | Promise<void>,
            ]
          }
        >
  }
}

export {}
