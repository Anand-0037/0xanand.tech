import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import { ChameleonProvider } from './tambo'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ChameleonProvider>
      <App />
    </ChameleonProvider>
  </StrictMode>,
)
