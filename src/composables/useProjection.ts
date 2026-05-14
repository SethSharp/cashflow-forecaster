import { useEntryStore } from '../stores/entriesStore.ts'
import { computed, ref } from 'vue'
import type { FinalProjectionSnapshot, MonthlyProjectionSnapshot } from '../types/projection.ts'

export const useProjection = () => {
  const entryStore = useEntryStore()
  const months = ref(3)

  const monthlyProjections = computed<MonthlyProjectionSnapshot[]>(() => {
    const snapshot: MonthlyProjectionSnapshot[] = []
    let balance = 0

    const income = entryStore.monthlySnapshot
      .filter((entry) => entry.type === 'income')
      .reduce((acc, entry) => acc + entry.monthly, 0)

    const expenses = entryStore.monthlySnapshot
      .filter((entry) => entry.type === 'expense')
      .reduce((acc, entry) => acc + entry.monthly, 0)

    for (let i = 0; i < months.value; i++) {
      const net = income - expenses
      balance += net

      snapshot.push({
        month: i + 1,
        income,
        expenses,
        net,
        balance,
      })
    }

    return snapshot
  })

  const projection = computed<FinalProjectionSnapshot | undefined>(() => {
    return monthlyProjections.value.at(-1)
  })

  return {
    months,
    monthlyProjections,
    projection,
  }
}
