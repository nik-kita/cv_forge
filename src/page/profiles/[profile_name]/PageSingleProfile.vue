<script setup lang="ts">
import {use_x} from '@/use_x'
import {onUnmounted, ref, watch} from 'vue'
import type {Subscription} from 'xstate'

const {page_profiles} = use_x()
let unsubscribe: Subscription | undefined = undefined
const state = ref()
watch(page_profiles, actor => {
  if (unsubscribe || !actor) return

  unsubscribe = actor.subscribe(s => {
    state.value = s.value
  })
})

onUnmounted(unsubscribe ? unsubscribe : () => {})
</script>

<template>
  <h1>Single profile</h1>
  <pre>{{ state }}</pre>
</template>
