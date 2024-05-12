<script setup lang="ts">
import {use_x} from '@/use_x'
import {use_xstore} from '@/x/xstore'
import {ref, watchEffect} from 'vue'

const {nav, auth} = use_x()
const {is_user} = use_xstore()

const nav_value = ref(nav.getSnapshot().value)
const auth_value = ref(auth.getSnapshot().value)

nav.subscribe(ns => {
  nav_value.value = ns.value
  console.log('nav.subscribe', ns)
})
auth.subscribe(as => {
  auth_value.value = as.value
  console.log('auth.subscribe', as)
})

watchEffect(() => {
  console.log('is_user', is_user.value)
})
</script>

<template>
  <div class="root">
    <h1>Home</h1>
  </div>
</template>
