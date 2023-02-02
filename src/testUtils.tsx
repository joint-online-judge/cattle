import { render } from '@testing-library/react'
import type { PropsWithChildren, ReactElement } from 'react'
import { BrowserRouter } from 'react-router-dom'

export const DESKTOP_RESOLUTION_WIDTH = 1280
export const DESKTOP_RESOLUTION_HEIGHT = 800

// export const MOBILE_RESOLUTION_WIDTH = 414
// export const MOBILE_RESOLUTION_HEIGHT = 896

export default function renderWithProviders(
  ui: ReactElement,
  includeRouter = true
): void {
  render(ui, {
    wrapper: ({ children }: PropsWithChildren): ReactElement => (
      <div>
        {includeRouter ? <BrowserRouter>{children}</BrowserRouter> : children}
      </div>
    )
  })
}
