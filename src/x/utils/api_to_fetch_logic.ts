import type {
  ActorRefFrom,
  ActorSystem,
  AnyActorRef,
} from 'xstate'

type _Payload = Extract<
  x.fetcher.Ev,
  {type: 'fetcher.api'}
>['payload']

export const api_to_fetch_logic = <
  T extends _Payload['api_call'] = _Payload['api_call'],
>(
  api_call: T,
  options: {
    emit_on_success?: (
      res: Awaited<ReturnType<typeof api_call>>,
    ) => x.Ev
    emit_on_fail?: x.fetch.Input['emit_on_fail']
    system: ActorSystem<any>
    self: AnyActorRef
  } & Pick<_Payload, 'is_access_token_required'>,
) => {
  const {self, system, ...rest_options} = options
  const fetcher = system.get(
    'fetcher',
  )! as ActorRefFrom<x.fetcher.logic>
  console.assert(!!fetcher, 'fetcher is not defined')
  fetcher.send({
    type: 'fetcher.api',
    payload: {
      consumer_ref: self,
      api_call,
      ...rest_options,
    },
  })
}
