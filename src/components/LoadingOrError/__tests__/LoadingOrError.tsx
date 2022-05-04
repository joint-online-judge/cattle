import { render, screen } from '@testing-library/react'
import LoadingOrError from '..'

describe('<LoadingOrError />', () => {
	it('renders fullscreen', () => {
		render(<LoadingOrError fullscreen />)

		expect(screen.getByTestId('LoadingOrError')).toBeInTheDocument()
		expect(
			screen.getByTestId('LoadingOrError').classList.contains('min-h-screen')
		).toBe(true)
	})

	it('renders', () => {
		render(<LoadingOrError />)

		expect(screen.getByTestId('LoadingOrError')).toBeInTheDocument()
		expect(
			screen.getByTestId('LoadingOrError').classList.contains('h-full')
		).toBe(true)
	})

	it('renders fullscreen with an error message', () => {
		render(<LoadingOrError fullscreen error={new Error('Failed to fetch')} />)

		expect(screen.getByText('Failed to fetch')).toBeInTheDocument()
	})

	it('renders with an error message', () => {
		render(<LoadingOrError error={new Error('Failed to fetch')} />)

		expect(screen.getByText('Failed to fetch')).toBeInTheDocument()
	})
})
