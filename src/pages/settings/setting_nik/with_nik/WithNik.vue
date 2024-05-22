<script setup lang="ts">
import {use_xstore} from '@/x/xstore'
import {ref, onUnmounted} from 'vue'
import type {ActorRefFrom} from 'xstate'

const {nik} = use_xstore()
const {parent_actor} = defineProps<{
  parent_actor: ActorRefFrom<x.page_settings.setting_nik.logic>
}>()
const actor = parent_actor.getSnapshot().children.with_nik!
const state = ref(actor.getSnapshot().value)
const updating = ref(state.value === 'Updating_nik')
const subscription = actor.subscribe(s => {
  const sv = s.value
  const actual_updating = sv === 'Updating_nik'
  state.value = sv

  if (updating.value && !actual_updating) {
    updating.value = actual_updating
    is_show_input.value = false
  }
})
onUnmounted(() => {
  subscription.unsubscribe()
})
// ===
const new_nik = ref(nik.value ?? '')
const is_show_input = ref(false)
const click_change = () => {
  actor.send({
    type: 'page_settings.update_nik',
    payload: new_nik.value,
  })
}
const click_i_want_to_change = () => {
  is_show_input.value = true
}
</script>
<template>
  <h4>Hi, {{ nik }}</h4>
  <Button
    severity="danger"
    @click="actor.send({type: 'page_settings.rm_nik'})"
    >I want to delete my nik ({{ nik }})</Button
  >
  <Button
    v-show="!is_show_input"
    @click="click_i_want_to_change"
    >I want to change my nik</Button
  >
  <Button
    v-show="is_show_input"
    @click="click_change"
    >Change</Button
  >
  <InputText
    v-model="new_nik"
    @keyup.enter="click_change"
    v-if="is_show_input"
    :disabled="updating"
  />
</template>
