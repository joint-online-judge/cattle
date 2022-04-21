import App from 'app'
import { AccessContextProvider } from 'models/access'
import { AuthContextProvider } from 'models/auth'
import { DomainContextProvider } from 'models/domain'
import { LangContextProvider } from 'models/lang'
import { PageHeaderContextProvider } from 'models/pageHeader'
import { ProblemSetContextProvider } from 'models/problemSet'
import { StrictMode } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { registerSW } from 'virtual:pwa-register'
import './i18n'
import './index.less'

registerSW()

ReactDOM.render(
	<StrictMode>
		<LangContextProvider>
			<AuthContextProvider>
				<DomainContextProvider>
					<AccessContextProvider>
						<PageHeaderContextProvider>
							<ProblemSetContextProvider>
								<BrowserRouter>
									<App />
								</BrowserRouter>
							</ProblemSetContextProvider>
						</PageHeaderContextProvider>
					</AccessContextProvider>
				</DomainContextProvider>
			</AuthContextProvider>
		</LangContextProvider>
	</StrictMode>,
	document.querySelector('#root')
)
