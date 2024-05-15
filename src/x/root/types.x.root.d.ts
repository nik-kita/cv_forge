declare global {
  namespace x.root {
    export type Children = {
      auth: 'auth'
      nav: 'nav'
      fetcher: 'fetcher'
      page_settings?: 'page_settings'
    }
    export type Ev = {
      type: 'root.spawn.page_settings'
    }
  }
}

export {}
