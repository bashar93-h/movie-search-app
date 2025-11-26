describe('Rating Flow: Login → Rate Movie → Verify Persistence', () => {
  beforeEach(() => {
    cy.clearLocalStorage()
    cy.visit('/')
  })

  it('should allow user to rate a movie and see the rating persist', () => {
    // Step 1: Login
    cy.contains('Login').click()
    cy.get('input[type="email"]').type('member@movie.com')
    cy.get('input[type="password"]').type('member123')
    cy.get('button[type="submit"]').click()

    // Step 2: Search for a movie
    cy.get('input[placeholder*="Search"]').type('test{enter}')
    cy.get('[data-cy="movie-card"]', { timeout: 10000 }).should('exist')

    // Step 3: Open movie
    cy.get('[data-cy="movie-card"]').first().click()
    cy.url().should('include', '/movie/')

    // Step 4: Rate the movie (5 stars)
    cy.get('[data-cy="star-rating"]').find('div').eq(4).click()

    // Step 5: Click "Add rating"
    cy.contains(/add rating/i).click()

    // Step 6: Verify rating was added (case-insensitive, flexible)
    cy.contains(/added successfully/i, { timeout: 10000 }).should('exist')

    cy.contains(/your rating/i, { timeout: 10000 }).should('be.visible')

    // Step 7: Reload
    cy.reload()

    // Step 8: Verify rating persists after reload
    cy.contains(/your rating/i).should('be.visible')
  })

  it('should allow user to update their rating', () => {
    // Step 1: Login
    cy.contains(/login/i).click()
    cy.get('input[type="email"]').type('member@movie.com')
    cy.get('input[type="password"]').type('member123')
    cy.get('button[type="submit"]').click()

    // Step 2: Search and open movie
    cy.get('input[placeholder*="Search"]').type('bad{enter}')
    cy.get('[data-cy="movie-card"]', { timeout: 10000 }).first().click()

    // Step 3: Give initial rating (3 stars)
    cy.get('[data-cy="star-rating"]').find('div').eq(2).click()
    cy.contains(/add rating/i).click()

    // Step 4: Verify rating added
    cy.contains(/added successfully/i, { timeout: 10000 }).should('exist')

    // Step 5: Update rating (5 stars)
    cy.get('[data-cy="star-rating"]').find('div').eq(4).click()
    cy.contains(/update rating/i).click()

    // Step 6: Verify update success
    cy.contains(/updated/i, { timeout: 10000 }).should('exist')
  })

  it('should show trending movies on home page', () => {
    // Visit home page
    cy.visit('/')

    // Verify trending title exists (using data-cy)
    cy.get('[data-cy="trending-title"]', { timeout: 10000 }).should('be.visible')

    // Verify trending movies loaded
    cy.get('[data-cy="trending-movies"]', { timeout: 10000 })
      .find('[data-cy="movie-card"]')
      .should('have.length.greaterThan', 0)
  })
})
