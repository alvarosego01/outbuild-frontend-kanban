import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './modules/App'

import './App.sass'
import './css/style.css'
import 'boxicons/css/boxicons.min.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
