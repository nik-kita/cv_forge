<script setup lang="ts">
import {use_xstore} from '@/x/xstore'
import {useFocus} from '@vueuse/core'
import {nextTick, onUnmounted, ref} from 'vue'
import type {ActorRefFrom} from 'xstate'

const {nik} = use_xstore()
const {parent_actor} = defineProps<{
  parent_actor: ActorRefFrom<x.page_settings.setting_nik.logic>
}>()
const actor = parent_actor.getSnapshot().children.with_nik!
const state = ref(actor.getSnapshot().value)
const is_show_input = ref(false)
const input_ref = ref()
const {focused: is_focused_input} = useFocus(input_ref, {
  initialValue: is_show_input.value,
})
const subscription = actor.subscribe(s => {
  const sv = s.value
  state.value = sv
  if (sv === 'Idle') {
    is_show_input.value = false
  }
})
onUnmounted(() => {
  subscription.unsubscribe()
})
// ===
const new_nik = ref(nik.value ?? '')
const click_i_want_to_change = async () => {
  is_show_input.value = true
  await nextTick()
  is_focused_input.value = true
}
const click_change = () => {
  const type =
    state.value === 'Update_nik_err_showing' ?
      'page_settings.update_nik.again'
    : 'page_settings.update_nik'

  console.log('click_change', {
    type,
    payload: new_nik.value,
  })

  actor.send({
    type,
    payload: new_nik.value,
  })
}
</script>
<template>
  <h4>Hi, {{ nik }}</h4>
  <Button
    v-show="
      !is_show_input &&
      state !== 'Updating_nik' &&
      state !== 'Update_nik_err_showing'
    "
    :disabled="state === 'Deleting_nik'"
    severity="danger"
    @click="actor.send({type: 'page_settings.rm_nik'})"
    >I want to delete my nik ({{ nik }})</Button
  >
  <Button
    v-show="!is_show_input && state === 'Idle'"
    @click="click_i_want_to_change"
    >I want to change my nik</Button
  >
  <Button
    :disabled="state === 'Updating_nik'"
    v-show="
      is_show_input &&
      (state === 'Idle' ||
        state === 'Update_nik_err_showing')
    "
    @click="click_change"
    >Change</Button
  >
  <InputText
    ref="input_ref"
    v-model="new_nik"
    @keydown.enter="click_change"
    v-if="is_show_input && state !== 'Deleting_nik'"
    :disabled="state === 'Updating_nik'"
  />
</template>
