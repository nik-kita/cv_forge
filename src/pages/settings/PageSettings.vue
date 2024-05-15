<script setup lang="ts">
import {use_x} from '@/use_x'
import {use_xstore} from '@/x/xstore'
import {ref} from 'vue'
import SettingNik from './setting_nik/SettingNik.vue'

const {root, nav} = use_x()
const {nik, is_user} = use_xstore()
const username = ref<string>(nik.value ?? '')
const page_snapshot = nav
  .getSnapshot()
  .children.page_settings!.getSnapshot()
const setting_nik = page_snapshot.children.setting_nik!
</script>
<template>
  <h1 v-if="!is_user">
    AHTUNG! How you get ther without sign-in???
  </h1>
  <SettingNik :actor="setting_nik" />
</template>
