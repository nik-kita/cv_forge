/**
 * This file was auto-generated by openapi-typescript.
 * Do not make direct changes to the file.
 */

export interface paths {
  '/auth/sign-in': {
    /** Sign In */
    post: operations['sign_in_auth_sign_in_post']
  }
  '/auth/refresh': {
    /** Refresh */
    post: operations['refresh_auth_refresh_post']
  }
  '/auth/logout': {
    /** Logout */
    post: operations['logout_auth_logout_post']
  }
  '/profiles/{name}': {
    /** Get Profile By Name */
    get: operations['get_profile_by_name_profiles__name__get']
  }
  '/profiles/': {
    /** Get All Profiles */
    get: operations['get_all_profiles_profiles__get']
    /** Upsert Profile */
    post: operations['upsert_profile_profiles__post']
  }
  '/profiles/{profile_id}': {
    /** Delete Profile */
    delete: operations['delete_profile_profiles__profile_id__delete']
    /** Modify Profile */
    patch: operations['modify_profile_profiles__profile_id__patch']
  }
  '/user/my/{target}': {
    /** My */
    get: operations['my_user_my__target__get']
  }
  '/user/nik/{nik}': {
    /** Modify Nik */
    put: operations['modify_nik_user_nik__nik__put']
  }
  '/user/{nik}': {
    /** Get Public By Nik */
    get: operations['get_public_by_nik_user__nik__get']
  }
  '/me': {
    /** Get Me */
    get: operations['get_me_me_get']
  }
}

export type webhooks = Record<string, never>

export interface components {
  schemas: {
    /**
     * AuthProviderEnum
     * @constant
     */
    AuthProviderEnum: 'google'
    /** AvatarReq */
    AvatarReq: {
      /** Link */
      link: string
      /** Name */
      name?: string | null
      /** Details */
      details?: string | null
    }
    /** AvatarRes */
    AvatarRes: {
      /** Link */
      link: string
      /** Name */
      name?: string | null
      /** Details */
      details?: string | null
      /** Id */
      id: number
      /** User Id */
      user_id: number
    }
    /** ContactReq */
    ContactReq: {
      /** Key */
      key: string
      /** Value */
      value: string
      /** Details */
      details?: string | null
    }
    /** ContactRes */
    ContactRes: {
      /** Key */
      key: string
      /** Value */
      value: string
      /** Details */
      details?: string | null
      /** Id */
      id: number
      /** User Id */
      user_id: number
      /** Profile Id */
      profile_id?: number | null
    }
    /** EducationReq */
    EducationReq: {
      /** University */
      university: string
      /** From Date */
      from_date?: string | null
      /** To Date */
      to_date?: string | null
      /** Diploma */
      diploma?: string | null
      /** Certificate */
      certificate?: string | null
      /** Details */
      details?: string | null
      /** Education */
      education?: string | null
      /** Degree */
      degree?: string | null
    }
    /** EducationRes */
    EducationRes: {
      /** University */
      university: string
      /** From Date */
      from_date?: string | null
      /** To Date */
      to_date?: string | null
      /** Diploma */
      diploma?: string | null
      /** Certificate */
      certificate?: string | null
      /** Details */
      details?: string | null
      /** Education */
      education?: string | null
      /** Degree */
      degree?: string | null
      /** Id */
      id: number
      /** User Id */
      user_id: number
      /** Profile Id */
      profile_id?: number | null
    }
    /** ExperienceReq */
    ExperienceReq: {
      /** Company */
      company: string
      /** From Date */
      from_date?: string | null
      /** To Date */
      to_date?: string | null
      /** Duration */
      duration?: string | null
      /** Details */
      details?: string | null
      /** Position */
      position?: string | null
      /** Certificate */
      certificate?: string | null
      /** Reference Letter */
      reference_letter?: string | null
    }
    /** ExperienceRes */
    ExperienceRes: {
      /** Company */
      company: string
      /** From Date */
      from_date?: string | null
      /** To Date */
      to_date?: string | null
      /** Duration */
      duration?: string | null
      /** Details */
      details?: string | null
      /** Position */
      position?: string | null
      /** Certificate */
      certificate?: string | null
      /** Reference Letter */
      reference_letter?: string | null
      /** Id */
      id: number
      /** User Id */
      user_id: number
      /** Profile Id */
      profile_id?: number | null
    }
    /** HTTPValidationError */
    HTTPValidationError: {
      /** Detail */
      detail?: components['schemas']['ValidationError'][]
    }
    /** LanguageReq */
    LanguageReq: {
      /** Language */
      language: string
      /** Level */
      level?: string | null
      /** Certificate */
      certificate?: string | null
      /** Details */
      details?: string | null
    }
    /** LanguageRes */
    LanguageRes: {
      /** Language */
      language: string
      /** Level */
      level?: string | null
      /** Certificate */
      certificate?: string | null
      /** Details */
      details?: string | null
      /** Id */
      id: number
      /** User Id */
      user_id: number
      /** Profile Id */
      profile_id?: number | null
    }
    /** ModifyProfileReq */
    ModifyProfileReq: {
      /** Name */
      name?: string | null
      /** Summary */
      summary?: string | null
      /** Details */
      details?: string | null
      /** Contacts */
      contacts?:
        | components['schemas']['ContactReq'][]
        | null
      /** Skills */
      skills?: components['schemas']['SkillReq'][] | null
      /** Education */
      education?:
        | components['schemas']['EducationReq'][]
        | null
      /** Experience */
      experience?:
        | components['schemas']['ExperienceReq'][]
        | null
      /** Languages */
      languages?:
        | components['schemas']['LanguageReq'][]
        | null
      avatar?: components['schemas']['AvatarReq'] | null
    }
    /** PaginatedRes[ProfileRes] */
    PaginatedRes_ProfileRes_: {
      /** Items */
      items: components['schemas']['ProfileRes'][]
      /** Total */
      total: number
      /** Offset */
      offset: number
    }
    /** ProfileReq */
    ProfileReq: {
      /** Name */
      name: string
      /** Summary */
      summary?: string | null
      /** Details */
      details?: string | null
      /** Contacts */
      contacts?:
        | components['schemas']['ContactReq'][]
        | null
      /** Skills */
      skills?: components['schemas']['SkillReq'][] | null
      /** Education */
      education?:
        | components['schemas']['EducationReq'][]
        | null
      /** Experience */
      experience?:
        | components['schemas']['ExperienceReq'][]
        | null
      /** Languages */
      languages?:
        | components['schemas']['LanguageReq'][]
        | null
      avatar?: components['schemas']['AvatarReq'] | null
    }
    /** ProfileRes */
    ProfileRes: {
      /** Id */
      id: number
      /** User Id */
      user_id: number
      /** Name */
      name: string
      /** Summary */
      summary?: string | null
      /** Details */
      details?: string | null
      /**
       * Contacts
       * @default []
       */
      contacts?: components['schemas']['ContactRes'][]
      /**
       * Skills
       * @default []
       */
      skills?: components['schemas']['SkillRes'][]
      /**
       * Education
       * @default []
       */
      education?: components['schemas']['EducationRes'][]
      /**
       * Experience
       * @default []
       */
      experience?: components['schemas']['ExperienceRes'][]
      avatar?: components['schemas']['AvatarRes'] | null
      /**
       * Languages
       * @default []
       */
      languages?: components['schemas']['LanguageRes'][]
    }
    /** PublicUserRes */
    PublicUserRes: {
      /** Nik */
      nik: string
    }
    /** Refresh */
    Refresh: {
      /** Refresh Token */
      refresh_token: string
    }
    /** RefreshRes */
    RefreshRes: {
      /** Access Token */
      access_token: string
      /** Refresh Token */
      refresh_token: string
      /** Token Type */
      token_type: string
      /** Nik */
      nik?: string | null
    }
    /** SignIn */
    SignIn: {
      /** Credential */
      credential: string
      auth_provider: components['schemas']['AuthProviderEnum']
    }
    /** SignInRes */
    SignInRes: {
      /** Access Token */
      access_token: string
      /** Refresh Token */
      refresh_token: string
      /** Token Type */
      token_type: string
      /** Nik */
      nik?: string | null
    }
    /** SkillReq */
    SkillReq: {
      /** Name */
      name: string
      /** Details */
      details?: string | null
      /** Certificate */
      certificate?: string | null
    }
    /** SkillRes */
    SkillRes: {
      /** Name */
      name: string
      /** Details */
      details?: string | null
      /** Certificate */
      certificate?: string | null
      /** Profile Id */
      profile_id?: number | null
      /** User Id */
      user_id: number
      /** Id */
      id: number
    }
    /** UserRes */
    UserRes: {
      /**
       * Profiles
       * @default []
       */
      profiles?: components['schemas']['ProfileRes'][]
    }
    /** ValidationError */
    ValidationError: {
      /** Location */
      loc: (string | number)[]
      /** Message */
      msg: string
      /** Error Type */
      type: string
    }
  }
  responses: never
  parameters: never
  requestBodies: never
  headers: never
  pathItems: never
}

export type $defs = Record<string, never>

export type external = Record<string, never>

export interface operations {
  /** Sign In */
  sign_in_auth_sign_in_post: {
    requestBody: {
      content: {
        'application/json': components['schemas']['SignIn']
      }
    }
    responses: {
      /** @description Successful Response */
      200: {
        content: {
          'application/json': components['schemas']['SignInRes']
        }
      }
      /** @description Validation Error */
      422: {
        content: {
          'application/json': components['schemas']['HTTPValidationError']
        }
      }
    }
  }
  /** Refresh */
  refresh_auth_refresh_post: {
    requestBody: {
      content: {
        'application/json': components['schemas']['Refresh']
      }
    }
    responses: {
      /** @description Successful Response */
      200: {
        content: {
          'application/json': components['schemas']['RefreshRes']
        }
      }
      /** @description Validation Error */
      422: {
        content: {
          'application/json': components['schemas']['HTTPValidationError']
        }
      }
    }
  }
  /** Logout */
  logout_auth_logout_post: {
    responses: {
      /** @description Successful Response */
      200: {
        content: {
          'application/json': unknown
        }
      }
    }
  }
  /** Get Profile By Name */
  get_profile_by_name_profiles__name__get: {
    parameters: {
      path: {
        name: string
      }
    }
    responses: {
      /** @description Successful Response */
      200: {
        content: {
          'application/json':
            | components['schemas']['ProfileRes']
            | null
        }
      }
      /** @description Validation Error */
      422: {
        content: {
          'application/json': components['schemas']['HTTPValidationError']
        }
      }
    }
  }
  /** Get All Profiles */
  get_all_profiles_profiles__get: {
    responses: {
      /** @description Successful Response */
      200: {
        content: {
          'application/json': components['schemas']['PaginatedRes_ProfileRes_']
        }
      }
    }
  }
  /** Upsert Profile */
  upsert_profile_profiles__post: {
    requestBody: {
      content: {
        'application/json': components['schemas']['ProfileReq']
      }
    }
    responses: {
      /** @description Successful Response */
      200: {
        content: {
          'application/json': components['schemas']['ProfileRes']
        }
      }
      /** @description Validation Error */
      422: {
        content: {
          'application/json': components['schemas']['HTTPValidationError']
        }
      }
    }
  }
  /** Delete Profile */
  delete_profile_profiles__profile_id__delete: {
    parameters: {
      path: {
        profile_id: number
      }
    }
    responses: {
      /** @description Successful Response */
      204: {
        content: never
      }
      /** @description Validation Error */
      422: {
        content: {
          'application/json': components['schemas']['HTTPValidationError']
        }
      }
    }
  }
  /** Modify Profile */
  modify_profile_profiles__profile_id__patch: {
    parameters: {
      path: {
        profile_id: number
      }
    }
    requestBody: {
      content: {
        'application/json': components['schemas']['ModifyProfileReq']
      }
    }
    responses: {
      /** @description Successful Response */
      200: {
        content: {
          'application/json': components['schemas']['ProfileRes']
        }
      }
      /** @description Validation Error */
      422: {
        content: {
          'application/json': components['schemas']['HTTPValidationError']
        }
      }
    }
  }
  /** My */
  my_user_my__target__get: {
    parameters: {
      query: {
        canditate: string
      }
    }
    responses: {
      /** @description Successful Response */
      200: {
        content: {
          'application/json': unknown
        }
      }
      /** @description Validation Error */
      422: {
        content: {
          'application/json': components['schemas']['HTTPValidationError']
        }
      }
    }
  }
  /** Modify Nik */
  modify_nik_user_nik__nik__put: {
    parameters: {
      path: {
        nik: string
      }
    }
    responses: {
      /** @description Successful Response */
      200: {
        content: {
          'application/json': components['schemas']['PublicUserRes']
        }
      }
      /** @description Validation Error */
      422: {
        content: {
          'application/json': components['schemas']['HTTPValidationError']
        }
      }
    }
  }
  /** Get Public By Nik */
  get_public_by_nik_user__nik__get: {
    parameters: {
      path: {
        nik: string
      }
    }
    responses: {
      /** @description Successful Response */
      200: {
        content: {
          'application/json': components['schemas']['PublicUserRes']
        }
      }
      /** @description Validation Error */
      422: {
        content: {
          'application/json': components['schemas']['HTTPValidationError']
        }
      }
    }
  }
  /** Get Me */
  get_me_me_get: {
    responses: {
      /** @description Successful Response */
      200: {
        content: {
          'application/json': components['schemas']['UserRes']
        }
      }
    }
  }
}
