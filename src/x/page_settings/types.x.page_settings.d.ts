import type {page_settings_machine} from './page_settings_machine'
import type {setting_nik_machine} from './children/setting_nik/setting_nik_machine'

declare global {
  namespace x.page_settings {
    export type logic = typeof page_settings_machine
    export type Children = {
      setting_nik: 'setting_nik'
    }
    export namespace setting_nik {
      export type logic = typeof setting_nik_machine
      export type Ctx = x.Xstore
      export type Children = {
        with_nik?: 'with_nik'
        no_nik?: 'no_nik'
      }
      export type Ev =
        | {type: 'page_settings.reset_machine'}
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
        | {type: 'page_settings.update_nik.fail'}
        | {
            type: 'page_settings.update_nik_err_showing.cancel'
          }
        | {
            type: 'page_settings.update_nik.again'
            payload: string
          }
        | {type: 'page_settings.add_nik'; payload: string}
        | {
            type: 'page_settings.adding_nik.again'
            payload: string
          }
        | {
            type: 'page_settings.add_nik.success'
            payload: string
          }
        | {type: 'page_settings.add_nik.fail'}
        | {
            type: 'page_settings.adding_nik_error_showing.cancel'
          }
    }
  }
}

export {}
