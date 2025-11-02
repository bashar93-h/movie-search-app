<script setup lang="ts">
const props = defineProps<{
  message: string
}>()
</script>

<template>
  <div class="rounded-lg bg-red-100 p-4 text-red-700">
    <p class="font-semibold">Error</p>
    <p>{{ props.message }}</p>
  </div>
</template>
