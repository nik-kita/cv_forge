<script setup lang="ts">
import {RouterView} from 'vue-router'
import NavBar from './components/NavBar.vue'
import {use_auth_store} from '@/store/auth.store'
import {GoogleLogin} from 'vue3-google-login'

const {click_logout, click_sign_in, is_logged_in} =
  use_auth_store()
</script>
<template>
  <div class="flex flex-row place-content-between">
    <Button
      severity="secondary"
      v-if="is_logged_in"
      @click="click_logout"
      >Logout</Button
    >
    <GoogleLogin
      v-else
      :callback="click_sign_in"
    />
    <div>
      <NavBar />
    </div>
  </div>
  <RouterView />
</template>

<style>
.link-active {
  color: grey;
}
.link-exact-active {
  color: grey;
}
</style>
