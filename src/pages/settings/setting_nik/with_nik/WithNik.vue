<script setup lang="ts">
import {use_xstore} from '@/x/xstore'
import {ref} from 'vue'
import type {ActorRefFrom} from 'xstate'

const {nik} = use_xstore()
const {parent_actor} = defineProps<{
  parent_actor: ActorRefFrom<x.page_settings.setting_nik.logic>
}>()
const actor = parent_actor.getSnapshot().children.with_nik!
const state = ref(actor.getSnapshot().value)
</script>
<template>
  <h4>Hi, {{ nik }}</h4>
  <Button
    @click="actor.send({type: 'page_settings.rm_nik'})"
    >I want to delete my nik ({{ nik }})</Button
  >
</template>
