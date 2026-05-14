describe('Dashboard', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('renders the header', () => {
    cy.contains('h1', 'Cashflow Forecaster')
  })

  it('displays empty state with no entries', () => {
    cy.get('[data-cy="main-container"]').contains('Add an entry to see your cashflow projection.')
  })

  it('adds an entry and updates the count', () => {
    cy.get("[data-cy='create-cashflow-button']").click()
    cy.fillCashflowForm({ label: 'Monthly Salary', amount: 5000, type: 'income', frequency: 'monthly' })

    cy.get('[data-cy="main-container"]').contains('1 entries')
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

  it('shows consolidated balance across multiple entities', () => {
    // Add $400/month to Default entity
    cy.get("[data-cy='create-cashflow-button']").click()
    cy.fillCashflowForm({ label: 'Salary', amount: 400, type: 'income', frequency: 'monthly' })

    // Create a second entity and switch to it
    cy.get("[data-cy='entity-add-button']").click()
    cy.get("[data-cy='entity-name-input']").type('Business')
    cy.get("[data-cy='entity-add-submit']").click()
    cy.contains('button', 'Business').click()

    // Add $200/month to Business entity
    cy.get("[data-cy='create-cashflow-button']").click()
    cy.fillCashflowForm({ label: 'Revenue', amount: 200, type: 'income', frequency: 'monthly' })

    // Switch to consolidated view
    cy.get("[data-cy='entity-consolidated-button']").click()

    // Combined income = ($400 + $200) × 3 months = $1,800.00
    cy.get("[data-cy='projection-income']").should('contain', '$1,800.00')
    cy.get("[data-cy='projection-balance']").should('contain', '$1,800.00')
  })
})
