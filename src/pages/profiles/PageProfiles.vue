<script setup lang="ts">
import { use_x } from '@/use_x'
import { use_xstore } from '@/x/xstore'
import { onUnmounted, ref } from 'vue'
import type { ActorRefFrom } from 'xstate'
import ProposeExplore from './ProposeExplore.vue'
const {nav} = use_x()
const {is_user} = use_xstore()
const page_actor = nav.getSnapshot().children
  .page_profiles! as ActorRefFrom<x.page_profiles.logic>
const state = ref(page_actor.getSnapshot().value)

onUnmounted(
  page_actor.subscribe(s => {
    const sv = s.value
    state.value = sv
  }).unsubscribe,
)
</script>

<template>
  <h1>Profiles</h1>
  <ProposeExplore
    v-if="
      typeof state === 'object' &&
      state.Display_public_profiles === 'Propose_to_explore'
    "
  />
</template>
