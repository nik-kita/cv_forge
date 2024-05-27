<script setup lang="ts">
import {use_x} from '@/use_x'
import {onUnmounted, ref} from 'vue'
import type {ActorRefFrom} from 'xstate'

const {
  lazy_pages: {page_profiles},
} = use_x()

if (!page_profiles) {
  throw new Error('page_profiles is not lazy loaded')
}

const single_profile_actor =
  page_profiles.getSnapshot().children.single_profile!
const state = ref(single_profile_actor.getSnapshot().value)

onUnmounted(
  single_profile_actor.subscribe(s => {
    state.value = s.value
  }).unsubscribe,
)
</script>

<template>
  <h1>Single profile</h1>
  <pre>{{ state }}</pre>
</template>
