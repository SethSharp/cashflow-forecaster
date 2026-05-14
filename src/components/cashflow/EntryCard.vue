<script setup lang="ts">
import { storeToRefs } from 'pinia'
import Card from '@/components/ui/Card.vue'
import { valueColour } from '@/utils/colour.ts'
import { formatCurrency } from '@/utils/format.ts'
import { useEntityStore } from '@/stores/entityStore.ts'
import type { MonthlyCashflowEntry } from '@/types/cashflow.ts'

defineProps<{ entry: MonthlyCashflowEntry }>()

const { isConsolidated, entities } = storeToRefs(useEntityStore())

const entityName = (id: string) => entities.value.find((e) => e.id === id)?.name
</script>

<template>
  <Card>
    <template #header>{{ entry.label }}</template>
    <template #content>
      <div class="mt-2 flex flex-col gap-3">
        <p class="text-xl font-semibold" :class="valueColour(entry.type === 'income' ? 1 : -1)">
          {{ formatCurrency(entry.amount) }}
        </p>

        <div class="flex items-center justify-between">
          <div class="flex gap-2">
            <span
              class="rounded-full px-2 py-0.5 text-xs font-medium capitalize"
              :class="
                entry.type === 'income'
                  ? 'bg-emerald-50 text-emerald-700'
                  : 'bg-red-50 text-red-600'
              "
            >
              {{ entry.type }}
            </span>
            <span
              class="rounded-full bg-slate-100 px-2 py-0.5 text-xs font-medium capitalize text-slate-500"
            >
              {{ entry.frequency }}
            </span>
          </div>

          <span v-if="isConsolidated" class="text-xs text-slate-400">
            {{ entityName(entry.entityId) }}
          </span>
        </div>

        <p class="text-xs text-slate-400">{{ formatCurrency(entry.monthly) }} / month</p>
      </div>
    </template>
  </Card>
</template>
