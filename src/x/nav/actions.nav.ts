import {assertEvent, type ActionArgs} from 'xstate'

export const raise_nav_ev = ({
  event,
}: {
  event: Extract<
    x.nav.Ev,
    {type: 'nav.request_to_navigate'}
  >
}) => {
  console.log('navigate_ev', event)
  let path = event.to.path
  console.log(path)
  const {
    meta: {x_nav_ev_name},
  } = event.to

  if (x_nav_ev_name === 'nav.to.PageHome') {
    return {
      type: 'nav.to.PageHome',
      path,
    } as const
  } else if (x_nav_ev_name === 'nav.to.Profiles') {
    return {
      type: 'nav.to.Profiles',
      path,
    } as const
  } else {
    path = '/home'
    return {
      type: 'nav.to.PageHome',
      path,
    } as const
  }
}

export const navigate = async ({
  context,
  event,
}: ActionArgs<x.nav.Ctx, x.nav.Ev, x.nav.Ev>) => {
  console.log('navigate', event)
  assertEvent(event, ['nav.to.PageHome', 'nav.to.Profiles'])

  context.nav_toggle_guard.allow = true
  await context.router.push(event.path)
  context.nav_toggle_guard.allow = false
}

export const integrate_router = ({
  context,
  self,
}: ActionArgs<x.nav.Ctx, x.nav.Ev, x.nav.Ev>) => {
  console.log('integrate_router')
  context.router.beforeEach((to, from) => {
    console.log(
      'nav_toggle_guard',
      context.nav_toggle_guard,
    )
    if (context.nav_toggle_guard.allow) {
      return true
    }

    self.send({
      type: 'nav.request_to_navigate',
      to,
      from,
    } satisfies x.nav.Ev)

    return false
  })
}
