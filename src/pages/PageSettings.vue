<script setup lang="ts">
import {use_x} from '@/use_x'
import {use_xstore} from '@/x/xstore'
import {ref} from 'vue'

const {root} = use_x()
const {nik, is_user} = use_xstore()
const username = ref<string>(nik.value ?? '')
const page_actor =
  root.getSnapshot().children.page_settings!
const get_snap = () => page_actor.getSnapshot()
const page_state = ref(get_snap().value)
page_actor.subscribe(s => {
  page_state.value = s.value

  if (s.matches({Setting_nik: {With_nik: 'Idle'}})) {
    username.value = nik.value!
  }
})
const click_upsert_nik = () => {
  if (get_snap().matches({Setting_nik: 'No_nik'})) {
    page_actor.send({
      type: 'page_settings.add_nik',
      payload: username.value,
    })
  } else {
    page_actor.send({
      type: 'page_settings.update_nik',
      payload: username.value,
    })
  }
}
</script>
<template>
  <h1 v-if="!is_user">
    AHTUNG! How you get ther without sign-in???
  </h1>
  <div>
    <FloatLabel class="h-3">
      <InputText
        @keyup.enter="click_upsert_nik"
        v-model="username"
        id="nik-input"
        :disabled="
          get_snap().matches({
            Setting_nik: {No_nik: 'Adding_nik'},
          }) ||
          get_snap().matches({
            Setting_nik: {With_nik: 'Updating_nik'},
          }) ||
          get_snap().matches({
            Setting_nik: {With_nik: 'Deleting_nik'},
          })
        "
      />
      <label for="nik-input">Nik: {{ nik }}</label>
      <Button @click="click_upsert_nik">{{
        get_snap().matches({Setting_nik: 'No_nik'}) ?
          'Add nik'
        : 'Change nik'
      }}</Button>
    </FloatLabel>
  </div>
</template>
