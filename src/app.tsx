import LoadingOrError from 'components/LoadingOrError'
import type { ReactElement } from 'react'
import { Suspense } from 'react'
import { useRoutes } from 'react-router-dom'
import routes from './routes'

export default function App(): ReactElement {
	const routesComponent = useRoutes(routes)

	return <Suspense fallback={<LoadingOrError />}>{routesComponent}</Suspense>
}
