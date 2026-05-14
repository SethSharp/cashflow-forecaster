<script setup lang="ts">
import { computed } from 'vue'
import { Line } from 'vue-chartjs'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  BarController,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js'
import type { MonthlyProjectionSnapshot } from '@/types/projection.ts'
import { formatCurrency } from '@/utils/format.ts'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  BarController,
  Tooltip,
  Legend,
  Filler,
)

const props = defineProps<{
  projections: MonthlyProjectionSnapshot[]
}>()

const labels = computed(() => props.projections.map((p) => `Month ${p.month}`))

const chartData = computed(() => ({
  labels: labels.value,
  datasets: [
    {
      type: 'bar' as const,
      label: 'Income',
      data: props.projections.map((p) => p.income),
      backgroundColor: 'rgba(16, 185, 129, 0.6)',
      borderRadius: 4,
      order: 2,
    },
    {
      type: 'bar' as const,
      label: 'Expenses',
      data: props.projections.map((p) => -p.expenses),
      backgroundColor: 'rgba(239, 68, 68, 0.6)',
      borderRadius: 4,
      order: 2,
    },
    {
      type: 'line' as const,
      label: 'Balance',
      data: props.projections.map((p) => p.balance),
      borderColor: '#1e293b',
      backgroundColor: 'rgba(30, 41, 59, 0.08)',
      borderWidth: 2,
      pointRadius: 4,
      pointBackgroundColor: '#1e293b',
      fill: true,
      tension: 0.3,
      order: 1,
    },
  ],
}))

const chartOptions = computed(() => ({
  responsive: true,
  maintainAspectRatio: false,
  interaction: {
    mode: 'index' as const,
    intersect: false,
  },
  plugins: {
    legend: {
      position: 'top' as const,
      labels: {
        font: { size: 12 },
        color: '#475569',
        boxWidth: 12,
        padding: 16,
      },
    },
    tooltip: {
      callbacks: {
        label: (ctx: any) => ` ${ctx.dataset.label}: ${formatCurrency(Math.abs(ctx.raw))}`,
      },
    },
  },
  scales: {
    x: {
      grid: { display: false },
      ticks: { color: '#94a3b8', font: { size: 12 } },
    },
    y: {
      grid: { color: 'rgba(148, 163, 184, 0.15)' },
      ticks: {
        color: '#94a3b8',
        font: { size: 12 },
        callback: (value: any) =>
          `$${Number(value).toLocaleString('en-AU', { minimumFractionDigits: 0 })}`,
      },
    },
  },
}))
</script>

<template>
  <div class="h-72">
    <Line :data="chartData" :options="chartOptions" />
  </div>
</template>
