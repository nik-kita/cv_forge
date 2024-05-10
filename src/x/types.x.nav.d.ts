import type {Router} from 'vue-router'

declare global {
  namespace x.nav {
    export type Ctx = {
      router: Router
    }
    export type Ev =
      | {
          type: 'nav.request_to_navigate'
        }
      | {
          type: 'nav.to.PageHome'
        }
  }
}

export {}
