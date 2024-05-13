import {watch, watchEffect} from 'vue'
import {assertEvent} from 'xstate'

export const raise_nav_ev = ({
  event,
  context,
}: x.nav.Args) => {
  assertEvent(event, 'nav.request_to_navigate')
  let path = event.to.path
  const {meta} = event.to
  const {x_nav_ev_name, maybe_nik_slug} = meta
  const {is_user, nik, user} = context.xstore
  const {params} = event.to
  const nik_slug = params.nik

  if (!nik.value) {
    if (!maybe_nik_slug) {
      context.xstore.viewer_role.value = 'viewer'
    } else {
      context.xstore.viewer_role.value =
        nik_slug ? 'viewer' : 'viewer::can_add_someone_nik'
    }
  } else {
    if (maybe_nik_slug) {
      if (!nik_slug) {
        context.xstore.viewer_role.value =
          'viewer::should_add_own_nik'
      } else if (nik_slug === nik.value) {
        context.xstore.viewer_role.value = 'owner'
      } else {
        context.xstore.viewer_role.value = 'viewer'
      }
    }
  }

  if (
    context.xstore.viewer_role.value ===
    'viewer::should_add_own_nik'
  ) {
    path += `/${nik.value}`
    context.xstore.viewer_role.value = 'owner'
  }

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

  watch([context.xstore.nik], () => {
    console.log('watch(nik)')

    self.send({
      type: 'nav.request_to_navigate',
      to: context.router.currentRoute.value,
      from: context.router.currentRoute.value,
    } satisfies x.nav.Ev)
  })
}
