<template>
  <div class="rounded-xl border border-slate-200 bg-white p-4">
    <p class="text-xs font-medium uppercase tracking-wide text-slate-400">
      <slot name="header" />
    </p>
    <div class="mt-1">
      <slot name="content" />
    </div>
  </div>
</template>
