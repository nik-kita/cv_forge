<script setup lang="ts">
import {useFocus} from '@vueuse/core'
import {nextTick, onUnmounted, ref} from 'vue'
import type {ActorRefFrom} from 'xstate'

const {parent_actor} = defineProps<{
  parent_actor: ActorRefFrom<x.page_settings.setting_nik.logic>
}>()
const actor = parent_actor.getSnapshot().children.no_nik!
const state = ref(actor.getSnapshot().value)
const nik = ref('')
const is_show_input = ref(false)
const input_ref = ref()
const err_message = ref('')
const {focused: is_input_focused} = useFocus(input_ref, {
  initialValue: is_show_input.value,
})
const is_adding_nik = ref(state.value === 'Adding_nik')
onUnmounted(
  actor.subscribe(async s => {
    const sv = s.value
    state.value = s.value

    if (sv === 'Adding_nik') {
      is_adding_nik.value = true
    } else if (sv === 'Idle') {
      is_show_input.value = false
      is_adding_nik.value = false
    } else if (sv === 'Adding_nik_err_showing') {
      is_adding_nik.value = false
      await nextTick()
      is_input_focused.value = true
    }
    err_message.value = s.context.client_err_message ?? ''
  }).unsubscribe,
)
const click_add_nik = async () => {
  is_show_input.value = true
  await nextTick()
  is_input_focused.value = true
}
const click_submit = () => {
  if (nik.value.trim().length === 0) {
    nik.value = ''
    return
  }
  const type =
    state.value === 'Adding_nik_err_showing' ?
      'page_settings.adding_nik.again'
    : 'page_settings.add_nik'
  actor.send({
    type,
    payload: nik.value,
  })
}
</script>
<template>
  <div
    class="flex flex-col items-start gap-2 *:px-2 *:py-1"
  >
    <Button
      :disabled="is_adding_nik"
      @click="
        () =>
          is_show_input ? click_submit() : click_add_nik()
      "
      >{{ is_show_input ? 'Submit' : 'Add nik' }}</Button
    >
    <InputText
      ref="input_ref"
      v-model="nik"
      @keydown.enter="click_submit"
      v-if="is_show_input"
      :disabled="is_adding_nik"
    />
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
          } else if (state === 'Adding_nik_err_showing') {
            actor.send({
              type: 'page_settings.adding_nik_error_showing.cancel',
            })
          }
        }
      "
      severity="secondary"
      >Cancel</Button
    >
  </div>
</template>
