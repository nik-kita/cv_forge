import {router} from '@/router/router'
import {computed, ref} from 'vue'

const prev_session = localStorage.getItem('refresh_token')
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
    user.value = JSON.parse(
      localStorage.getItem('user') || '{}',
    )
  } catch (err) {
    console.error(err)
  }
}

const is_user = computed(() => {
  if (user.value && localStorage.getItem('refresh_token')) {
    return true
  }

  return false
})

export const use_xstore = () => {
  return {
    is_user,
    user,
    nik,
  }
}
