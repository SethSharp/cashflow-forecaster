<script setup lang="ts">
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useEntityStore } from '@/stores/entityStore.ts'

const entityStore = useEntityStore()
const { entities, activeEntityId, isConsolidated } = storeToRefs(entityStore)

const newEntityName = ref('')
const showAddEntity = ref(false)

const submitNewEntity = () => {
  if (!newEntityName.value.trim()) return
  entityStore.addEntity(newEntityName.value.trim())
  newEntityName.value = ''
  showAddEntity.value = false
}
</script>

<template>
  <div class="flex items-center gap-3">
    <div class="flex items-center gap-1 rounded-lg border border-slate-200 bg-slate-50 p-1">
      <button
        v-for="entity in entities"
        :key="entity.id"
        class="rounded-md px-3 py-1.5 text-sm font-medium transition"
        :class="
          !isConsolidated && activeEntityId === entity.id
            ? 'bg-white text-slate-900 shadow-sm'
            : 'text-slate-500 hover:text-slate-700'
        "
        @click="entityStore.setActiveEntity(entity.id)"
      >
        {{ entity.name }}
      </button>

      <button
        v-if="entities.length > 1"
        data-cy="entity-consolidated-button"
        class="rounded-md px-3 py-1.5 text-sm font-medium transition"
        :class="
          isConsolidated
            ? 'bg-white text-slate-900 shadow-sm'
            : 'text-slate-500 hover:text-slate-700'
        "
        @click="isConsolidated = true"
      >
        All
      </button>
    </div>

    <div v-if="showAddEntity" class="flex items-center gap-2">
      <input
        data-cy="entity-name-input"
        v-model="newEntityName"
        placeholder="Entity name"
        class="rounded-lg border border-slate-200 px-3 py-1.5 text-sm outline-none focus:border-slate-400 focus:ring-2 focus:ring-slate-100"
        @keydown.enter="submitNewEntity"
        @keydown.escape="showAddEntity = false"
      />
      <button
        data-cy="entity-add-submit"
        class="text-sm font-medium text-slate-600 hover:text-slate-900"
        @click="submitNewEntity"
      >
        Add
      </button>
      <button class="text-sm text-slate-400 hover:text-slate-600" @click="showAddEntity = false">
        Cancel
      </button>
    </div>

    <button
      v-else
      data-cy="entity-add-button"
      class="text-sm font-medium text-slate-500 hover:text-slate-700"
      @click="showAddEntity = true"
    >
      + Entity
    </button>
  </div>
</template>
