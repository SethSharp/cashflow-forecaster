import { createPinia } from 'pinia'
import ProjectionCalculation from '../../src/components/ProjectionCalculation.vue'
import { useEntryStore } from '../../src/stores/entriesStore'

const salary = { id: '1', label: 'Salary', amount: 400, type: 'income' as const, frequency: 'monthly' as const }

describe('ProjectionCalculation', () => {
  it('shows zero balance with no entries', () => {
    cy.mount(ProjectionCalculation, {
      global: { plugins: [createPinia()] },
    })

    cy.contains('Current projected balance: 0')
  })

  it('shows correct balance based on entries and default months', () => {
    const pinia = createPinia()

    cy.mount(ProjectionCalculation, {
      global: { plugins: [pinia] },
    }).then(() => {
      const store = useEntryStore(pinia)
      store.addEntry(salary)
    })

    // default months is 3 → 400 * 3 = 1200
    cy.contains('Current projected balance: 1200')
  })

  it('recalculates when months is changed', () => {
    const pinia = createPinia()

    cy.mount(ProjectionCalculation, {
      global: { plugins: [pinia] },
    }).then(() => {
      const store = useEntryStore(pinia)
      store.addEntry(salary)
    })

    cy.get("[data-cy='projection-months'] input").clear().type('2')

    cy.contains('Current projected balance: 800')
  })
})
