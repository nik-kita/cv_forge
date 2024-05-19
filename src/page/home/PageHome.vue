<script setup lang="ts">
import {use_auth_store} from '@/store/auth.store'
import markdownIt from 'markdown-it'
import {computed, ref, watchEffect} from 'vue'

const {user, is_logged_in} = use_auth_store()
const content = ref('')
const content_md = computed(() => {
  return markdownIt().render(content.value)
})
</script>

<template>
  <div class="flex flex-col">
    <h1 class="text-3xl">Home</h1>
    <Textarea v-model="content"></Textarea>
    <div v-html="content_md"></div>
  </div>
</template>
