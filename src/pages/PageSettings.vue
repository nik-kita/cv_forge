<script setup lang="ts">
import {use_xstore} from '@/x/xstore'

const {nik, is_user} = use_xstore()
</script>
<template>
  <h1 v-if="!is_user">
    AHTUNG! How you get ther without sign-in???
  </h1>
  <h1>Settings</h1>
</template>
