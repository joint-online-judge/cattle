import App from 'app'
import { StrictMode } from 'react'
import ReactDOM from 'react-dom'
import { registerSW } from 'virtual:pwa-register'

registerSW()

ReactDOM.render(
	<StrictMode>
		<App />
	</StrictMode>,
	document.querySelector('#root')
)
