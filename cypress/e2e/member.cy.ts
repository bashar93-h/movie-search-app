describe('Member Flow: Login → Search → Add to Favorites', () => {
  beforeEach(() => {
    // Clear localStorage before each test
    cy.clearLocalStorage()

    // Visit home page
    cy.visit('/')
  })

  it('should allow member to login, search for movie, and add to favorites', () => {
    // Step 1: Navigate to login page
    cy.contains('Login').click()
    cy.url().should('include', '/login')

    // Step 2: Login as member
    cy.get('input[type="email"]').type('member@movie.com')
    cy.get('input[type="password"]').type('member123')
    cy.get('button[type="submit"]').click()

    // Step 3: Verify successful login (should redirect to home)
    cy.url().should('eq', Cypress.config().baseUrl + '/')
    cy.contains('Bashar').should('be.visible') // User name in navbar

    // Step 4: Search for a movie
    cy.get('input[placeholder*="Search"]').type('test{enter}')

    // Wait for search results
    cy.get('[data-cy="movie-card"]', { timeout: 10000 }).should('have.length.greaterThan', 0)

    // Step 5: Click on first movie to view details
    cy.get('[data-cy="movie-card"]').first().click()

    // Step 6: Add to favorites
    cy.get('[aria-label*="Add to favorites"]').click()

    // Verify toast notification
    cy.contains('added to').should('be.visible')

    // Step 7: Navigate to favorites page
    cy.contains('Favorites').click()
    cy.url().should('include', '/favorites')

    // Step 8: Verify movie appears in favorites
    cy.get('[data-cy="movie-card"]').should('have.length.greaterThan', 0)
  })

  it('should prevent non-authenticated user from accessing favorites', () => {
    // Try to access favorites without login
    cy.visit('/favorites')

    // Should redirect to login
    cy.url().should('include', '/login')

    // Should show error message
    cy.contains('Please login').should('be.visible')
  })
})
