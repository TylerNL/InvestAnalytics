import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { AuthContextProvider } from './context/AuthContext'
import { BrowserRouter } from 'react-router-dom'
import App from './components/App'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthContextProvider>
    <BrowserRouter>
      <App/>
    </BrowserRouter>
    </AuthContextProvider>
  </StrictMode>,
)
