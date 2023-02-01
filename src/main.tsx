import App from 'app'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { registerSW } from 'virtual:pwa-register'

registerSW()
const root = createRoot(document.querySelector('#root')!)
root.render(
  <StrictMode>
    <App />
  </StrictMode>
)
