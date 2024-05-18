<script setup lang="ts">
import {use_auth_store} from '@/store/auth.store'

const {is_logged_in} = use_auth_store()
const auth_label = is_logged_in.value ? 'Logout' : 'Login'
</script>

<template>
  <ul>
    <li>
      <RouterLink to="/home">Home</RouterLink>
    </li>
  </ul>
</template>
