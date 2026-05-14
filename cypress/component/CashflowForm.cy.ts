import { createPinia } from 'pinia'
import CashflowForm from '../../src/components/cashflow/CashflowForm.vue'

const mount = (props = {}) =>
  cy.mount(CashflowForm, { global: { plugins: [createPinia()] }, props })

describe('CashflowForm component test', () => {
  beforeEach(() => {
    mount()
  })

  it('renders all fields', () => {
    cy.get("[data-cy='cashflow-form-label'] input").should('exist')
    cy.get("[data-cy='cashflow-form-amount'] input").should('exist')
    cy.get("[data-cy='cashflow-form-type'] select").should('exist')
    cy.get("[data-cy='cashflow-form-frequency'] select").should('exist')
    cy.get("[data-cy='cashflow-form-submit']").should('exist')
  })

  it('emits submit with correct entry on form submission', () => {
    const onSubmit = cy.spy().as('submitSpy')
    mount({ onSubmit })

    cy.get("[data-cy='cashflow-form-label'] input").type('Monthly Salary')
    cy.get("[data-cy='cashflow-form-amount'] input").clear().type('5000')
    cy.get("[data-cy='cashflow-form-type'] select").select('income')
    cy.get("[data-cy='cashflow-form-frequency'] select").select('monthly')
    cy.get("[data-cy='cashflow-form-submit']").click()

    cy.get('@submitSpy').should('have.been.calledOnce')
    cy.get('@submitSpy').should('have.been.calledWithMatch', {
      label: 'Monthly Salary',
      amount: 5000,
      type: 'income',
      frequency: 'monthly',
    })
  })

  it('resets form after calling resetForm', () => {
    mount().then(({ component }) => {
      cy.get("[data-cy='cashflow-form-label'] input").type('Rent')
      cy.get("[data-cy='cashflow-form-amount'] input").clear().type('1200')

      cy.then(() => component.resetForm())

      cy.get("[data-cy='cashflow-form-label'] input").should('have.value', '')
      cy.get("[data-cy='cashflow-form-amount'] input").should('have.value', '0')
    })
  })

  describe('validation', () => {
    it('shows label error when submitted with empty label', () => {
      cy.get("[data-cy='cashflow-form-submit']").click()
      cy.get("[data-cy='cashflow-form-label-error']").should('contain', 'Label is required.')
    })

    it('shows amount error when submitted with zero amount', () => {
      cy.get("[data-cy='cashflow-form-submit']").click()
      cy.get("[data-cy='cashflow-form-amount-error']").should('contain', 'Amount must be greater than zero.')
    })

    it('does not emit submit when form is invalid', () => {
      const onSubmit = cy.spy().as('submitSpy')
      mount({ onSubmit })

      cy.get("[data-cy='cashflow-form-submit']").click()
      cy.get('@submitSpy').should('not.have.been.called')
    })

    it('clears errors after resetForm is called', () => {
      mount().then(({ component }) => {
        cy.get("[data-cy='cashflow-form-submit']").click()
        cy.get("[data-cy='cashflow-form-label-error']").should('exist')

        cy.then(() => component.resetForm())

        cy.get("[data-cy='cashflow-form-label-error']").should('not.exist')
        cy.get("[data-cy='cashflow-form-amount-error']").should('not.exist')
      })
    })

    it('shows no errors when form is valid', () => {
      cy.get("[data-cy='cashflow-form-label'] input").type('Salary')
      cy.get("[data-cy='cashflow-form-amount'] input").clear().type('1000')
      cy.get("[data-cy='cashflow-form-submit']").click()

      cy.get("[data-cy='cashflow-form-label-error']").should('not.exist')
      cy.get("[data-cy='cashflow-form-amount-error']").should('not.exist')
    })
  })
})
