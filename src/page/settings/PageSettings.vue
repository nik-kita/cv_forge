<script setup lang="ts">
import {use_x} from '@/use_x'
import {use_xstore} from '@/common_xstate/xstore'
import SettingNik from './lib/setting_nik/SettingNik.vue'

const {nav} = use_x()
const {is_user} = use_xstore()
const page_snapshot = nav
  .getSnapshot()
  .children.page_settings!.getSnapshot()
const setting_nik = page_snapshot.children.setting_nik!
</script>
<template>
  <h1
    v-if="!is_user"
    class="text-xl bg-black text-red-600 p-2"
    severity="error"
  >
    AHTUNG! How you get there without sign-in???
  </h1>
  <SettingNik :actor="setting_nik" />
</template>
