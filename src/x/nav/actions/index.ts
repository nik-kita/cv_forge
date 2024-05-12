import {assertEvent, type ActionArgs} from 'xstate'

export const raise_nav_ev = ({event}: x.nav.Args) => {
  assertEvent(event, 'nav.request_to_navigate')
  let path = event.to.path
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
}: x.nav.Args) => {
  assertEvent(event, ['nav.to.PageHome', 'nav.to.Profiles'])

  context.nav_toggle_guard.allow = true
  await context.router.push(event.path)
  context.nav_toggle_guard.allow = false
}

export const integrate_router = ({
  context,
  self,
}: x.nav.Args) => {
  context.router.beforeEach((to, from) => {
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
