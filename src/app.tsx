import LoadingOrError from 'components/LoadingOrError'
import { AccessContextProvider } from 'models/access'
import { AuthContextProvider } from 'models/auth'
import { DomainContextProvider } from 'models/domain'
import { LangContextProvider } from 'models/lang'
import { PageHeaderContextProvider } from 'models/pageHeader'
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
		<Suspense fallback={<LoadingOrError />}>
			<LangContextProvider>
				<AuthContextProvider>
					<DomainContextProvider>
						<AccessContextProvider>
							<PageHeaderContextProvider>
								<ProblemSetContextProvider>
									<BrowserRouter>
										<Routes />
									</BrowserRouter>
								</ProblemSetContextProvider>
							</PageHeaderContextProvider>
						</AccessContextProvider>
					</DomainContextProvider>
				</AuthContextProvider>
			</LangContextProvider>
		</Suspense>
	)
}
