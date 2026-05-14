<script setup lang="ts">
import { computed } from 'vue'
import { storeToRefs } from 'pinia'
import Card from '@/components/ui/Card.vue'
import { valueColour } from '@/utils/colour.ts'
import { formatCurrency } from '@/utils/format.ts'
import { useEntryStore } from '@/stores/entriesStore.ts'
import { useEntityStore } from '@/stores/entityStore.ts'

const { monthlySnapshot } = storeToRefs(useEntryStore())
const { activeEntityId, isConsolidated, entities } = storeToRefs(useEntityStore())

const visibleEntries = computed(() =>
  isConsolidated.value
    ? monthlySnapshot.value
    : monthlySnapshot.value.filter((e) => e.entityId === activeEntityId.value),
)

const entityName = (id: string) => entities.value.find((e) => e.id === id)?.name
</script>

<template>
  <div
    v-if="visibleEntries.length"
    class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
  >
    <Card v-for="entry in visibleEntries" :key="entry.id">
      <template #header>{{ entry.label }}</template>
      <template #content>
        <div class="mt-2 flex flex-col gap-3">
          <p
            class="text-xl font-semibold"
            :class="valueColour(entry.type === 'income' ? 1 : -1)"
          >
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
              <span class="rounded-full bg-slate-100 px-2 py-0.5 text-xs font-medium capitalize text-slate-500">
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
  </div>
</template>
