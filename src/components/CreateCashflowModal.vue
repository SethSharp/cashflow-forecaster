<script setup lang="ts">
import { ref } from 'vue'
import Modal from '@/components/ui/Modal.vue'
import { useEntryStore } from '@/stores/entries.ts'
import type { CashflowEntry } from '@/types/cashflow.ts'
import CashflowForm from '@/components/CashflowForm.vue'

const cashflowFormRef = ref<InstanceType<typeof CashflowForm>>()

const entryStore = useEntryStore()
const { addEntry } = entryStore

const entrySubmitted = (entry: CashflowEntry, close: () => void) => {
  addEntry(entry)
  cashflowFormRef.value?.resetForm()
  close()
}
</script>

<template>
  <Modal>
    <template #trigger="{ open }">
      <button
        class="rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-700"
        @click="open"
      >
        Add Entry
      </button>
    </template>

    <template #default="{ close }">
      <div class="p-6">
        <div class="mb-5">
          <h2 class="text-base font-semibold text-slate-900">Add cashflow entry</h2>
          <p class="mt-0.5 text-sm text-slate-500">Define a recurring income or expense.</p>
        </div>

        <CashflowForm
          ref="cashflowFormRef"
          @submit="(entry) => entrySubmitted(entry, close)"
        />
      </div>
    </template>
  </Modal>
</template>
