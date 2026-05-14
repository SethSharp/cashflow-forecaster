<script setup lang="ts">
import { useProjection } from '@/composables/useProjection.ts'
import Input from '@/components/ui/Input.vue'

const projectionStore = useProjection()
const { months, projection } = projectionStore
</script>

<template>
  <div data-cy="projection-calculation">
    <Input
      data-cy="projection-months"
      v-model="months"
      label="Months"
      type="number"
      placeholder="12"
      @update:model-value="months = Number($event)"
    />

    <p>
      Current projected balance: {{ projection?.balance ?? 0 }}
    </p>
  </div>
</template>
