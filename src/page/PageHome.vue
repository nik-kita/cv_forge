<script setup lang="ts">
import {use_x} from '@/use_x'
import {use_xstore} from '@/common_xstate/xstore'
import {ref} from 'vue'

const {nav, auth} = use_x()
const {is_user} = use_xstore()

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
  <div class="App">
    <h1>Home</h1>
  </div>
</template>
