import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Layout from './layout.tsx'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Layout>
      <App />
    </Layout>
  </StrictMode>,
)
