import { createPinia } from 'pinia'
import ProjectionCalculation from '../../src/components/ProjectionCalculation.vue'
import { useEntryStore } from '../../src/stores/entriesStore'

const salary = { id: '1', label: 'Salary', amount: 400, type: 'income' as const, frequency: 'monthly' as const }
const rent = { id: '2', label: 'Rent', amount: 600, type: 'expense' as const, frequency: 'monthly' as const }

const mountWithEntries = (...entries: typeof salary[]) => {
  const pinia = createPinia()
  cy.mount(ProjectionCalculation, { global: { plugins: [pinia] } }).then(() => {
    const store = useEntryStore(pinia)
    entries.forEach(e => store.addEntry(e))
  })
}

describe('ProjectionCalculation', () => {
  it('shows empty state with no entries', () => {
    cy.mount(ProjectionCalculation, { global: { plugins: [createPinia()] } })
    cy.contains('Add an entry to see your cashflow projection.')
  })

  it('shows correct total income value', () => {
    mountWithEntries(salary)
    // $400/month × 3 months = $1,200.00
    cy.get("[data-cy='projection-income']").should('contain', '$1,200.00')
  })

  it('shows income value in green', () => {
    mountWithEntries(salary)
    cy.get("[data-cy='projection-income']").should('have.class', 'text-emerald-600')
  })

  it('shows correct final balance', () => {
    mountWithEntries(salary)
    // $400/month net × 3 months = $1,200.00
    cy.get("[data-cy='projection-balance']").should('contain', '$1,200.00')
  })

  it('shows balance in green when positive', () => {
    mountWithEntries(salary)
    cy.get("[data-cy='projection-balance']").should('have.class', 'text-emerald-600')
  })

  it('shows net in red when expenses exceed income', () => {
    mountWithEntries(salary, rent)
    // net = $400 - $600 = -$200/month
    cy.get("[data-cy='projection-net']").should('have.class', 'text-red-500')
  })

  it('shows balance in red when negative', () => {
    mountWithEntries(salary, rent)
    cy.get("[data-cy='projection-balance']").should('have.class', 'text-red-500')
  })

  it('recalculates when months is changed', () => {
    mountWithEntries(salary)
    cy.get("[data-cy='projection-months'] input").invoke('val', '2').trigger('input')
    // $400/month × 2 months = $800.00
    cy.get("[data-cy='projection-balance']").should('contain', '$800.00')
  })
})
