import {
  get_refresh_token,
  update_tokens,
} from '@/local_storage/persistent.tokens'
import {
  get_user_info,
  update_user_info,
} from '@/local_storage/persistent.xstore'
import {root} from 'postcss'
import {computed, ref} from 'vue'

const prev_session = get_refresh_token()
const user = ref<{nik?: string | null}>()
const nik = computed({
  get() {
    return user.value?.nik
  },
  set(nik?: string | undefined | null) {
    if (user.value) {
      user.value = {
        ...user.value,
        nik,
      }
    }
  },
})

if (prev_session) {
  user.value =
    get_user_info() ??
    (get_refresh_token() ? {} : undefined)
}

const is_user = computed(() => {
  if (user.value && get_refresh_token()) {
    return true
  }

  return false
})
const viewer_role = ref<
  | 'viewer'
  | 'owner'
  | 'viewer::should_add_own_nik'
  | 'viewer::can_add_someone_nik'
>('viewer')

export const use_xstore = () => {
  return {
    is_user,
    user,
    nik,
    viewer_role,
    clean_auth() {
      update_tokens()
      user.value = undefined
    },
    update_auth(payload: ApiRes<'post', '/auth/sign-in'>) {
      update_tokens(payload)
      const user_info = {nik: payload.nik}
      update_user_info(user_info)
      user.value = user_info
    },
  }
}
