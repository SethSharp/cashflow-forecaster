<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useEntryStore } from '@/stores/entriesStore.ts'
import { useEntityStore } from '@/stores/entityStore.ts'
import CreateCashflowModal from '@/components/CreateCashflowModal.vue'
import ProjectionCalculation from '@/components/ProjectionCalculation.vue'
import EntityContainer from '@/components/EntityContainer.vue'

const entryStore = useEntryStore()
const { entries } = storeToRefs(entryStore)

const entityStore = useEntityStore()
const { activeEntity, isConsolidated } = storeToRefs(entityStore)
</script>

<template>
  <div class="min-h-screen bg-slate-50">
    <header class="border-b border-slate-200 bg-white">
      <div class="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <h1 class="text-lg font-semibold text-slate-900">Cashflow Forecaster</h1>

        <EntityContainer />
      </div>
    </header>

    <main data-cy="main-container" class="mx-auto max-w-6xl px-6 py-8">
      <div class="mb-6 flex items-center justify-between">
        <p class="text-sm text-slate-500">
          {{ isConsolidated ? 'All entities' : activeEntity?.name }} - {{ entries.length }} entries
        </p>

        <CreateCashflowModal />
      </div>

      <ProjectionCalculation />
    </main>
  </div>
</template>
