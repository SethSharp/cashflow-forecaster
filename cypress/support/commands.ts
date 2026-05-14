/// <reference types="cypress" />

interface CashflowFormData {
  label: string
  amount: number
  type: 'income' | 'expense'
  frequency: 'daily' | 'weekly' | 'monthly'
}

Cypress.Commands.add('fillCashflowForm', (data: CashflowFormData) => {
  cy.get("[data-cy='cashflow-form-label'] input").type(data.label)
  cy.get("[data-cy='cashflow-form-amount'] input").clear().type(data.amount.toString())
  cy.get("[data-cy='cashflow-form-type'] select").select(data.type)
  cy.get("[data-cy='cashflow-form-frequency'] select").select(data.frequency)
  cy.get("[data-cy='cashflow-form-submit']").click()
})

declare global {
  namespace Cypress {
    interface Chainable {
      fillCashflowForm(data: CashflowFormData): Chainable<void>
    }
  }
}
