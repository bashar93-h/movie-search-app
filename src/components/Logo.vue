<script setup lang="ts">
const props = defineProps({
  styling: String,
})
</script>

<template>
  <RouterLink to="/">
    <img src="/logo.png" alt="Movie search app logo" :class="props.styling" />
  </RouterLink>
</template>
