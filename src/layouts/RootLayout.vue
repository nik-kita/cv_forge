<script setup lang="ts">
import {use_x} from '@/use_x'
import {use_xstore} from '@/x/xstore'
import {ref} from 'vue'
import {RouterLink} from 'vue-router'
import type {CallbackTypes} from 'vue3-google-login'
import {GoogleLogin} from 'vue3-google-login'

const {nav, auth} = use_x()
const {is_user, nik, viewer_role} = use_xstore()

const nav_value = ref(nav.getSnapshot().value)
const auth_value = ref(auth.getSnapshot().value)

nav.subscribe(ns => {
  nav_value.value = ns.value
})
auth.subscribe(as => {
  auth_value.value = as.value
})

const callback: CallbackTypes.CredentialCallback =
  async res => {
    auth.send({
      type: 'auth.guest.sign-in',
      payload: {
        auth_provider: 'google',
        credential: res.credential,
      },
    })
  }
const click_logout = async () => {
  auth.send({
    type: 'auth.user.logout',
  })
}
</script>

<template>
  <slot name="header">
    <GoogleLogin :callback />
    <br />
    <Button @click="click_logout">Logout</Button>
  </slot>
  <slot></slot>
  <ul>
    <li>
      <RouterLink :to="`/hoe/${nik ? nik : ''}`"
        >Home</RouterLink
      >
    </li>
    <li>
      <RouterLink :to="`/profiles/${nik ? nik : ''}`"
        >Profiles</RouterLink
      >
    </li>
  </ul>
  <hr />
  <div class="root">
    <pre>is_user: {{ is_user }}</pre>
    <pre>nav: {{ nav_value }}</pre>
    <pre>auth: {{ auth_value }}</pre>
    <pre>nik: {{ nik }}</pre>
    <pre>viewer_role: {{ viewer_role }}</pre>
  </div>
  <hr />
  <div class="root">
    <Button @click="() => (nik = 'Luffy')"
      >Add Luffy nikname</Button
    >
    <Button @click="() => (nik = 'Zoro')"
      >Add Zoro nikname</Button
    >
  </div>
</template>

<style scoped>
.root {
  display: flex;
  flex-flow: column;
  gap: 1rem;
  padding: 5rem;
  background-color: whitesmoke;
}
</style>
