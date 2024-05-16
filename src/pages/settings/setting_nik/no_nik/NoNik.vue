<script setup lang="ts">
import {ref} from 'vue'
import type {ActorRefFrom} from 'xstate'

const {parent_actor} = defineProps<{
  parent_actor: ActorRefFrom<x.page_settings.setting_nik.logic>
}>()
const actor = parent_actor.getSnapshot().children.no_nik!
const state = ref(actor.getSnapshot().value)

// ====
const nik = ref('')
const is_show_input = ref(false)
const click_add_nik = () => {
  console.log('adding nik')
  is_show_input.value = true
}
const click_submit = () => {
  console.log('submitting')
  actor.send({
    type: 'page_settings.add_nik',
    payload: nik.value,
  })
}
const submitting = ref(false)
</script>
<template>
  <Button
    @click="
      () =>
        is_show_input ? click_submit() : click_add_nik()
    "
    >{{ is_show_input ? 'Submit' : 'Add nik' }}</Button
  >
  <InputText
    v-model="nik"
    @keyup.enter="click_submit"
    v-if="is_show_input"
    :disabled="submitting"
  />
</template>
