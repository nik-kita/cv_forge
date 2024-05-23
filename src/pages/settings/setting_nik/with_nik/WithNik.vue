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
const err_message = ref('')
const {focused: is_focused_input} = useFocus(input_ref, {
  initialValue: is_show_input.value,
})
onUnmounted(
  actor.subscribe(async s => {
    const sv = s.value
    state.value = sv
    if (sv === 'Idle') {
      is_show_input.value = false
    } else if (sv === 'Update_nik_err_showing') {
      await nextTick()
      is_focused_input.value = true
    }

    err_message.value = s.context.client_err_message ?? ''
  }).unsubscribe,
)
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
  <div
    class="flex flex-col items-start gap-2 *:px-2 *:py-1"
  >
    <h2>Hi, {{ nik }}</h2>
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

    <InputText
      ref="input_ref"
      v-model="new_nik"
      @keydown.enter="click_change"
      v-if="is_show_input && state !== 'Deleting_nik'"
      :disabled="state === 'Updating_nik'"
    />
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
    <InlineMessage
      severity="error"
      v-show="err_message"
      >{{ err_message }}</InlineMessage
    >
    <Button
      v-show="is_show_input"
      @click="
        () => {
          if (state === 'Idle') {
            is_show_input = false
          } else if (state === 'Update_nik_err_showing') {
            actor.send({
              type: 'page_settings.update_nik_err_showing.cancel',
            })
          }
        }
      "
      severity="secondary"
      >Cancel</Button
    >
  </div>
</template>
