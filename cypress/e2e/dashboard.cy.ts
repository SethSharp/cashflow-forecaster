describe('Dashboard', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('renders the header', () => {
    cy.contains('h1', 'Cashflow Forecaster')
  })

  it('displays empty state', () => {
    cy.get('[data-cy="main-container"]').contains('You have 0 entries')
  })

  it('adds an entry and updates the count', () => {
    cy.get("[data-cy='create-cashflow-button']").click()

    cy.fillCashflowForm({
      label: 'Monthly Salary',
      amount: 5000,
      type: 'income',
      frequency: 'monthly',
    })

    cy.get('[data-cy="main-container"]').contains('You have 1 entries')
  })

  it('adds an entry and updates the balance projection', () => {
    cy.get("[data-cy='create-cashflow-button']").click()

    cy.fillCashflowForm({
      label: 'Monthly Salary',
      amount: 400,
      type: 'income',
      frequency: 'monthly',
    })

    cy.get("[data-cy='projection-calculation']").contains('Current projected balance: 1200')
  })
})
