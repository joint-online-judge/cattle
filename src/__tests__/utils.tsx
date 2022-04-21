import { screen } from '@testing-library/react'
import { act, renderHook } from '@testing-library/react-hooks'
import { Link } from 'react-router-dom'
import renderWithProviders from 'testUtils'
import { useMediaQuery } from 'utils/test'

const BELOW_MIN_WIDTH = 599
const MIN_WITDH = 600

describe('useMediaQuery', () => {
	it('renders', () => {
		window.resizeTo(BELOW_MIN_WIDTH, 0)
		const { result } = renderHook(() =>
			useMediaQuery(`(min-width: ${MIN_WITDH}px)`)
		)
		expect(result.current).toBeFalsy()

		act(() => window.resizeTo(MIN_WITDH, 0))

		expect(result.current).toBeTruthy()
	})
})

describe('renderWithProviders', () => {
	it('renders', () => {
		// Render with router
		renderWithProviders(<Link to='/'>test link</Link>, true)
		expect(screen.getByText('test link')).toBeInTheDocument()

		// Will throw error when no router around <Link>
		expect(() =>
			renderWithProviders(<Link to='/'>test link</Link>, false)
		).toThrowError()
	})
})
