// @ts-check
Cypress.Commands.add('getBySel', (selector, ...arguments_) => {
	// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
	return cy.get(`[data-test=${selector}]`, ...arguments_)
})

Cypress.Commands.add('getBySelLike', (selector, ...arguments_) => {
	// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
	return cy.get(`[data-test*=${selector}]`, ...arguments_)
})

Cypress.Commands.add('login', (username: string, password: string) => {
	const loginPath = '/login'
	const log = Cypress.log({
		name: 'login',
		displayName: 'LOGIN',
		message: [`🔐 Authenticating | ${username}`],
		autoEnd: false
	})

	cy.visit(loginPath)

	cy.getBySel('login-username').type(username)
	cy.getBySel('login-password').type(password)

	cy.getBySel('login-submit').click()

	log.end()
})

// todo: add antd message type for the type arg
Cypress.Commands.add('checkMessage', (type: string, content = '') => {
	if (content) {
		// eslint-disable-next-line cypress/require-data-selectors
		cy.get(`.ant-message-${type}`)
			.should('be.visible')
			.and('have.text', content)
	} else {
		// eslint-disable-next-line cypress/require-data-selectors
		cy.get(`.ant-message-${type}`).should('be.visible')
	}
})
