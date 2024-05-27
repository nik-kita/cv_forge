import {assertEvent} from 'xstate'

export const navigate = async ({
  context,
  event,
}: x.nav.Args) => {
  assertEvent(event, [
    'nav.to.PageHome',
    'nav.to.PageProfiles',
    'nav.to.PageSettings',
  ])

  context.nav_toggle_guard.allow = true
  await context.router.push(event.path)
  context.nav_toggle_guard.allow = false
}
