describe('Admin Flow: Login → Manage Users', () => {
  beforeEach(() => {
    cy.clearLocalStorage()
    cy.visit('/')
  })

  it('should allow admin to login and access admin dashboard', () => {
    // Step 1: Login as admin
    cy.contains('Login').click()
    cy.get('input[type="email"]').type('admin@movie.com')
    cy.get('input[type="password"]').type('admin123')
    cy.get('button[type="submit"]').click()

    // Step 2: Verify admin navbar links are visible
    cy.contains('Dashboard').should('be.visible')
    cy.contains('Users').should('be.visible')

    // Step 3: Navigate to Dashboard
    cy.contains('Dashboard').click()
    cy.url().should('include', '/admin/dashboard')

    // Verify dashboard content
    cy.contains('Total Users').should('be.visible')
    cy.contains('Total Favorites').should('be.visible')
  })

  it('should allow admin to add a new user', () => {
    // Login as admin
    cy.contains('Login').click()
    cy.get('input[type="email"]').type('admin@movie.com')
    cy.get('input[type="password"]').type('admin123')
    cy.get('button[type="submit"]').click()

    // Navigate to Users page from navbar (more specific selector)
    cy.get('nav').contains('a', 'Users').click()
    cy.url().should('include', '/admin/users')

    // Get initial user count
    cy.get('tbody tr').then(($rows) => {
      const initialCount = $rows.length

      // Click Add User button
      cy.contains('button', 'Add User').click()

      // Fill in user form
      cy.get('input[type="text"]').type('Test User')
      cy.get('input[type="email"]').type('test@example.com')
      cy.get('select').select('member')

      // Submit form
      cy.contains('button', 'Add').click()

      // Verify user was added
      cy.contains('added successfully').should('be.visible')
      cy.get('tbody tr').should('have.length', initialCount + 1)
      cy.contains('Test User').should('be.visible')
    })
  })

  it('should prevent member from accessing admin pages', () => {
    // Login as member
    cy.contains('Login').click()
    cy.get('input[type="email"]').type('member@movie.com')
    cy.get('input[type="password"]').type('member123')
    cy.get('button[type="submit"]').click()

    // Wait for login to complete
    cy.url().should('eq', Cypress.config().baseUrl + '/')

    // Verify admin links are NOT visible
    cy.contains('Dashboard').should('not.exist')
    cy.contains('a', 'Users').should('not.exist')

    // Try to access admin page directly
    cy.visit('/admin/users', { failOnStatusCode: false })

    // The router guard should block and redirect (either to login or home)
    // Since user is authenticated but lacks permission, should go to home
    cy.url().should('satisfy', (url) => {
      return url === Cypress.config().baseUrl + '/' || url.includes('/login')
    })

    // Should show permission error toast
    cy.contains('do not have permission', { timeout: 3000 }).should('be.visible')
  })
})
