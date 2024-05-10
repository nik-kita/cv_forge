declare global {
  namespace x.auth {
    type Ev =
      | {
          type: 'auth.sign_in.success'
        }
      | {
          type: 'auth.logout'
        }
    type Ctx = {}
  }
}

export {}
