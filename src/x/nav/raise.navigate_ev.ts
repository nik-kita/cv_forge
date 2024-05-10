export const navigate_ev = ({
  event,
}: {
  event: Extract<
    x.nav.Ev,
    {type: 'nav.request_to_navigate'}
  >
}) => {
  let path = event.to.path
  const {
    meta: {x_event_nav_name},
  } = event.to

  if (x_event_nav_name === 'nav.to.PageHome') {
    return {
      type: 'nav.to.PageHome',
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
