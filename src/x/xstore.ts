import {ref} from 'vue'

const is_user = ref(false)

export const use_xstore = () => {
  return {
    is_user,
  }
}
