import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import type { CashflowEntry, MonthlyCashflowEntry } from '@/types/cashflow.ts'

export const useEntryStore = defineStore('entries', () => {
  const entries = ref<CashflowEntry[]>([])

  const addEntry = (entry: CashflowEntry) => {
    entries.value.push(entry)
  }

  const removeEntry = (id: string) => {
    entries.value = entries.value.filter((entry) => entry.id !== id)
  }

  const monthlySnapshot = computed<MonthlyCashflowEntry[]>(() => {
    return entries.value.map((entry: CashflowEntry) => {
      const monthly =
        entry.frequency === 'daily'
          ? (entry.amount * 365) / 12
          : entry.frequency === 'weekly'
            ? entry.amount * (52 / 12)
            : entry.amount

      return {
        ...entry,
        monthly: monthly,
      }
    })
  })

  return {
    entries,
    addEntry,
    removeEntry,
    monthlySnapshot,
  }
})
