import {get_refresh_token} from '@/local_storage/persistent.tokens'
import {get_user_info} from '@/local_storage/persistent.xstore'
import {computed, ref} from 'vue'

const prev_session = get_refresh_token()
const user = ref<{nik?: string}>()
const nik = computed({
  get() {
    return user.value?.nik
  },
  set(nik?: string | undefined) {
    if (user.value) {
      user.value = {
        ...user.value,
        nik,
      }
    }
  },
})

if (prev_session) {
  try {
    user.value = get_user_info()
  } catch (err) {
    console.error(err)
  }
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
  }
}
