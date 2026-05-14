<script setup lang="ts">
import { reactive } from 'vue'
import Input from '@/components/ui/Input.vue'
import Select from '@/components/ui/Select.vue'
import type { CashflowEntry } from '@/types/cashflow.ts'

const emits = defineEmits<{
  submit: [entry: CashflowEntry]
}>()

const form = reactive<Omit<CashflowEntry, 'id'>>({
  label: '',
  amount: 0,
  type: 'income',
  frequency: 'monthly',
})

const typeOptions = [
  { label: 'Income', value: 'income' },
  { label: 'Expense', value: 'expense' },
]

const frequencyOptions = [
  { label: 'Daily', value: 'daily' },
  { label: 'Weekly', value: 'weekly' },
  { label: 'Monthly', value: 'monthly' },
]

const resetForm = () => {
  form.label = ''
  form.amount = 0
  form.type = 'income'
  form.frequency = 'monthly'
}

const handleSubmit = () => {
  emits('submit', {
    id: Date.now().toString(),
    ...form,
    amount: Number(form.amount),
  })
}

defineExpose({ resetForm })
</script>

<template>
  <form class="flex flex-col gap-4" @submit.prevent="handleSubmit">
    <Input v-model="form.label" label="Label" placeholder="e.g. Monthly salary, Office rent" />

    <Input v-model="form.amount" label="Amount" type="number" placeholder="0.00" />

    <div class="grid grid-cols-2 gap-3">
      <Select v-model="form.type" label="Type" :options="typeOptions" />
      <Select v-model="form.frequency" label="Frequency" :options="frequencyOptions" />
    </div>

    <button
      type="submit"
      class="mt-2 w-full rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-slate-700"
    >
      Add Entry
    </button>
  </form>
</template>
