<script setup lang="ts">
import {ref} from 'vue'
import type {ActorRefFrom} from 'xstate'

const {parent_actor} = defineProps<{
  parent_actor: ActorRefFrom<x.page_settings.setting_nik.logic>
}>()
const actor = parent_actor.getSnapshot().children.with_nik!
const state = ref(actor.getSnapshot().value)
</script>
<template>with nik</template>
