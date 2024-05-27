<script setup lang="ts">
import {use_xstore} from '@/common_xstate/xstore'
import {useRouter} from 'vue-router'

const router = useRouter()
const {nik_curr_route_param, is_user} = use_xstore()
</script>

<template>
  <h4>
    Ooops... user with nik "{{ nik_curr_route_param }}" is
    not exist...
  </h4>
  <Button
    v-if="is_user"
    @click="router.push('/profiles')"
    >Show my profiles</Button
  >
  <Button @click="() => {}"
    >Explore public users (// TODO)</Button
  >
</template>
