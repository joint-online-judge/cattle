import LoadingOrError from 'components/LoadingOrError'
import { AccessContextProvider } from 'models/access'
import { AuthContextProvider } from 'models/auth'
import { DomainContextProvider } from 'models/domain'
import { LangContextProvider } from 'models/lang'
import { ProblemContextProvider } from 'models/problem'
import { ProblemSetContextProvider } from 'models/problemSet'
import type { ReactElement } from 'react'
import { Suspense } from 'react'
import { BrowserRouter, useRoutes } from 'react-router-dom'
import './i18n'
import './index.less'
import routes from './routes'

function Routes(): ReactElement | null {
	const routesComponent = useRoutes(routes)
	return routesComponent
}

export default function App(): ReactElement {
	return (
		<Suspense fallback={<LoadingOrError fullscreen />}>
			<LangContextProvider>
				<AuthContextProvider>
					<DomainContextProvider>
						<AccessContextProvider>
							<ProblemSetContextProvider>
								<ProblemContextProvider>
									<BrowserRouter>
										<Routes />
									</BrowserRouter>
								</ProblemContextProvider>
							</ProblemSetContextProvider>
						</AccessContextProvider>
					</DomainContextProvider>
				</AuthContextProvider>
			</LangContextProvider>
		</Suspense>
	)
}
