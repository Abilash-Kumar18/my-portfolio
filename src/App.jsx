// src/App.jsx

import './App.css'
import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import Header from './pages/Header'
import Footer from './pages/Footer'
import Chatbot from './components/Chatbot'

// Import your new pages
import Home from './pages/Home'
import About from './pages/About'
import Projects from './pages/Projects'
import Contact from './pages/Contact'

function App() {
  const location = useLocation();

  return (
    <>
      <Header title="Portfolio" subtitle="" textAlign="center" />

      {/* Main content grows to fill the viewport (see src/App.css .main-content) */}
      <main className="main-content">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </AnimatePresence>
      </main>

      <Footer />
      <Chatbot />
    </>
  )
}

export default App