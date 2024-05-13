<script setup>
import {RouterLink} from 'vue-router'

import {use_x} from '@/use_x'
import {use_xstore} from '@/x/xstore'
import {ref} from 'vue'

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
</script>

<template>
  <slot></slot>
  <ul>
    <li>
      <RouterLink to="/home">Home</RouterLink>
    </li>
    <li>
      <RouterLink to="/profiles">Profiles</RouterLink>
    </li>
  </ul>
  <hr />
  <div class="root">
    <pre>is_user: {{ is_user }}</pre>
    <pre>nav: {{ nav_value }}</pre>
    <pre>auth: {{ auth_value }}</pre>
    <pre>nik: {{ nik }}</pre>
    <pre>viewer_role: {{ viewer_role }}</pre>
    <Button @click="auth.send({type: 'auth.logout'})"
      >auth.send({type: 'auth.logout'})</Button
    >
    <Button
      @click="auth.send({type: 'auth.sign_in.success'})"
      >auth.send({type: 'auth.sign_in.success'})</Button
    >
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
