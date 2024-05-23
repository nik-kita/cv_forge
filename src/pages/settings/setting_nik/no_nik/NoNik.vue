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
const {focused: is_input_focused} = useFocus(input_ref, {
  initialValue: is_show_input.value,
})
const is_button_disabled = ref(state.value === 'Adding_nik')
const is_input_disabled = is_button_disabled
onUnmounted(
  actor.subscribe(s => {
    const sv = s.value
    state.value = s.value

    if (sv === 'Adding_nik') {
      is_button_disabled.value = true
      is_input_disabled.value = true
    } else if (sv === 'Idle') {
      is_button_disabled.value = false
      is_input_disabled.value = false
    } else if (sv === 'Adding_nik_err_showing') {
      is_button_disabled.value = false
      is_input_disabled.value = false
    }
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
  actor.send({
    type: 'page_settings.add_nik',
    payload: nik.value,
  })
}
</script>
<template>
  <div
    class="flex flex-col items-start gap-2 *:px-2 *:py-1"
  >
    <Button
      :disabled="is_button_disabled"
      @click="
        () =>
          is_show_input ? click_submit() : click_add_nik()
      "
      >{{ is_show_input ? 'Submit' : 'Add nik' }}</Button
    >
    <InputText
      ref="input_ref"
      v-model="nik"
      @keydown.self.enter="click_submit"
      v-if="is_show_input"
      :disabled="is_input_disabled"
    />
  </div>
</template>
