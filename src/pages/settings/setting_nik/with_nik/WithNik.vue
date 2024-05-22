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
const changing = ref(false)
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
    :disabled="changing"
  />
</template>
