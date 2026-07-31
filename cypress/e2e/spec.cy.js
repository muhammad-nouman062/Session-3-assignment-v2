describe('Session 3-Task 2: Cypress vs Playwright Replication', () => {

  beforeEach(() => {
    // Visit the practice website actions page
    cy.visit('https://example.cypress.io/commands/actions');
  });

  it('Scenario 1: Should type into input field and verify value change', () => {
    // 1. Locate the input field using the class selector
    cy.get('.action-email')
      // 2. Type the specified internship email
      .type('internship@example.com')
      // 3. Assert that the input field value matches exactly what was typed
      .should('have.value', 'internship@example.com');

    // 4. Capture a screenshot for evidence as required by the assignment guidelines
    cy.screenshot('scenario-1-positive-success');
  });

  it('Scenario 2: Should clear text field and verify empty state', () => {
    // 1. Locate the input field, type text, and then clear it
    cy.get('.action-email')
      .type('temporary@example.com')
      .clear()
      // 2. Assert that the field is now completely empty
      .should('have.value', '');
  });

});