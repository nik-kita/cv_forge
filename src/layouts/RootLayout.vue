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
  <div class="flex flex-row-reverse justify-between">
    <slot name="header">
      <div class="inline-flex justify-end h-10">
        <GoogleLogin
          v-if="!is_user"
          :callback
        />
        <Button
          v-if="is_user"
          @click="click_logout"
          >Logout</Button
        >
      </div>
    </slot>
    <slot name="nav">
      <ul class="inline-flex gap-2">
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
        <li>
          <RouterLink to="/settings">Settings</RouterLink>
        </li>
      </ul>
    </slot>
  </div>
  <div class="min-h-[30%] p-2">
    <slot></slot>
  </div>
  <hr />
  <div class="dev">
    <pre>is_user: {{ is_user }}</pre>
    <pre>nav: {{ nav_value }}</pre>
    <pre>auth: {{ auth_value }}</pre>
    <pre>nik: {{ nik }}</pre>
    <pre>viewer_role: {{ viewer_role }}</pre>
  </div>
  <hr />
</template>

<style scoped>
.dev {
  display: flex;
  height: 100%;
  flex-flow: column;
  gap: 1rem;
  padding: 1rem;
  background-color: whitesmoke;
}
</style>
