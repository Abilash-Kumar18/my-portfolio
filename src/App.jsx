// src/App.jsx

import './App.css'
import { Routes, Route } from 'react-router-dom' // <-- Import
import Header from './pages/Header' // Check this path
import Footer from './pages/Footer' // Check this path

// Import your new pages
import Home from './pages/Home'
import About from './pages/About'

function App() {
  return (
    <>
      <Header title="Portfolio" subtitle="My React + Vite Project" textAlign="center" />

      {/* Main content grows to fill the viewport (see src/App.css .main-content) */}
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          {/* You can add more routes here later, like /projects */}
        </Routes>
      </main>

      <Footer />
    </>
  )
}

export default App