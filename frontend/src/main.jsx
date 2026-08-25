import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// import './index.css'
import './scss/main.scss'
import { AuthProvider } from './context/AuthContext.jsx'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </StrictMode>,
)
