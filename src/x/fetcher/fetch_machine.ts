import {api_refresh} from '@/api/api_refresh'
import {get_refresh_token} from '@/local_storage/persistent.tokens'
import {fn_to_promise_logic} from '@/x/utils/fn_to_promise_logic'
import {
  assertEvent,
  fromPromise,
  sendParent,
  sendTo,
  setup,
} from 'xstate'
import {use_xstore} from '../xstore'

export const fetch_machine = setup({
  types: {
    input: {} as x.fetch.Input,
    context: {} as x.fetch.Ctx,
    events: {} as x.fetch.Ev,
  },
  actions: {
    emit_im_done: sendParent(({self}) => {
      return {
        type: 'fetcher.please_kill_me_because_i_am_done',
        i_am: self,
      } satisfies x.fetcher.Ev
    }),
    emit_refresh_start: sendParent({
      type: 'fetcher.refresh.start',
    } satisfies x.fetcher.Ev),
    emit_logout: sendTo('auth', {
      type: 'auth.user.logout',
    } satisfies x.auth.Ev),
    emit_refresh_success: sendParent({
      type: 'fetcher.refresh.success',
    } satisfies x.fetcher.Ev),
    emit_refresh_fail: sendParent({
      type: 'fetcher.refresh.fail',
    } satisfies x.fetcher.Ev),
    update_tokens_after_success_refresh: ({
      event,
      context,
    }) => {
      assertEvent(event, [
        'xstate.done.actor.api_refresh',
        'xstate.error.actor.api_refresh',
      ])

      if (event.type === 'xstate.done.actor.api_refresh') {
        const {access_token, refresh_token} = event.output
        context.xstore.update_auth(event.output)
      }
    },
  },
  actors: {
    req: fromPromise(
      async ({input}: {input: x.fetch.Ctx}) => {
        try {
          const success = await input.api_call()
          if (input.emit_on_success) {
            const ev = input.emit_on_success(success)
            input.consumer_ref.send(ev)
          }
        } catch (err) {
          if (input.emit_on_fail) {
            input.consumer_ref.send(input.emit_on_fail(err))
          }
          throw err
        }
      },
    ),
    api_refresh: fn_to_promise_logic(
      (may_be_refresh: string | null | undefined) => {
        if (may_be_refresh) {
          return api_refresh(may_be_refresh)
        } else {
          throw new Error('No refresh token')
        }
      },
    ),
  },
  guards: {
    is_access_token_required({context}) {
      return context.is_access_token_required
    },
    is_user({context}) {
      return context.auth_actor
        .getSnapshot()
        .matches('User')
    },
    is_refresh_processing({context}) {
      return context.is_refresh_processing
    },
    is_error_access_expired({event}) {
      assertEvent(event, 'xstate.error.actor.req')

      return [401, 403].includes(event.error.status)
    },
  },
}).createMachine({
  /** @xstate-layout N4IgpgJg5mDOIC5QDMwBcDGALAxKzWAdAE5jKmxHICGAlgDYDaADALqKgAOA9rLWrW4A7DiAAeiAMzMAnDMIyALAEZFkgEzrlANgCszSboA0IAJ6IAHNuaFtMyYcnaLWlZIC+7k-myEAkkL8OCzsSCA8fALCohIIurrqtszK6trKAOyyumrpJuYIasqEzBaZVpLKuim62p7e6L4BQYzKoVy8-IIiYbG6Mum2uulVFdqSFszp2nmIlTaywwaSiuoy6pnpdSA+RADCWGAYANYA+gCusGDEwWyiEZ3RPYjW2oQWc5Lp6rrvkjIzCAsigGwMUfXS6WUzFWyy2O0I+0OpwuV2CrTuHSi3VAvX6g2GTmYVTkKQB-UkhF0f2syWShgsFjhDSIAAUwEIILQhFATpwzgAjei0DAnUgARxwEGEYEIXIAbtwjjLxSEMZEujFEOpShTlJUdES5BZ9OoATpdG9tN8UjJmGoEjImQRCGyOVyeXzBcLRWAJVdiNxiIROPRqGhkIGALYkX2qsL3LGahDSaFvDKZWna94AgC0NiU+j12ghCTtFgcTt8iOOPvIcCwJ1gaDDFxubXCmI1TwQcgp6mkUJ+EOUxv+ZkswMIoPBkOh9kUlb2BxrpDrlEbzbQrZa7YTXZxs2hAxqVTttrKimm44QxZsepkfRHQ3SFhkykXhAA6nQBNyThHiFrChcHhVdgMIWAzgwDA4FgON2nVR4DwQdRLwsN5RwzAxUIMAErBsOwHCpZxXBSD9v06P8AKA+s8GZGM1yoOgmFueNOyQ8QtUUUoFAhLQCVUV9cmvex5GkcscjfGoyK8bZ6NdTluUlaVZSEBUlRjMV4I7RDsU4hBlHGdDIW+Y1y3LDJFABb5XiBRYfmhYtjQ-BT3Rwf1A2DUNwyjTTtL3DjYlUZgbHeYZtCtUoXGE-IpkSMYTKBNQNBUFz2UUnlSE4MAw0gH0JSlIQZXlRVlVjViEIePTYlSGRXgfVJFHsZQH1kAEqkUWxFDBew+n7Bl1DSt0-yynK0Dy8V3OIAMgxDMMAOjFUKp0qqk1q+qEm0JqKlasd8hqfMhlkNRmD0Qxalk+EWQDGDYD4P8POufz2Oq2Y7CKU6phKbUwWSKzrxGWwKlMyymq+Fybtg90TketFdxepMMgmBQNEi18nBHAEpgpRRoRSF8KnCi76mdAAlMhgOUorVPUmVqE4WgaMoZ7dMR-pOoMWkIs0fQ9ABLaBihdRZBtNJcYXS76PJxippmrz5t8+nGbA+sWdW7sWoZQhllpFQfkMBJrK1kWtDqks6sZLYhG4CA4FEHY1XV5CMe1rR1kvaFJh+YxrxzLX8M9ypXzkfsPyaNBHcTbtcbEt30g94XhmNAEVnQnDyyGY1H0dSXnWrZFLmISP930l5CH1RrizSKxTWvbny6TjQXH7Hmhoy3kBSFEVxWLwKuPeBQfmBLQRzsb48PQrbPn0WcxiqQbc6rZdThV9cmxbeA2NZ7spnQjRvlBfttosPDutsbVlkhCZhhkS2Sd8AAxZje9elCs6nSY9Dn+Jlh9-IXAtMaPQLgPZ2gih+AAylBW6m9KpR2QtqeIH8pg1ANlSME1lsjFG1MMFYkwvgJXIj+aG1FV5YBfmtFInVRhOG+EoKwJ9rz4XLiUQwtUqG3zbu6ChGthYUlKMMAhKh+h-2eGoSkEwgSaCJKoSEXCRpgGyrlCA+UeEILBOhKkhka4TGsP0dqWhtbpAcCoTmVhLwQ24DA6Gj01H6X1ILYsfVShqDUPzAe+tlh-CLJoD80tgJ2KCvYeKA58ZvgAaIgo8dbBQhCukOqmgpK6A-AAcXoNwfk1B6DnCENQM4aAsCBloAALzyjQBggSuKGGKFCQyShkiGSmACcYFp4j6DtAkeODJPCeCAA */
  context: ({input}) => {
    const {update_tokens, get_refresh_token} =
      input.auth_actor.getSnapshot().context
    return {
      ...input,
      xstore: use_xstore(),
    }
  },
  id: 'fetch',
  initial: 'Init',
  on: {
    'fetch.refresh.fail': {
      target: '#fetch.Fail',
    },
  },
  states: {
    Init: {
      always: [
        {
          target: 'Check_user',
          guard: {
            type: 'is_access_token_required',
          },
        },
        {
          target: 'Pending_public_req',
        },
      ],
    },
    Check_user: {
      always: [
        {
          target: 'Check_refresh_status',
          guard: {
            type: 'is_user',
          },
        },
        {
          target: 'Fail',
        },
      ],
    },
    Pending_public_req: {
      invoke: {
        id: 'req',
        input: ({context}) => context,
        onDone: {
          target: 'Success',
        },
        onError: {
          target: 'Fail',
        },
        src: 'req',
      },
    },
    Check_refresh_status: {
      always: [
        {
          target: 'Waiting_for_refresh',
          guard: {
            type: 'is_refresh_processing',
          },
        },
        {
          target: 'Pending',
        },
      ],
    },
    Fail: {
      type: 'final',
      entry: ['emit_im_done'],
    },
    Success: {
      type: 'final',
      entry: ['emit_im_done'],
    },
    Waiting_for_refresh: {
      on: {
        'fetch.refresh.success': {
          target: 'Pending_repeated_req',
        },
        'fetch.refresh.fail': {
          target: 'Fail',
        },
      },
    },
    Pending: {
      invoke: {
        id: 'req',
        input: ({context}) => context,

        onDone: {
          target: 'Success',
        },
        onError: {
          target: 'Processing_error',
        },
        src: 'req',
      },
    },
    Pending_repeated_req: {
      invoke: {
        id: 'req',
        input: ({context}) => context,

        onDone: {
          target: 'Success',
        },
        onError: {
          target: 'Fail',
        },
        src: 'req',
      },
    },
    Processing_error: {
      always: [
        {
          target: 'Refresh',
          guard: {
            type: 'is_error_access_expired',
          },
        },
        {
          target: 'Fail',
        },
      ],
    },
    Refresh: {
      entry: {
        type: 'emit_refresh_start',
      },
      invoke: {
        id: 'api_refresh',
        input: () => {
          return get_refresh_token()
        },
        onDone: {
          target: 'Pending_repeated_req',
          actions: [
            {
              type: 'update_tokens_after_success_refresh',
            },
            {
              type: 'emit_refresh_success',
            },
          ],
        },
        onError: {
          target: 'Global_unauthorized_fail',
          actions: [
            {
              type: 'update_tokens_after_success_refresh',
            },
            {
              type: 'emit_refresh_fail',
            },
          ],
        },
        src: 'api_refresh',
      },
    },
    Global_unauthorized_fail: {
      type: 'final',
      entry: ['emit_logout', 'emit_im_done'],
    },
  },
})
