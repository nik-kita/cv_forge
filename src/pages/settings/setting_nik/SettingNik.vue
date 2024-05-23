<script setup lang="ts">
import {ref} from 'vue'
import type {ActorRefFrom} from 'xstate'
import NoNik from './no_nik/NoNik.vue'
import WithNik from './with_nik/WithNik.vue'

const {actor} = defineProps<{
  actor: ActorRefFrom<x.page_settings.setting_nik.logic>
}>()
const state = ref(actor.getSnapshot().value)
actor.subscribe(s => {
  state.value = s.value
})
</script>

<template>
  <WithNik
    v-if="state === 'With_nik'"
    :parent_actor="actor"
  />
  <NoNik
    v-if="state === 'No_nik'"
    :parent_actor="actor"
  />
</template>
