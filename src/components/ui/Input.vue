<script setup lang="ts">
import Label from '@/components/ui/Label.vue'

defineProps<{
  modelValue: string | number
  label?: string
  placeholder?: string
  type?: string
}>()

defineEmits<{ 'update:modelValue': [value: string] }>()
</script>

<template>
  <div class="flex flex-col gap-1.5">
    <Label> {{ label }} </Label>

    <input
      :value="modelValue"
      :type="type ?? 'text'"
      :placeholder="placeholder"
      class="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-2 focus:ring-slate-100"
      @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
    />
  </div>
</template>
