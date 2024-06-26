import {assertEvent} from 'xstate'

export const raise_nav_ev = ({
  event,
  context,
}: x.nav.Args) => {
  assertEvent(event, 'nav.request_to_navigate')
  let path = event.to.path
  const {meta} = event.to
  const {x_nav_ev_name: type, maybe_nik_slug} = meta
  const {is_user, nik, user} = context.xstore
  const {params} = event.to
  const nik_slug = params.nik

  if (!nik.value) {
    if (!maybe_nik_slug) {
      context.xstore.viewer_role.value = 'owner'
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
    } else {
      context.xstore.viewer_role.value = 'owner'
    }
  }

  if (
    context.xstore.viewer_role.value ===
    'viewer::should_add_own_nik'
  ) {
    path += `/${nik.value}`
    context.xstore.viewer_role.value = 'owner'
  }

  if (maybe_nik_slug || is_user.value) {
    return {
      type,
      path,
    } as x.nav.Ev
  } else {
    context.xstore.viewer_role.value =
      'viewer::can_add_someone_nik'
    path = '/home'
    return {
      type: 'nav.to.PageHome',
      path,
    } as x.nav.Ev
  }
}
