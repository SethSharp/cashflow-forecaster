<script setup lang="ts">
import { ref } from 'vue'

const isOpen = ref(false)

const open = () => (isOpen.value = true)
const close = () => (isOpen.value = false)
</script>

<template>
  <div>
    <slot name="trigger" :open="open" />

    <Teleport to="body">
      <Transition
        enter-active-class="transition duration-200 ease-out"
        enter-from-class="opacity-0"
        enter-to-class="opacity-100"
        leave-active-class="transition duration-150 ease-in"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <div v-if="isOpen" class="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div class="absolute inset-0 bg-black/40 backdrop-blur-sm" @click="close" />

          <Transition
            enter-active-class="transition duration-200 ease-out"
            enter-from-class="opacity-0 scale-95"
            enter-to-class="opacity-100 scale-100"
            leave-active-class="transition duration-150 ease-in"
            leave-from-class="opacity-100 scale-100"
            leave-to-class="opacity-0 scale-95"
          >
            <div
              v-if="isOpen"
              class="relative z-10 w-full max-w-md rounded-xl bg-white shadow-2xl ring-1 ring-black/5"
            >
              <slot :close="close" />
            </div>
          </Transition>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>
