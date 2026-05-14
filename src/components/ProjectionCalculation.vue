<script setup lang="ts">
import { storeToRefs } from 'pinia'
import Card from '@/components/ui/Card.vue'
import Input from '@/components/ui/Input.vue'
import { valueColour } from '@/utils/colour.ts'
import { formatCurrency } from '@/utils/format.ts'
import { useEntryStore } from '@/stores/entriesStore.ts'
import { useProjection } from '@/composables/useProjection.ts'
import ProjectionChart from '@/components/ProjectionChart.vue'

const { months, monthlyProjections, projection } = useProjection()
const { hasEntries } = storeToRefs(useEntryStore())
</script>

<template>
  <div data-cy="projection-calculation" class="flex flex-col gap-6">
    <div class="flex items-end justify-between">
      <div>
        <h2 class="text-base font-semibold text-slate-900">Cashflow Projection</h2>
        <p class="text-sm text-slate-500">Recurring entries projected over time.</p>
      </div>

      <div class="w-28">
        <Input
          data-cy="projection-months"
          :model-value="months"
          label="Months"
          type="number"
          placeholder="12"
          @update:model-value="months = Number($event)"
        />
      </div>
    </div>

    <div v-if="hasEntries" class="flex flex-col gap-6">
      <ProjectionChart :projections="monthlyProjections" />

      <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <template #header>Total Income</template>
          <template #content>
            <p data-cy="projection-income" class="text-xl font-semibold text-emerald-600">
              {{ formatCurrency((projection?.income ?? 0) * monthlyProjections.length) }}
            </p>
          </template>
        </Card>

        <Card>
          <template #header>Total Expenses</template>
          <template #content>
            <p data-cy="projection-expenses" class="text-xl font-semibold text-red-500">
              {{ formatCurrency((projection?.expenses ?? 0) * monthlyProjections.length) }}
            </p>
          </template>
        </Card>

        <Card>
          <template #header>Net / Month</template>
          <template #content>
            <p
              data-cy="projection-net"
              class="text-xl font-semibold"
              :class="valueColour(projection?.net ?? 0)"
            >
              {{ formatCurrency(projection?.net ?? 0) }}
            </p>
          </template>
        </Card>

        <Card class="ring-1 ring-slate-900/10">
          <template #header>Final Balance</template>
          <template #content>
            <p
              data-cy="projection-balance"
              class="text-xl font-semibold"
              :class="valueColour(projection?.balance ?? 0)"
            >
              {{ formatCurrency(projection?.balance ?? 0) }}
            </p>
            <p class="mt-0.5 text-xs text-slate-400">after {{ months }} months</p>
          </template>
        </Card>
      </div>
    </div>

    <div v-else class="rounded-xl border border-dashed border-slate-200 py-12 text-center">
      <p class="text-sm text-slate-400">Add an entry to see your cashflow projection.</p>
    </div>
  </div>
</template>
