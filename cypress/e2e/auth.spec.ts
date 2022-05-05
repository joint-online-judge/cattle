describe('User Sign up and Login', () => {
	beforeEach(() => {
		cy.viewport('macbook-13')
	})

	it('should redirect unauthenticated user to login page', function () {
		cy.visit('/domain')
		cy.location('pathname').should('equal', '/login')
	})

	it('should display success message after login', function () {
		cy.login('e2eTest', 'e2eTest')
		// cy.checkMessage("success", "Login Success");
	})
	it('should redirect to the home page after login', function () {
		cy.login('e2eTest', 'e2eTest')
		cy.location('pathname').should('equal', '/')
	})

	it('should error for an invalid user', function () {
		cy.login('invalidUserName', 'invalidPa$$word')
		cy.checkMessage('error', 'Wrong username or password')
	})

	it('should error for an invalid password for existing user', function () {
		cy.login('e2eTest', 'invalidPa$$word')
		cy.checkMessage('error', 'Wrong username or password')
	})
})
