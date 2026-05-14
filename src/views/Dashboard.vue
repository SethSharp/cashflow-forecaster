<script setup lang="ts">
import { useEntryStore } from '@/stores/entriesStore.js'
import CreateCashflowModal from '@/components/CreateCashflowModal.vue'
import ProjectionCalculation from '@/components/ProjectionCalculation.vue'

const entryStore = useEntryStore()
const { entries } = entryStore
</script>

<template>
  <div class="min-h-screen bg-slate-50">
    <header class="border-b border-slate-200 bg-white">
      <div class="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <h1 class="text-lg font-semibold text-slate-900">Cashflow Forecaster</h1>
        <CreateCashflowModal />
      </div>
    </header>

    <main class="mx-auto max-w-6xl px-6 py-8">
      <p> You have {{ entries.length }} entries </p>

      <ProjectionCalculation />
    </main>
  </div>
</template>
