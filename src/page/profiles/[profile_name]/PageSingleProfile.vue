<script setup lang="ts">
import {use_x} from '@/use_x'
import {onUnmounted, ref, watch} from 'vue'
import type {StateValueFrom} from 'xstate'

const {page_profiles} = use_x()
let unsubscribe: (() => void) | undefined = undefined
const profiles_state =
  ref<StateValueFrom<x.page_profiles.logic>>()
const single_profile_state =
  ref<StateValueFrom<x.page_single_profile.logic>>()
watch(
  page_profiles,
  actor => {
    if (unsubscribe || !actor) return

    let unsubscribe_single: (() => void) | undefined =
      undefined
    const unsubscribe_profiles = actor.subscribe(s => {
      profiles_state.value = s.value
      const single_actor = s.children.single_profile!
      single_profile_state.value =
        single_actor.getSnapshot().value
      unsubscribe_single = single_actor.subscribe(ss => {
        single_profile_state.value = ss.value
      }).unsubscribe
    }).unsubscribe

    unsubscribe = () => {
      unsubscribe_profiles
      if (unsubscribe_single) unsubscribe_single()
    }
  },
  {immediate: true},
)

onUnmounted(unsubscribe ? unsubscribe : () => {})
</script>

<template>
  <h1>Single profile</h1>
  <pre>profiles: {{ profiles_state }}</pre>
  <pre>
single_profile_state: {{ single_profile_state }}</pre
  >
</template>
