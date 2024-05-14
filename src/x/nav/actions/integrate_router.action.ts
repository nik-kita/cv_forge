import {watch} from 'vue'

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

  watch(context.xstore.is_user, is_user => {
    if (
      !is_user &&
      !context.router.currentRoute.value.meta.maybe_nik_slug
    ) {
      self.send({
        type: 'nav.to.PageHome',
        path: '/home',
      } satisfies x.nav.Ev)
    }
  })

  watch(context.xstore.nik, () => {
    self.send({
      type: 'nav.request_to_navigate',
      to: context.router.currentRoute.value,
      from: context.router.currentRoute.value,
    } satisfies x.nav.Ev)
  })
}
