<script setup lang="ts">
import {use_x} from '@/use_x'
import SettingNik from './lib/setting_nik/SettingNik.vue'

const {nav} = use_x()
const page_snapshot = nav
  .getSnapshot()
  .children.page_settings!.getSnapshot()
const setting_nik = page_snapshot.children.setting_nik!
</script>
<template>
  <SettingNik :actor="setting_nik" />
</template>
