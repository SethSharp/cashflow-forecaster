import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { CashflowEntry } from '@/types/cashflow.ts'

export const useEntryStore = defineStore('entries', () => {
  const entries = ref<CashflowEntry[]>([])

  const addEntry = (entry: CashflowEntry) => {
    entries.value.push(entry)
  }

  const removeEntry = (id: string) => {
    entries.value = entries.value.filter(entry => entry.id !== id)
  }

  return {
    entries,
    addEntry,
    removeEntry,
  }
})
