// src/main.jsx

import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'




// Prevent multiple root creation during HMR
const rootElement = document.getElementById('root');
if (!rootElement._reactRootContainer) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  )
}