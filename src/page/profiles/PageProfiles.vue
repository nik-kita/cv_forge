<script setup lang="ts">
import {use_x} from '@/use_x'
import {use_xstore} from '@/common_xstate/xstore'
import {onUnmounted, ref} from 'vue'
import type {ActorRefFrom} from 'xstate'
import DisplayOwnProfiles from './lib/DisplayOwnProfiles.vue'
import ProposeExplore from './lib/ProposeExplore.vue'
const {nav} = use_x()
const {is_user} = use_xstore()
const page_profiles_actor = nav.getSnapshot().children
  .page_profiles! as ActorRefFrom<x.page_profiles.logic>
const state = ref(page_profiles_actor.getSnapshot().value)

onUnmounted(
  page_profiles_actor.subscribe(s => {
    const sv = s.value
    state.value = sv
  }).unsubscribe,
)
</script>

<template>
  <h1>Profiles</h1>
  <DisplayOwnProfiles
    :page_profiles_actor
    v-if="state === 'Dispaly_own_profiles'"
  />
  <ProposeExplore
    v-if="
      typeof state === 'object' &&
      state.Display_public_profiles === 'Propose_to_explore'
    "
  />
</template>
