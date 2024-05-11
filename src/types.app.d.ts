declare global {
  export type NavEv_name = Extract<
    x.nav.Ev,
    {type: `nav.to.${string}`}
  >['type']
}

export {}
