/// <reference types="cypress" />
declare module '@cypress/code-coverage/task' {
	const task: Cypress.PluginConfig
	export = task
}

declare namespace Cypress {
	interface Chainable {
		getBySel(dataTestAttribute: string, arguments_?: any): Chainable<Element>

		getBySelLike(
			dataTestPrefixAttribute: string,
			arguments_?: any
		): Chainable<Element>

		login(username: string, password: string, loginOptions?: LoginOptions): void

		checkMessage(type: string, content: string): void
	}
}
