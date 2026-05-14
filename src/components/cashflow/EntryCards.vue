<script setup lang="ts">
import { computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useEntryStore } from '@/stores/entriesStore.ts'
import { useEntityStore } from '@/stores/entityStore.ts'
import EntryCard from '@/components/cashflow/EntryCard.vue'

const { monthlySnapshot } = storeToRefs(useEntryStore())
const { activeEntityId, isConsolidated } = storeToRefs(useEntityStore())

const visibleEntries = computed(() =>
  isConsolidated.value
    ? monthlySnapshot.value
    : monthlySnapshot.value.filter((e) => e.entityId === activeEntityId.value),
)
</script>

<template>
  <div
    v-if="visibleEntries.length"
    class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
  >
    <EntryCard
      v-for="entry in visibleEntries"
      :key="entry.id"
      :entry="entry"
    />
  </div>
</template>
