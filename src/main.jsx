// src/main.jsx

import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

const rootElement = document.getElementById('root');

// Prevent multiple root creation during HMR
if (!rootElement._reactRoot) {
  const root = ReactDOM.createRoot(rootElement);
  rootElement._reactRoot = root;
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}