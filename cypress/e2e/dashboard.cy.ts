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

    cy.fillCashflowForm({ label: 'Monthly Salary', amount: 5000, type: 'income', frequency: 'monthly' })

    cy.get('[data-cy="main-container"]').contains('You have 1 entries')
  })

  it('shows correct income total after adding an entry', () => {
    cy.get("[data-cy='create-cashflow-button']").click()

    cy.fillCashflowForm({ label: 'Monthly Salary', amount: 400, type: 'income', frequency: 'monthly' })

    // $400/month × 3 months default = $1,200.00
    cy.get("[data-cy='projection-income']").should('contain', '$1,200.00')
  })

  it('shows correct final balance with income and expense', () => {
    cy.get("[data-cy='create-cashflow-button']").click()
    cy.fillCashflowForm({ label: 'Salary', amount: 1000, type: 'income', frequency: 'monthly' })

    cy.get("[data-cy='create-cashflow-button']").click()
    cy.fillCashflowForm({ label: 'Rent', amount: 600, type: 'expense', frequency: 'monthly' })

    // net = $400/month × 3 months = $1,200.00
    cy.get("[data-cy='projection-balance']").should('contain', '$1,200.00')
  })
})
