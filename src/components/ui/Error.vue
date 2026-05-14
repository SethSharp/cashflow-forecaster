<script setup lang="ts">
defineProps<{ message: string }>()
</script>

<template>
  <p class="text-xs font-medium text-red-500">{{ message }}</p>
</template>
