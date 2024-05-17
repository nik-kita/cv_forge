import {ref} from 'vue'

const prev_refresh_token =
  localStorage.getItem('refresh_token')
const is_logged_in = ref(!!prev_refresh_token)
const user = ref<{nik?: string}>()

if (prev_refresh_token) {
  try {
    user.value = JSON.parse(
      localStorage.getItem('user') || '{}',
    )
  } catch (err) {
    console.error(err)
  }
}

export const use_auth_store = () => {
  return {
    is_logged_in,
    user,
  }
}
