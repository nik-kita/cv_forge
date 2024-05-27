<script setup lang="ts">
import {onUnmounted, ref} from 'vue'
import DataViewLayoutOptions from 'primevue/dataviewlayoutoptions' // optional
import type {ActorRefFrom} from 'xstate'

const props = defineProps<{
  page_profiles_actor: ActorRefFrom<x.page_profiles.logic>
}>()
const snap = props.page_profiles_actor.getSnapshot()
const profiles = ref(
  snap.context.my_profiles ??
    ({items: [], offset: 0, total: 0} satisfies ApiRes<
      'get',
      '/profiles/'
    >),
)
const state = ref(snap.value)
onUnmounted(
  props.page_profiles_actor.subscribe(s => {
    const sv = s.value
    state.value = sv
    if (s.context.my_profiles) {
      profiles.value = s.context.my_profiles
    }
  }).unsubscribe,
)
</script>

<template>
  <DataView
    :value="profiles.items"
    data-key="profile"
  >
    <template #list="slotProps">
      <div
        v-for="(
          item, i
        ) in slotProps.items as (typeof profiles)['items']"
        :key="i"
      >
        <RouterLink :to="`/profile/${item.name}`">{{
          item.name
        }}</RouterLink>
      </div>
    </template>
  </DataView>
</template>
