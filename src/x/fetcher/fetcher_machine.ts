import type {ActorRefFrom} from 'xstate'
import {assertEvent, assign, setup, stopChild} from 'xstate'
import {fetch_machine} from './fetch_machine'

/**
 * @description
 * Fetcher machine
 * (spawn and communicate between fetch machines)
 */
export const fetcher_machine = setup({
  types: {
    input: {} as x.fetcher.Input,
    context: {} as x.fetcher.Ctx,
    events: {} as x.fetcher.Ev,
  },
  actions: {
    spawn_fetch: assign(
      ({system, context, event, spawn, self}) => {
        assertEvent(event, 'fetcher.api')

        const auth_actor = system.get(
          'auth',
        ) as ActorRefFrom<x.auth.logic>
        return {
          spawned_fetches: [
            ...context.spawned_fetches,
            spawn(fetch_machine, {
              input: {
                ...event.payload,
                auth_actor,
                is_refresh_processing:
                  context.is_refresh_processing,
              } satisfies x.fetcher.Input,
            }),
          ],
        }
      },
    ),
    assign_is_refresh_processing_false: assign({
      is_refresh_processing: false,
    }),
    assign_is_refresh_processing_true: assign({
      is_refresh_processing: true,
    }),
    emit_children_refreshing_success({context}) {
      context.spawned_fetches.forEach(sf =>
        sf.send({type: 'fetch.refresh.success'}),
      )
    },
    emit_children_refreshing_fail({context}) {
      context.spawned_fetches.forEach(sf =>
        sf.send({type: 'fetch.refresh.fail'}),
      )
    },
    kill_spawned_fetch: assign(({context, event}) => {
      assertEvent(
        event,
        'fetcher.please_kill_me_because_i_am_done',
      )
      const i = context.spawned_fetches.findIndex(sf => {
        if (sf === event.i_am) {
          return true
        }
      })
      const [done_fetch] = context.spawned_fetches.splice(
        i,
        1,
      )

      stopChild(done_fetch)

      return {
        spawned_fetches: [...context.spawned_fetches],
      }
    }),
  },
}).createMachine({
  /** @xstate-layout N4IgpgJg5mDOIC5QDMwBcDGALMAnAxKpjrgHQCGADgJYDaADALqKiUD2s1a1bAdiyAAeiAGwBGMaQDsAZnr0ArAqkBOejKlSRAGhABPRDIBMpBTIAsKgBxWZCsSPqyVIgL6vdRbHkLpvZXDBkQNgsUlg0clw0BmYkEHZObj4BYQQ7FVIjO3oxBSNrPKNzHX1DKStSMRzi82yZK3yZd08-El9iPFJA4Lgw2ABXDAw4WFiBRK4efni083NSDXl6EUsnJTEjXQN0iqqa+frG7JaQL3bzrp6QsORyagAbcfjJ5JnQNJEZUnMpIwUnBoFCoxNYVNtDGIFpoATIQX8zCt3B4QLw2BA4AJLrgJhwpilZogALTfEQFFQqHIqWo2CwQhASBZmCmaFlWKT5KynbGkABybFwAFtyA9cUlpqlECopKQRAD5Gpll96FZ6UZ6CZzEp5GJZFYoXIpNy2l0AEpBG7UXhQMX495CQwqBbsgFQr4SfJScxqjU-bW5PUGpzI1xAA */
  context: ({input}) => {
    return {
      spawned_fetches: [],
      is_refresh_processing: false,
    }
  },
  id: 'fetcher',
  initial: 'Normal',
  states: {
    Normal: {
      entry: 'assign_is_refresh_processing_false',
    },
    Refreshing: {
      entry: 'assign_is_refresh_processing_true',
    },
  },
  on: {
    'fetcher.please_kill_me_because_i_am_done': {
      actions: 'kill_spawned_fetch',
    },
    'fetcher.api': {
      actions: 'spawn_fetch',
    },
    'fetcher.refresh.start': {
      target: '.Refreshing',
    },
    'fetcher.refresh.success': {
      target: '.Normal',
    },
    'fetcher.refresh.fail': {
      target: '.Normal',
      actions: ({system}) => {
        const ev = {
          type: 'auth.user.unauthorized',
        } satisfies x.auth.Ev

        const auth = system.get(
          'auth',
        ) as ActorRefFrom<x.auth.logic>

        auth.send(ev)
      },
    },
  },
})
