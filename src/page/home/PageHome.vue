<script setup lang="ts">
import {use_auth_store} from '@/store/auth.store'

const {user, is_logged_in} = use_auth_store()
</script>

<template>
  <h1>Home</h1>
</template>
