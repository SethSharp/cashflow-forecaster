import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import type { Entity } from '@/types/entity.ts'

const DEFAULT_ENTITY: Entity = { id: 'default', name: 'Default' }

export const useEntityStore = defineStore('entities', () => {
  const entities = ref<Entity[]>([DEFAULT_ENTITY])
  const activeEntityId = ref<string>(DEFAULT_ENTITY.id)
  const isConsolidated = ref(false)

  const activeEntity = computed(() => entities.value.find(e => e.id === activeEntityId.value))

  const addEntity = (name: string) => {
    const entity: Entity = { id: Date.now().toString(), name }
    entities.value.push(entity)
  }

  const setActiveEntity = (id: string) => {
    activeEntityId.value = id
    isConsolidated.value = false
  }

  return {
    entities,
    activeEntityId,
    activeEntity,
    isConsolidated,
    addEntity,
    setActiveEntity,
  }
})
