<script setup>
import {RouterLink} from 'vue-router'
</script>

<template>
  <slot></slot>
  <ul>
    <li>
      <RouterLink to="/home">Home</RouterLink>
    </li>
    <li>
      <RouterLink to="/profiles">Profiles</RouterLink>
    </li>
  </ul>
</template>
