declare global {
  namespace x.page_settings {
    export type Ev =
      | {type: 'page_settings.rm_nik'}
      | {type: 'page_settings.rm_nik.success'}
      | {type: 'page_settings.rm_nik.fail'}
      | {
          type: 'page_settings.update_nik'
          payload: string
        }
      | {
          type: 'page_settings.update_nik.success'
          payload: string
        }
      | {type: 'page_settings.udpate_nik.fail'}
      | {
          type: 'page_settings.update_nik_err_showing.cancel'
        }
      | {type: 'page_settings.update_nik.again'}
      | {type: 'page_settings.add_nik'}
      | {
          type: 'page_settings.add_nik.success'
          payload: string
        }
      | {type: 'page_settings.add_nik.fail'}
      | {
          type: 'page_settings.adding_nik_error_showing.cancel'
        }
      | {type: 'page_settings.adding_nik.again'}
  }
}

export {}
