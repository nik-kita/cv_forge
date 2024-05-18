import {ref} from 'vue'
import type {CallbackTypes} from 'vue3-google-login'

const prev_refresh_token =
  localStorage.getItem('refresh_token')
const is_logged_in = ref(!!prev_refresh_token)
const user = ref<{nik?: string | null}>()

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
    click_logout() {
      localStorage.removeItem('refresh_token')
      localStorage.removeItem('access_token')
      is_logged_in.value = false
    },
    async click_sign_in(
      res: Parameters<CallbackTypes.CredentialCallback>[0],
    ) {
      const api_res = await fetch(
        import.meta.env.VITE_API_URL + '/auth/sign-in',
        {
          method: 'post',
          body: JSON.stringify({
            auth_provider: 'google',
            credential: res.credential,
          } satisfies ApiReq<'post', '/auth/sign-in'>),
          headers: {
            'Content-Type': 'application/json',
          },
        },
      )

      if (!api_res.ok) {
        console.error(api_res)

        return
      }

      const api_res_json = (await api_res.json()) as ApiRes<
        'post',
        '/auth/sign-in'
      >

      localStorage.setItem(
        'refresh_token',
        api_res_json.refresh_token,
      )
      localStorage.setItem(
        'access_token',
        api_res_json.access_token,
      )
      is_logged_in.value = true
      user.value = {nik: api_res_json.nik}
    },
  }
}
