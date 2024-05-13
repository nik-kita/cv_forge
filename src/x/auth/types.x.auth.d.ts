declare global {
  namespace x.auth {
    type Ev =
      | {
          type: 'auth.processing_sign-in.success'
          payload: ApiRes<'post', '/auth/sign-in'>
        }
      | {
          type: 'auth.processing_sign-in.fail'
        }
      | {
          type: 'auth.guest.sign-in'
          payload: ApiReq<'post', '/auth/sign-in'>
        }
      | {
          type: 'auth.user.logout'
        }
      | {
          type: 'auth.user.unauthorized'
        }
    type Ctx = {} & x.Xstore
  }
}

export {}
